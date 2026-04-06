import { kv } from '@vercel/kv';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

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

const supabase = createClient(SUPABASE_URL.trim(), SUPABASE_KEY.trim(), { auth: { persistSession: false } });

async function migrate() {
  console.log('Iniciando migracao completa KV -> Supabase...\n');

  const lbFids = await kv.smembers('lb:fids');
  console.log(`Leaderboard: ${lbFids.length} FIDs`);
  for (const fidStr of lbFids) {
    const fid = Number(fidStr);
    const entry = await kv.get(`lb:${fid}`);
    if (!entry) continue;

    await supabase.from('users').upsert(
      {
        fid,
        username: entry.username ?? `fid_${fid}`,
        pfp_url: entry.pfpUrl ?? null,
        synced_at: new Date().toISOString(),
      },
      { onConflict: 'fid' }
    );

    await supabase.from('leaderboard').upsert(
      {
        fid,
        base_points: Number(entry.points ?? 0),
        nft_count: Number(entry.nftCount ?? 0),
      },
      { onConflict: 'fid' }
    );
  }

  for (const fidStr of lbFids) {
    const fid = Number(fidStr);
    const checkin = await kv.get(`checkin:${fid}`);
    if (!checkin) continue;

    await supabase.from('checkins').upsert(
      {
        fid,
        streak: checkin.streak ?? 0,
        best_streak: checkin.bestStreak ?? 0,
        last_date: checkin.lastDate ?? '',
        history: checkin.history ?? [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'fid' }
    );
  }

  const notifFids = await kv.smembers('fids');
  console.log(`Subscribers: ${notifFids.length} FIDs`);
  for (const fidStr of notifFids) {
    const fid = Number(fidStr);
    const sub = await kv.get(`notifications:${fid}`);
    if (!sub?.token || !sub?.url) continue;

    await supabase.from('notification_subscribers').upsert(
      {
        fid,
        token: sub.token,
        url: sub.url,
        username: sub.username ?? null,
        pfp_url: sub.pfpUrl ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'fid' }
    );
  }

  await supabase.rpc('recalculate_ranks');
  console.log('\nMigracao concluida.');
}

migrate().catch(console.error);
