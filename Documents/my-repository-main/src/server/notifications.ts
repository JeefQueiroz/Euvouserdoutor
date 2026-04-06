// src/server/notifications.ts
import { promises as fs } from 'fs';
import path from 'path';
import { getSupabaseAdmin } from '@/src/server/supabase';

export type NotificationDetails = {
  url:   string;
  token: string;
};

export type NotificationSubscriber = {
  fid:       number;
  details:   NotificationDetails;
  updatedAt?: string;
};

type UpstashEntry = {
  fid:   number;
  token: string;
  url:   string;
};

const HAS_KV    = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const TOKEN_INDEX_PREFIX = 'notifications:token:';
let supabaseSubscribersAvailable: boolean | null = null;

async function getKv() {
  const { kv } = await import('@vercel/kv');
  return kv;
}

// ✅ Corrige URLs antigas com domínio ou path incorretos:
// "https://relay.farcaster.xyz"           → "https://api.farcaster.xyz/v1/frame-notifications"
// "https://relay.farcaster.xyz/qualquer"  → "https://api.farcaster.xyz/v1/frame-notifications"
function normalizeNotificationUrl(url: string): string {
  try {
    const parsed = new URL(url);

    // Troca domínio relay (descontinuado) pelo api
    if (parsed.hostname === 'relay.farcaster.xyz') {
      parsed.hostname = 'api.farcaster.xyz';
    }

    // Garante path correto
    if (parsed.pathname === '/' || parsed.pathname === '') {
      parsed.pathname = '/v1/frame-notifications';
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

async function canUseSupabaseSubscribersTable(): Promise<boolean> {
  if (supabaseSubscribersAvailable !== null) return supabaseSubscribersAvailable;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('notification_subscribers')
      .select('fid')
      .limit(1);
    supabaseSubscribersAvailable = !error;
    return supabaseSubscribersAvailable;
  } catch {
    supabaseSubscribersAvailable = false;
    return false;
  }
}

async function supabaseUpsertSubscriber(fid: number, details: NotificationDetails): Promise<boolean> {
  if (!(await canUseSupabaseSubscribersTable())) return false;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('notification_subscribers')
      .upsert(
        {
          fid,
          token: details.token,
          url: normalizeNotificationUrl(details.url),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'fid' }
      );
    return !error;
  } catch {
    return false;
  }
}

async function supabaseDeleteSubscriber(fid: number): Promise<boolean> {
  if (!(await canUseSupabaseSubscribersTable())) return false;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('notification_subscribers')
      .delete()
      .eq('fid', fid);
    return !error;
  } catch {
    return false;
  }
}

async function supabaseGetSubscriberByFid(fid: number): Promise<NotificationSubscriber | null> {
  if (!(await canUseSupabaseSubscribersTable())) return null;
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('notification_subscribers')
      .select('fid, token, url, updated_at')
      .eq('fid', fid)
      .maybeSingle();
    if (error || !data) return null;
    return {
      fid: Number(data.fid),
      details: {
        token: String(data.token),
        url: normalizeNotificationUrl(String(data.url)),
      },
      updatedAt: data.updated_at ? String(data.updated_at) : undefined,
    };
  } catch {
    return null;
  }
}

async function supabaseGetSubscribersByFids(fids?: number[]): Promise<NotificationSubscriber[] | null> {
  if (!(await canUseSupabaseSubscribersTable())) return null;
  try {
    const supabase = getSupabaseAdmin();
    let query = supabase
      .from('notification_subscribers')
      .select('fid, token, url, updated_at');

    if (fids && fids.length > 0) {
      query = query.in('fid', fids);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    return data
      .map((row) => ({
        fid: Number(row.fid),
        details: {
          token: String(row.token),
          url: normalizeNotificationUrl(String(row.url)),
        },
        updatedAt: row.updated_at ? String(row.updated_at) : undefined,
      }))
      .filter((row) => Number.isFinite(row.fid) && row.fid > 0);
  } catch {
    return [];
  }
}

async function supabaseRemoveSubscribersByTokens(tokens: string[]): Promise<number | null> {
  if (!(await canUseSupabaseSubscribersTable())) return null;
  if (tokens.length === 0) return 0;
  try {
    const supabase = getSupabaseAdmin();
    const uniqueTokens = Array.from(new Set(tokens)).filter((token) => token.length > 0);
    if (uniqueTokens.length === 0) return 0;

    const { data: rows, error: selectError } = await supabase
      .from('notification_subscribers')
      .select('fid')
      .in('token', uniqueTokens);

    if (selectError || !rows?.length) return 0;
    const fids = rows
      .map((row) => Number(row.fid))
      .filter((fid) => Number.isFinite(fid) && fid > 0);
    if (!fids.length) return 0;

    const { error: deleteError } = await supabase
      .from('notification_subscribers')
      .delete()
      .in('fid', fids);

    if (deleteError) return 0;
    return fids.length;
  } catch {
    return 0;
  }
}

async function kvGetAllFids(): Promise<number[]> {
  const kv      = await getKv();
  const members = await kv.smembers('fids');
  return (members as string[]).map(Number).filter(Number.isFinite);
}

async function kvGetEntry(fid: number): Promise<UpstashEntry | null> {
  const kv  = await getKv();
  const raw = await kv.get<UpstashEntry>(`notifications:${fid}`);
  if (!raw || typeof raw !== 'object') return null;
  return raw;
}

async function kvSetEntry(fid: number, token: string, url: string): Promise<void> {
  const kv = await getKv();
  const previous = await kv.get<UpstashEntry>(`notifications:${fid}`);
  const entry: UpstashEntry = { fid, token, url: normalizeNotificationUrl(url) };
  await kv.set(`notifications:${fid}`, entry);
  await kv.sadd('fids', String(fid));
  await kv.set(`${TOKEN_INDEX_PREFIX}${token}`, fid);
  if (previous?.token && previous.token !== token) {
    await kv.del(`${TOKEN_INDEX_PREFIX}${previous.token}`);
  }
}

async function kvDeleteEntry(fid: number): Promise<void> {
  const kv = await getKv();
  const previous = await kv.get<UpstashEntry>(`notifications:${fid}`);
  await kv.del(`notifications:${fid}`);
  await kv.srem('fids', String(fid));
  if (previous?.token) {
    await kv.del(`${TOKEN_INDEX_PREFIX}${previous.token}`);
  }
}

const STORE_PATH = path.join(process.cwd(), 'data', 'notification-subscribers.json');

type LocalStore = {
  subscribers: Record<string, { fid: number; token: string; url: string; updatedAt: string }>;
};

async function localRead(): Promise<LocalStore> {
  try {
    const raw    = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as LocalStore;
    return parsed?.subscribers ? parsed : { subscribers: {} };
  } catch {
    return { subscribers: {} };
  }
}

async function localWrite(store: LocalStore): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

export async function upsertSubscriber(fid: number, details: NotificationDetails): Promise<void> {
  const savedToSupabase = await supabaseUpsertSubscriber(fid, details);
  if (savedToSupabase) return;

  if (HAS_KV) {
    await kvSetEntry(fid, details.token, details.url);
    return;
  }
  const store = await localRead();
  store.subscribers[String(fid)] = { fid, token: details.token, url: details.url, updatedAt: new Date().toISOString() };
  await localWrite(store);
}

export async function removeSubscriber(fid: number): Promise<void> {
  const removedFromSupabase = await supabaseDeleteSubscriber(fid);
  if (removedFromSupabase) return;

  if (HAS_KV) { await kvDeleteEntry(fid); return; }
  const store = await localRead();
  delete store.subscribers[String(fid)];
  await localWrite(store);
}

export async function removeSubscribersByTokens(tokens: string[]): Promise<number> {
  if (tokens.length === 0) return 0;
  const removedFromSupabase = await supabaseRemoveSubscribersByTokens(tokens);
  if (removedFromSupabase !== null) return removedFromSupabase;

  const removeSet = new Set(tokens);
  let removed     = 0;

  if (HAS_KV) {
    const kv = await getKv();
    const uniqueTokens = Array.from(removeSet).filter((token) => typeof token === 'string' && token.length > 0);
    const fidByToken = await Promise.all(
      uniqueTokens.map(async (token) => ({
        token,
        fid: Number(await kv.get(`${TOKEN_INDEX_PREFIX}${token}`)),
      }))
    );

    const fidsToDelete = Array.from(
      new Set(
        fidByToken
          .map(({ fid }) => fid)
          .filter((fid) => Number.isFinite(fid) && fid > 0)
      )
    );

    if (fidsToDelete.length > 0) {
      await Promise.all(fidsToDelete.map((fid) => kvDeleteEntry(fid)));
      removed += fidsToDelete.length;
    }

    // Limpa índice mesmo para tokens legados sem mapeamento consistente.
    await Promise.all(uniqueTokens.map((token) => kv.del(`${TOKEN_INDEX_PREFIX}${token}`)));
    return removed;
  }

  const store = await localRead();
  for (const [key, sub] of Object.entries(store.subscribers)) {
    if (removeSet.has(sub.token)) { delete store.subscribers[key]; removed++; }
  }
  if (removed > 0) await localWrite(store);
  return removed;
}

export async function getSubscriberByFid(fid: number): Promise<NotificationSubscriber | null> {
  const fromSupabase = await supabaseGetSubscriberByFid(fid);
  if (fromSupabase) return fromSupabase;

  if (HAS_KV) {
    const entry = await kvGetEntry(fid);
    if (!entry) return null;
    return {
      fid: entry.fid,
      details: { token: entry.token, url: entry.url }
    };
  }

  const store = await localRead();
  const sub = store.subscribers[String(fid)];
  if (!sub) return null;
  return {
    fid,
    details: { token: sub.token, url: sub.url },
    updatedAt: sub.updatedAt
  };
}

export async function getSubscribersByFids(fids?: number[]): Promise<NotificationSubscriber[]> {
  const fromSupabase = await supabaseGetSubscribersByFids(fids);
  if (fromSupabase) return fromSupabase;

  if (HAS_KV) {
    const allFids = await kvGetAllFids();
    const targets = fids && fids.length > 0 ? allFids.filter(f => fids.includes(f)) : allFids;
    const results: NotificationSubscriber[] = [];
    const KV_READ_CONCURRENCY = 50;

    for (let i = 0; i < targets.length; i += KV_READ_CONCURRENCY) {
      const group = targets.slice(i, i + KV_READ_CONCURRENCY);
      const entries = await Promise.all(group.map((fid) => kvGetEntry(fid)));
      for (const entry of entries) {
        if (!entry) continue;
        results.push({
          fid:     entry.fid,
          details: { token: entry.token, url: entry.url }
        });
      }
    }
    return results;
  }

  const store = await localRead();
  const results: NotificationSubscriber[] = [];
  for (const [fidStr, sub] of Object.entries(store.subscribers)) {
    const fid = Number(fidStr);
    if (fids && fids.length > 0 && !fids.includes(fid)) continue;
    results.push({
      fid,
      details: { token: sub.token, url: sub.url },
      updatedAt: sub.updatedAt
    });
  }
  return results;
}


export type SendNotificationResult = {
  successfulTokens: string[];
  invalidTokens: string[];
  rateLimitedTokens: string[];
};

export async function sendFarcasterNotification(params: {
  url: string;
  tokens: string[];
  notificationId: string;
  title: string;
  body: string;
  targetUrl: string;
}): Promise<SendNotificationResult> {
  const { url, tokens, notificationId, title, body, targetUrl } = params;
  
  if (!tokens || tokens.length === 0) {
    return {
      successfulTokens: [],
      invalidTokens: [],
      rateLimitedTokens: [],
    };
  }

  const successfulTokens: string[] = [];
  const invalidTokens: string[] = [];
  const rateLimitedTokens: string[] = [];

  try {
    const payload = {
      notificationId,
      title,
      body,
      targetUrl,
      tokens,
    };

    // Implementar timeout com AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // 429 = Too Many Requests (rate limit)
      if (response.status === 429) {
        rateLimitedTokens.push(...tokens);
      } else if (response.status === 400 || response.status === 401) {
        // Invalid tokens
        invalidTokens.push(...tokens);
      } else {
        // Other errors — retry
        rateLimitedTokens.push(...tokens);
      }
      clearTimeout(timeoutId);
      return { successfulTokens, invalidTokens, rateLimitedTokens };
    }

    // Success — all tokens were processed
    successfulTokens.push(...tokens);
  } catch (error) {
    // Network error or timeout — treat as rate limit (retry later)
    rateLimitedTokens.push(...tokens);
  }

  return { successfulTokens, invalidTokens, rateLimitedTokens };
}
