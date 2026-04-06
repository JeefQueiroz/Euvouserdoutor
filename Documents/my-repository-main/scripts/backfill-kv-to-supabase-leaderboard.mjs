import { config } from 'dotenv';
import { kv } from '@vercel/kv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL || 
                   process.env.NEXT_PUBLIC_SUPABASE_URL || 
                   process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL || 
                   process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                   process.env.SUPABASE_SERVICE_KEY || 
                   process.env.SUPABASE_SECRET || 
                   process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SERVICE_ROLE_KEY || 
                   process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SECRET_KEY || 
                   process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase configuration (URL or Key) in env');
}

const supabase = createClient(SUPABASE_URL.trim(), SUPABASE_KEY.trim(), { auth: { persistSession: false } });

function toNum(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function calcNftScore(nftCount) {
  const n = toNum(nftCount, 0);
  if (n <= 1) return 0;
  return (n - 1) * 100;
}

async function main() {
  const rawFids = (await kv.smembers('lb:fids')) || [];
  const fids = Array.from(new Set(rawFids.map((v) => toNum(v, 0)).filter((v) => v > 0)));

  console.log(`Found ${fids.length} FIDs in KV lb:fids`);
  if (fids.length === 0) return;

  let ok = 0;
  let fail = 0;

  for (const fid of fids) {
    try {
      const row = (await kv.get(`lb:${fid}`)) || {};
      const { count: ownershipCountRaw } = await supabase
        .from('nft_ownership')
        .select('token_id', { count: 'exact', head: true })
        .eq('fid', fid);
      const ownershipCount = toNum(ownershipCountRaw, 0);
      const username = typeof row.username === 'string' && row.username.trim() ? row.username.trim() : `fid_${fid}`;
      const pfpUrl = row.pfpUrl ?? row.pfp_url ?? null;
      const kvNftCount = toNum(row.nftCount ?? row.nft_count, 0);
      const nftCount = Math.max(kvNftCount, ownershipCount);
      const basePointsRaw = toNum(row.points ?? row.base_points, 0);
      const basePoints = Math.max(basePointsRaw, nftCount > 0 ? 50 : 0);
      const nftScore = calcNftScore(nftCount);
      const totalPoints = Math.max(toNum(row.totalPoints ?? row.total_points, basePoints + nftScore), basePoints + nftScore);
      const neynarScore = toNum(row.neynarScore ?? row.neynar_score, 0);

      const leaderboardPayload = {
        fid,
        username,
        pfp_url: pfpUrl,
        pfpUrl,
        points: basePoints,
        base_points: basePoints,
        nft_count: nftCount,
        nftCount: nftCount,
        nft_score: nftScore,
        total_points: totalPoints,
        neynar_score: neynarScore,
        has_nft: nftCount > 0,
        hasNft: nftCount > 0,
        updated_at: new Date().toISOString(),
      };

      const profilePayload = {
        fid,
        username,
        pfp_url: pfpUrl,
        points: totalPoints,
        nft_score: nftScore,
        total_points: totalPoints,
        xp: totalPoints,
        neynar_score: neynarScore,
        genesis_nft: nftCount > 0,
        secondary_nfts: Math.max(0, nftCount - 1),
        updated_at: new Date().toISOString(),
      };

      const { error: lbError } = await supabase.from('leaderboard').upsert(leaderboardPayload, { onConflict: 'fid' });
      if (lbError) throw lbError;

      const { error: pfError } = await supabase.from('profiles').upsert(profilePayload, { onConflict: 'fid' });
      if (pfError) throw pfError;

      ok += 1;
    } catch (err) {
      fail += 1;
      console.error(`FID ${fid} failed:`, err?.message || err);
    }
  }

  console.log(`Backfill completed. ok=${ok} fail=${fail}`);

  const { error: rankError } = await supabase.rpc('recalculate_ranks');
  if (rankError) {
    console.warn('recalculate_ranks failed:', rankError.message);
  } else {
    console.log('Ranks recalculated');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
