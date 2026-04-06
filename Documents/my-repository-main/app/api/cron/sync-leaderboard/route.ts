import { NextResponse } from 'next/server';
import { getDb } from '@/src/server/db';
import { syncLeaderboardBatch } from '@/src/server/sync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const forceAll = searchParams.get('all') === '1';
    const { kv } = await import('@vercel/kv');
    const kvFidsRaw = await kv.smembers<string[]>('lb:fids').catch(() => []);
    let fids = (kvFidsRaw ?? [])
      .map((row) => Number(row))
      .filter((fid) => Number.isFinite(fid) && fid > 0);

    const db = getDb();
    const [{ data: leaderboardFids, error: lbError }, { data: profileFids, error: pfError }, { data: userFids, error: usError }] = await Promise.all([
      db.from('leaderboard').select('fid'),
      db.from('profiles').select('fid'),
      db.from('users').select('fid'),
    ]);

    if (lbError) return NextResponse.json({ error: lbError.message }, { status: 500 });
    if (pfError) return NextResponse.json({ error: pfError.message }, { status: 500 });
    if (usError) return NextResponse.json({ error: usError.message }, { status: 500 });

    const dbFids = [
      ...(leaderboardFids ?? []).map((row: any) => Number(row.fid)),
      ...(profileFids ?? []).map((row: any) => Number(row.fid)),
      ...(userFids ?? []).map((row: any) => Number(row.fid)),
    ].filter((fid) => Number.isFinite(fid) && fid > 0);

    fids = Array.from(new Set([...fids, ...dbFids]));

    // Optional: keep previous faster behavior unless all=1 explicitly requested.
    if (!forceAll && fids.length > 500) {
      fids = fids.slice(0, 500);
    }

    await syncLeaderboardBatch(fids);
    return NextResponse.json({ ok: true, synced: fids.length, forceAll });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
