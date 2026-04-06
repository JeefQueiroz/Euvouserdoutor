import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { abi, CONTRACT_ADDRESS } from '@/src/constants';
import {
  getSupabaseAdmin,
  recordPointTransaction,
  syncLeaderboardToSupabase,
  syncProfileToSupabase,
  calcNftScore,
} from '@/src/server/supabase';
import { getLeaderboardCacheKey } from '@/src/constants/cache';

export const dynamic = 'force-dynamic';

function getPublicClient() {
  return createPublicClient({
    chain: base,
    transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
  });
}

function parseMissingColumn(errorMessage: string): string | null {
  const matchA = errorMessage.match(/Could not find the '([^']+)' column/i);
  if (matchA?.[1]) return matchA[1];
  const matchB = errorMessage.match(/column .*\.([a-zA-Z0-9_]+) does not exist/i);
  if (matchB?.[1]) return matchB[1];
  return null;
}

async function safeUpsertProfile(fid: number) {
  const supabase = getSupabaseAdmin();
  const row: Record<string, unknown> = {
    fid,
    username: `fid_${fid}`,
    genesis_nft: true,
  };
  for (let i = 0; i < 4; i += 1) {
    const { error } = await supabase.from('profiles').upsert(row, { onConflict: 'fid' });
    if (!error) return;
    const missing = parseMissingColumn(error.message || '');
    if (!missing || !(missing in row)) throw error;
    delete row[missing];
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const fid = Number((body as { fid?: unknown }).fid);
    if (!Number.isFinite(fid) || fid <= 0) {
      return NextResponse.json({ error: 'Invalid FID' }, { status: 400 });
    }

    const BANNED_FIDS = [2865260, 2798712];
    if (BANNED_FIDS.includes(fid)) {
      return NextResponse.json({ error: 'Account quarantined' }, { status: 403 });
    }

    // 1. Confirma on-chain que o token existe
    try {
      await getPublicClient().readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: 'ownerOf',
        args: [BigInt(fid)],
      });
    } catch {
      return NextResponse.json({ error: 'Token not found on-chain' }, { status: 404 });
    }

    // 2. Persistência ON-TIME no Supabase (Aguardada)
    // Upsert profile com genesis_nft = true
    await safeUpsertProfile(fid);

    const supabase = getSupabaseAdmin();
    const { data: profile } = await supabase
      .from('profiles')
      .select('points, username, pfp_url, nft_count, neynar_score, streak, best_streak')
      .eq('fid', fid)
      .single();

    const username = profile?.username || `fid_${fid}`;
    const pfpUrl = profile?.pfp_url || null;
    const basePoints = Math.max(Number(profile?.points || 0), 50); // genesis floor = 50pts
    const nftCount = Math.max(1, Number(profile?.nft_count || 0));
    const nftScore = calcNftScore(nftCount);
    const totalPoints = basePoints + nftScore;
    const neynarScore = Number(profile?.neynar_score || 0);
    const streak = Number(profile?.streak || 0);
    const bestStreak = Number(profile?.best_streak || 0);

    await Promise.all([
      recordPointTransaction(fid, 'mint_nft', 100, { tokenId: fid, source: 'ontime-sync' }),
      syncLeaderboardToSupabase({
        fid, username, pfp_url: pfpUrl,
        base_points: basePoints, nft_count: nftCount,
        nft_score: nftScore, total_points: totalPoints,
        neynar_score: neynarScore, streak, best_streak: bestStreak,
      }),
      syncProfileToSupabase({
        fid, username, pfp_url: pfpUrl,
        points: basePoints, nft_score: nftScore,
        total_points: totalPoints, neynar_score: neynarScore,
        nft_count: nftCount, streak, best_streak: bestStreak,
      }),
    ]);

    // 3. Background sync KV (Cache)
    ;(async () => {
      try {
        const { kv } = await import('@vercel/kv');
        const lbKey = `lb:${fid}`;
        await kv.set(lbKey, {
          fid,
          username,
          pfpUrl,
          hasNft: true,
          nftCount,
          nftScore,
          points: basePoints,
          totalPoints,
          neynarScore,
          updatedAt: new Date().toISOString(),
        });
        await kv.sadd('lb:fids', String(fid));
        await kv.del(getLeaderboardCacheKey());
      } catch (e) {
        console.error('[mint] background sync error:', e);
      }
    })();

    return NextResponse.json({ success: true, fid });
  } catch (error) {
    console.error('[/api/mint/confirm] error:', error);
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
