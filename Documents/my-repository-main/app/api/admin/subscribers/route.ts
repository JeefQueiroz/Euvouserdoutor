import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/src/server/supabase';
import { getSubscribersByFids } from '@/src/server/notifications';

export const dynamic = 'force-dynamic';

function isAuthorized(request: Request): boolean {
  const key = process.env.NOTIFICATIONS_API_KEY?.trim();
  if (!key) return false;
  return request.headers.get('x-api-key') === key;
}

function toIsoDayDiff(days: number): string {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - days);
  return now.toISOString();
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();

    const [{ data: statsData, error: statsError }, { data: recentData, error: recentError }] = await Promise.all([
      supabase.from('subscribers_stats').select('*').single(),
      supabase
        .from('notification_subscribers')
        .select('fid, username, pfp_url, updated_at')
        .order('updated_at', { ascending: false })
        .limit(20),
    ]);

    if (statsError) throw statsError;
    if (recentError) throw recentError;

    return NextResponse.json({
      stats: statsData,
      recent: recentData || [],
    });
  } catch {
    const subscribers = await getSubscribersByFids().catch(() => []);
    const now = Date.now();
    const cutoff7d = Date.parse(toIsoDayDiff(7));
    const cutoff30d = Date.parse(toIsoDayDiff(30));

    const normalizedRecent = subscribers
      .map((item) => ({
        fid: item.fid,
        username: null as string | null,
        pfp_url: null as string | null,
        updated_at: item.updatedAt || new Date(now).toISOString(),
      }))
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
      .slice(0, 20);

    const stats = {
      total: subscribers.length,
      active_7d: subscribers.filter((item) => {
        const ts = item.updatedAt ? Date.parse(item.updatedAt) : NaN;
        return Number.isFinite(ts) && ts >= cutoff7d;
      }).length,
      active_30d: subscribers.filter((item) => {
        const ts = item.updatedAt ? Date.parse(item.updatedAt) : NaN;
        return Number.isFinite(ts) && ts >= cutoff30d;
      }).length,
      last_registered: normalizedRecent[0]?.updated_at || null,
    };

    return NextResponse.json({
      stats,
      recent: normalizedRecent,
      fallback: 'kv',
    });
  }
}
