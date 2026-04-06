import { NextResponse } from 'next/server';
import { Errors, createClient } from '@farcaster/quick-auth';
import { getSupabaseAdmin } from '@/src/server/supabase';

export const dynamic = 'force-dynamic';

const quickAuthClient = createClient();

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
    if (Number.isFinite(points) && points >= 0) {
      patch.points = Math.floor(points);
    }
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
    // Not JSON value
  }

  return patch;
}

async function upsertProfileState(fid: number, key: string, value: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const row: Record<string, unknown> = deriveProfilePatchFromState(fid, key, value);
  
  // Apenas faz upsert se houver algo além de fid e updated_at
  if (Object.keys(row).length <= 2) return;

  for (let i = 0; i < 8; i += 1) {
    const { error } = await supabase.from('profiles').upsert(row, { onConflict: 'fid' });
    if (!error) return;
    const missing = parseMissingColumn(error.message || '');
    if (!missing || !(missing in row)) return;
    delete row[missing];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = Number(searchParams.get('fid'));
    if (!Number.isFinite(fid) || fid <= 0) {
      return NextResponse.json({ error: 'FID missing or invalid.' }, { status: 400 });
    }

    const authFid = await authenticateFid(request).catch(() => null);
    if (authFid !== null && authFid !== fid) {
      return NextResponse.json({ error: 'FID mismatch.' }, { status: 403 });
    }

    // Tenta ler do Supabase primeiro (Fonte de Verdade)
    const supabase = getSupabaseAdmin();
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('fid', fid)
      .single();

    if (profile) {
      // Reconstrói o estado compatível com o Mini App a partir do Supabase
      const state: Record<string, string> = {
        [`xray:${fid}:points`]: String(profile.points || 0),
        [`xray:${fid}:tasks`]: JSON.stringify({
          follow_fc: !!profile.task_follow_fc,
          follow_x: !!profile.task_follow_x,
          mint_nft: !!profile.task_mint_nft,
          share_xray: !!profile.task_share_xray,
          notif: !!profile.task_notif,
        }),
        [`xray:${fid}:checkin-cache`]: JSON.stringify({
          streak: profile.streak || 0,
          bestStreak: profile.best_streak || 0,
          lastDate: profile.last_checkin ? profile.last_checkin.slice(0, 10) : '',
        })
      };
      return NextResponse.json({ state });
    }

    // Fallback para KV se não houver no Supabase
    const { kv } = await import('@vercel/kv');
    const raw = (await kv.hgetall<Record<string, string>>(`user:state:${fid}`)) || {};
    const filtered = Object.fromEntries(Object.entries(raw).filter(([key]) => isAllowedKey(key)));
    return NextResponse.json({ state: filtered });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authFid = await authenticateFid(request);
    if (!authFid) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as { key?: string; value?: string };
    const key = typeof body.key === 'string' ? body.key : '';
    const value = typeof body.value === 'string' ? body.value : '';

    if (!key || !isAllowedKey(key)) return NextResponse.json({ error: 'Invalid key.' }, { status: 400 });

    const expectedPrefix = `xray:${authFid}:`;
    if (!key.startsWith(expectedPrefix)) {
      return NextResponse.json({ error: `Forbidden.` }, { status: 403 });
    }

    // 1. Persistência ON-TIME no Supabase (Aguardada)
    await upsertProfileState(authFid, key, value);

    // 2. Background sync KV (Cache)
    ;(async () => {
      try {
        const { kv } = await import('@vercel/kv');
        await kv.hset(`user:state:${authFid}`, { [key]: value });
      } catch (e) {
        console.error('[user-state] background sync error:', e);
      }
    })();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
