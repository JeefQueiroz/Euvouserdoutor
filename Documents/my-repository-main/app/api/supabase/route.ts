import { NextResponse } from 'next/server';
import { Errors, createClient } from '@farcaster/quick-auth';
import {
  calcNftScore,
  getSupabaseAdmin,
  recordPointTransaction,
  syncLeaderboardToSupabase,
  syncProfileToSupabase,
} from '@/src/server/supabase';
import { syncUserToSupabase } from '@/src/server/sync';
import { getLeaderboardCacheKey } from '@/src/constants/cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const quickAuthClient = createClient();

type UserStatePayload = {
  action: 'user_state';
  fid: number;
  updates?: Record<string, string>;
};

type CheckinPayload = {
  action: 'checkin';
  fid: number;
};

type Payload = UserStatePayload | CheckinPayload;

function resolveDomain(request: Request): string {
  const envDomain = process.env.QUICK_AUTH_DOMAIN?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Cannot resolve domain.');
  return host;
}

async function authenticateFid(request: Request): Promise<number | null> {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) return null;

  try {
    const token = authorization.split(' ')[1];
    const payload = await quickAuthClient.verifyJwt({ token, domain: resolveDomain(request) });
    const fid = Number(payload.sub);
    return Number.isFinite(fid) && fid > 0 ? fid : null;
  } catch (error) {
    if (error instanceof Errors.InvalidTokenError) return null;
    throw error;
  }
}

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayUTC(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function isAllowedKey(key: string): boolean {
  return key.startsWith('xray:');
}

function parseMissingColumn(errorMessage: string): string | null {
  const matchA = errorMessage.match(/Could not find the '([^']+)' column/i);
  if (matchA?.[1]) return matchA[1];
  const matchB = errorMessage.match(/column .*\.([a-zA-Z0-9_]+) does not exist/i);
  if (matchB?.[1]) return matchB[1];
  return null;
}

function parseDateFromLocal(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return value;
}

function deriveProfilePatchFromState(fid: number, key: string, value: string): Record<string, unknown> {
  const patch: Record<string, unknown> = {
    fid,
    updated_at: new Date().toISOString(),
  };

  const prefix = `xray:${fid}:`;
  if (!key.startsWith(prefix)) return patch;
  const stateKey = key.slice(prefix.length);

  if (stateKey === 'points') {
    const points = Number(value);
    if (Number.isFinite(points) && points >= 0) patch.points = Math.floor(points);
    return patch;
  }

  try {
    const parsed = JSON.parse(value);

    if (stateKey === 'tasks' && parsed && typeof parsed === 'object') {
      const tasks = parsed as Record<string, unknown>;
      patch.task_follow_fc = Boolean(tasks.follow_fc);
      patch.task_follow_x = Boolean(tasks.follow_x);
      patch.task_mint_nft = Boolean(tasks.mint_nft);
      patch.task_share_xray = Boolean(tasks.share_xray);
      patch.task_notif = Boolean(tasks.notif);
      return patch;
    }

    if (stateKey === 'checkin-cache' && parsed && typeof parsed === 'object') {
      const checkin = parsed as Record<string, unknown>;
      const streak = Number(checkin.streak ?? 0);
      const bestStreak = Number(checkin.bestStreak ?? 0);
      patch.streak = Number.isFinite(streak) ? streak : 0;
      patch.best_streak = Number.isFinite(bestStreak) ? bestStreak : 0;
      patch.last_checkin = parseDateFromLocal(checkin.lastDate) ? `${checkin.lastDate}T00:00:00.000Z` : null;
      return patch;
    }
  } catch {
    return patch;
  }

  return patch;
}

async function upsertProfileState(fid: number, updates: Record<string, string>): Promise<void> {
  const supabase = getSupabaseAdmin();
  const mergedRow: Record<string, unknown> = {
    fid,
    updated_at: new Date().toISOString(),
  };

  for (const [key, value] of Object.entries(updates)) {
    if (!isAllowedKey(key)) continue;
    if (!key.startsWith(`xray:${fid}:`)) continue;
    Object.assign(mergedRow, deriveProfilePatchFromState(fid, key, value));
  }

  if (Object.keys(mergedRow).length <= 2) return;

  for (let i = 0; i < 8; i += 1) {
    const { error } = await supabase.from('profiles').upsert(mergedRow, { onConflict: 'fid' });
    if (!error) return;
    const missing = parseMissingColumn(error.message || '');
    if (!missing || !(missing in mergedRow)) return;
    delete mergedRow[missing];
  }
}

async function handleUserState(fid: number, updates: Record<string, string>) {
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => isAllowedKey(key) && key.startsWith(`xray:${fid}:`)),
  );

  await upsertProfileState(fid, filteredUpdates);

  (async () => {
    try {
      const { kv } = await import('@vercel/kv');
      if (Object.keys(filteredUpdates).length > 0) {
        await kv.hset(`user:state:${fid}`, filteredUpdates);
      }
    } catch (error) {
      console.error('[supabase-route:user_state] background sync error:', error);
    }
  })();

  return NextResponse.json({ success: true });
}

async function handleCheckin(fid: number) {
  const { kv } = await import('@vercel/kv');
  const today = todayUTC();
  const yesterday = yesterdayUTC();
  const lockKey = `checkin:lock:${fid}:${today}`;
  const lockAcquired = await kv.set(lockKey, 1, { nx: true, ex: 20 });

  if (!lockAcquired) {
    return NextResponse.json({
      success: false,
      retry: true,
      message: 'Check-in in progress. Try again in a few seconds.',
    }, { status: 409 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: profile } = await supabase
      .from('profiles')
      .select('points, streak, best_streak, last_checkin, username, pfp_url, nft_count, neynar_score')
      .eq('fid', fid)
      .single();

    const lastCheckinDate = profile?.last_checkin ? profile.last_checkin.slice(0, 10) : '';
    const history = Array.from(new Set([today].filter(Boolean)));

    if (lastCheckinDate === today) {
      return NextResponse.json({
        success: false,
        alreadyDone: true,
        streak: profile?.streak || 0,
        bestStreak: profile?.best_streak || 0,
        lastDate: lastCheckinDate,
        history,
        pointsEarned: 0,
        points: profile?.points || 0,
        message: 'Already checked in today.',
      });
    }

    const currentStreak = profile?.streak || 0;
    const newStreak = lastCheckinDate === yesterday ? currentStreak + 1 : 1;
    const newBest = Math.max(newStreak, profile?.best_streak || 0);
    const weeklyBonus = newStreak > 0 && newStreak % 7 === 0;
    const pointsEarned = weeklyBonus ? 30 : 10;
    const currentPoints = Number(profile?.points || 0);
    const nftCount = Number(profile?.nft_count || 0);
    const pointsWithGenesisFloor = Math.max(currentPoints, nftCount > 0 ? 50 : 0);
    const nextPoints = pointsWithGenesisFloor + pointsEarned;
    const nftScore = calcNftScore(nftCount);
    const totalPoints = nextPoints + nftScore;
    const username = profile?.username || `fid_${fid}`;
    const pfpUrl = profile?.pfp_url || null;
    const neynarScore = Number(profile?.neynar_score || 0);

    await Promise.all([
      syncProfileToSupabase({
        fid,
        username,
        pfp_url: pfpUrl,
        points: nextPoints,
        nft_score: nftScore,
        total_points: totalPoints,
        neynar_score: neynarScore,
        nft_count: nftCount,
        streak: newStreak,
        best_streak: newBest,
      }),
      syncLeaderboardToSupabase({
        fid,
        username,
        pfp_url: pfpUrl,
        base_points: nextPoints,
        nft_count: nftCount,
        nft_score: nftScore,
        total_points: totalPoints,
        neynar_score: neynarScore,
        streak: newStreak,
        best_streak: newBest,
      }),
      recordPointTransaction(fid, 'checkin', pointsEarned, {
        streak: newStreak,
        weeklyBonus,
        source: 'app/api/supabase',
      }),
    ]);

    (async () => {
      try {
        await kv.set(`checkin:${fid}`, {
          fid,
          streak: newStreak,
          bestStreak: newBest,
          lastDate: today,
          history,
        });
        await kv.set(`lb:${fid}`, {
          fid,
          username,
          pfpUrl,
          points: nextPoints,
          nftCount,
          nftScore,
          totalPoints,
          neynarScore,
          updatedAt: new Date().toISOString(),
        });
        await kv.sadd('lb:fids', String(fid));
        await kv.del(getLeaderboardCacheKey());
        await syncUserToSupabase(fid);
      } catch (error) {
        console.error('[supabase-route:checkin] background sync error:', error);
      }
    })();

    return NextResponse.json({
      success: true,
      alreadyDone: false,
      streak: newStreak,
      bestStreak: newBest,
      lastDate: today,
      history,
      pointsEarned,
      weeklyBonus,
      points: nextPoints,
      message: weeklyBonus
        ? `🎉 Weekly bonus! +${pointsEarned} pts (${newStreak}-day streak)`
        : `✅ Check-in done! +${pointsEarned} pts`,
    });
  } finally {
    await kv.del(lockKey);
  }
}

export async function POST(request: Request) {
  try {
    const authFid = await authenticateFid(request);
    if (!authFid) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as Partial<Payload> & {
      updates?: Record<string, string>;
    };
    const fid = Number(body.fid);

    if (!Number.isFinite(fid) || fid <= 0) {
      return NextResponse.json({ error: 'Invalid FID.' }, { status: 400 });
    }
    if (fid !== authFid) {
      return NextResponse.json({ error: 'FID mismatch.' }, { status: 403 });
    }

    if (body.action === 'user_state') {
      return handleUserState(fid, body.updates || {});
    }

    if (body.action === 'checkin') {
      return handleCheckin(fid);
    }

    return NextResponse.json({ error: 'Unsupported action.' }, { status: 400 });
  } catch (error) {
    console.error('[/api/supabase] error:', error);
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
