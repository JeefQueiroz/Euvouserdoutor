import { NextResponse } from 'next/server';
import { getSubscribersByFids, removeSubscriber } from '@/src/server/notifications';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

function isAuthed(request: Request): boolean {
  const apiKey = process.env.NOTIFICATIONS_API_KEY?.trim();
  if (!apiKey) return false;
  return request.headers.get('x-api-key') === apiKey;
}

function parseDay(input: string | null): string {
  const fallback = new Date().toISOString().slice(0, 10);
  if (!input) return fallback;
  return /^\d{4}-\d{2}-\d{2}$/.test(input) ? input : fallback;
}

type RangePeriod = '7' | '15' | '30' | 'total';

function parsePeriod(input: string | null): RangePeriod {
  if (input === '7' || input === '15' || input === '30' || input === 'total') {
    return input;
  }
  return '7';
}

function getDayKeysFromPeriod(period: RangePeriod): string[] {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);

  const span = Number(period);
  if (!Number.isFinite(span) || span <= 0) return [];

  const result: string[] = [];
  for (let i = 0; i < span; i += 1) {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() - i);
    result.push(d.toISOString().slice(0, 10));
  }
  return result;
}

type RemovedItem = {
  fid: number;
  event?: string;
  removedAt?: string;
};

type AdminUserRow = {
  fid: number;
  username: string;
  points: number;
  streak: number;
  bestStreak: number;
  lastCheckin: string | null;
  notificationEnabled: boolean;
  notificationToken: string | null;
  notificationUrl: string | null;
  neynarScore: number;
  followerCount: number;
};

export async function GET(request: Request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const day = parseDay(searchParams.get('day'));
  const period = parsePeriod(searchParams.get('period'));

  const activeSubscribers = await getSubscribersByFids().catch(() => []);
  const activeCount = activeSubscribers.length;
  const subscriberByFid = new Map(activeSubscribers.map((sub) => [sub.fid, sub]));
  let users: AdminUserRow[] = [];

  let stats: Record<string, number> = {};
  let removed: RemovedItem[] = [];
  try {
    const { kv } = await import('@vercel/kv');
    const toNum = (value: unknown) => {
      const n = Number(value ?? 0);
      return Number.isFinite(n) ? n : 0;
    };

    const emptyStats = {
      total: 0,
      valid: 0,
      sent: 0,
      skipped: 0,
      nonReceived: 0,
      disabledSubscribers: 0,
      newSubscribers: 0,
      removedInvalidSubscribers: 0,
    };

    let dayKeys: string[] = [];
    if (period === 'total') {
      const statKeys = (await kv.keys('notify:stats:*').catch(() => [])) as string[];
      dayKeys = Array.from(new Set(statKeys.map((key) => key.replace('notify:stats:', '')))).filter(
        (value) => /^\d{4}-\d{2}-\d{2}$/.test(value)
      );
    } else {
      dayKeys = getDayKeysFromPeriod(period);
    }

    if (dayKeys.length > 0) {
      const all = await Promise.all(
        dayKeys.map(async (d) => {
          const raw = (await kv.hgetall<Record<string, string | number>>(`notify:stats:${d}`)) || {};
          return {
            total: toNum(raw.total),
            valid: toNum(raw.valid),
            sent: toNum(raw.sent),
            skipped: toNum(raw.skipped),
            nonReceived: toNum(raw.nonReceived),
            disabledSubscribers: toNum(raw.disabledSubscribers),
            newSubscribers: toNum(raw.newSubscribers),
            removedInvalidSubscribers: toNum(raw.removedInvalidSubscribers),
          };
        })
      );

      stats = all.reduce(
        (acc, item) => ({
          total: acc.total + item.total,
          valid: acc.valid + item.valid,
          sent: acc.sent + item.sent,
          skipped: acc.skipped + item.skipped,
          nonReceived: acc.nonReceived + item.nonReceived,
          disabledSubscribers: acc.disabledSubscribers + item.disabledSubscribers,
          newSubscribers: acc.newSubscribers + item.newSubscribers,
          removedInvalidSubscribers: acc.removedInvalidSubscribers + item.removedInvalidSubscribers,
        }),
        emptyStats
      );
    } else {
      stats = emptyStats;
    }

    const removedFids = ((await kv.smembers('notify:removed:fids')) as string[]) || [];
    const limited = removedFids.slice(0, 300);
    const entries = await Promise.all(
      limited.map(async (fid) => {
        const numericFid = Number(fid);
        const payload = await kv.get<{ event?: string; removedAt?: string }>(`notify:removed:${fid}`);
        return {
          fid: Number.isFinite(numericFid) ? numericFid : 0,
          event: payload?.event,
          removedAt: payload?.removedAt,
        };
      })
    );
    removed = entries
      .filter((entry) => entry.fid > 0)
      .filter((entry) => {
        if (period === 'total') return true;
        if (!entry.removedAt) return false;
        const ts = Date.parse(entry.removedAt);
        if (!Number.isFinite(ts)) return false;
        const days = Number(period);
        const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
        return ts >= cutoff;
      })
      .sort((a, b) => String(b.removedAt || '').localeCompare(String(a.removedAt || '')));

    const lbFids = ((await kv.smembers('lb:fids')) as string[]).map(Number).filter((v) => Number.isFinite(v) && v > 0);
    const unionFids = Array.from(new Set([...lbFids, ...activeSubscribers.map((sub) => sub.fid)]));

    const { getSupabaseAdmin } = await import('@/src/server/supabase');
    const supabase = getSupabaseAdmin();
    const { data: dbProfiles } = await supabase
      .from('profiles')
      .select('fid, username, points, streak, best_streak, last_checkin, neynar_score, follower_count');
    
    const profileByFid = new Map(dbProfiles?.map(p => [p.fid, p]) || []);

    const userRows = await Promise.all(
      unionFids.map(async (fid) => {
        const dbProfile = profileByFid.get(fid);
        const [lb, checkin] = await Promise.all([
          kv.get<{ username?: string; points?: number; neynarScore?: number }>(`lb:${fid}`).catch(() => null),
          kv.get<{ streak?: number; bestStreak?: number; lastDate?: string }>(`checkin:${fid}`).catch(() => null),
        ]);
        const sub = subscriberByFid.get(fid);
      return {
        fid,
        username: (dbProfile?.username || lb?.username || `fid_${fid}`).toString(),
        points: Number(dbProfile?.points ?? lb?.points ?? 0),
        streak: Number(dbProfile?.streak ?? checkin?.streak ?? 0),
        bestStreak: Number(dbProfile?.best_streak ?? checkin?.bestStreak ?? 0),
        lastCheckin: (dbProfile?.last_checkin ? dbProfile.last_checkin.slice(0, 10) : checkin?.lastDate) || null,
        notificationEnabled: Boolean(sub?.details?.token && sub?.details?.url),
        notificationToken: sub?.details?.token || null,
        notificationUrl: sub?.details?.url || null,
        neynarScore: Number(dbProfile?.neynar_score ?? lb?.neynarScore ?? 0),
        followerCount: Number(dbProfile?.follower_count ?? 0),
      } as AdminUserRow;
      })
    );

    users = userRows.sort((a, b) => {
      const byPoints = b.points - a.points;
      if (byPoints !== 0) return byPoints;
      return a.fid - b.fid;
    });
  } catch {
    stats = {
      total: 0,
      valid: 0,
      sent: 0,
      skipped: 0,
      nonReceived: 0,
      disabledSubscribers: 0,
      newSubscribers: 0,
      removedInvalidSubscribers: 0,
    };

    users = activeSubscribers.map((sub) => ({
      fid: sub.fid,
      username: `fid_${sub.fid}`,
      points: 0,
      streak: 0,
      bestStreak: 0,
      lastCheckin: null,
      notificationEnabled: Boolean(sub.details?.token && sub.details?.url),
      notificationToken: sub.details?.token || null,
      notificationUrl: sub.details?.url || null,
      neynarScore: 0,
      followerCount: 0,
    }));
  }

  return NextResponse.json({
    success: true,
    day,
    period,
    stats,
    activeSubscribers: activeCount,
    usersTotal: users.length,
    users,
    removedCount: removed.length,
    removed,
  });
}

export async function DELETE(request: Request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { fid?: number };
  const fid = Number(body.fid);
  if (!Number.isFinite(fid) || fid <= 0) {
    return NextResponse.json({ error: 'Invalid fid.' }, { status: 400 });
  }

  await removeSubscriber(fid).catch(() => null);
  try {
    const { kv } = await import('@vercel/kv');
    await Promise.all([
      kv.srem('notify:removed:fids', String(fid)),
      kv.del(`notify:removed:${fid}`),
    ]);
  } catch {
    // best effort
  }

  return NextResponse.json({ success: true, fid });
}
