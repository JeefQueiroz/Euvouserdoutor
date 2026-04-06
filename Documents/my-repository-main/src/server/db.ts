import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

function assertDbOk(context: string, error: { message?: string } | null) {
  if (!error) return;
  throw new Error(`${context}: ${error.message || 'unknown database error'}`);
}

function normalizeEnv(value?: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function pickEnv(...values: Array<string | undefined>): string {
  for (const value of values) {
    const normalized = normalizeEnv(value);
    if (normalized) return normalized;
  }
  return '';
}

export function getDb(): SupabaseClient {
  if (_client) return _client;
  const url = pickEnv(
    process.env.SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL,
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_URL,
    // Suporte a nomes duplicados do Vercel
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_POSTGRES_HOST ? `https://${process.env.NEXT_PUBLIC_SUPABASE_POSTGRES_HOST}` : undefined
  );
  const key = pickEnv(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.SUPABASE_SERVICE_KEY,
    process.env.SUPABASE_SECRET,
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SERVICE_ROLE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SECRET_KEY,
    // Suporte a nomes duplicados do Vercel
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SERVICE_ROLE_KEY,
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY
  );
  if (!url || !key) {
    console.error('[getDb] URL:', !!url, '| KEY:', !!key);
    throw new Error('Database configuration is missing.');
  }
  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

export type UserProfileComplete = {
  fid: number;
  username: string;
  pfp_url: string | null;
  follower_count: number;
  following_count: number;
  neynar_score: number;
  verified_wallets: string[];
  primary_wallet: string | null;
  base_points: number;
  nft_count: number;
  nft_score: number;
  total_points: number;
  rank: number | null;
  streak: number;
  best_streak: number;
  last_checkin: string | null;
  checkin_history: string[];
  profile_synced_at?: string | null;
};

export type NftOwnership = {
  fid: number;
  token_id: string;
  wallet_address: string;
  image_url: string | null;
  metadata_url: string | null;
};

export type LeaderboardEntry = {
  fid: number;
  username: string;
  pfp_url: string | null;
  base_points: number;
  nft_count: number;
  nft_score: number;
  total_points: number;
  neynar_score: number;
};

type KvLeaderboardEntry = {
  fid?: number;
  username?: string;
  pfpUrl?: string | null;
  pfp_url?: string | null;
  points?: number;
  base_points?: number;
  nftCount?: number;
  nft_count?: number;
  nftScore?: number;
  nft_score?: number;
  totalPoints?: number;
  total_points?: number;
  neynarScore?: number;
  neynar_score?: number;
};

export async function getUserProfile(fid: number): Promise<UserProfileComplete | null> {
  const db = getDb();
  const { data, error } = await db
    .from('user_profile_complete')
    .select('*')
    .eq('fid', fid)
    .single();

  if (error || !data) return null;
  return data as UserProfileComplete;
}

export async function getLeaderboard(options: {
  mode: 'points' | 'nft';
  limit: number;
  offset: number;
}): Promise<{ entries: LeaderboardEntry[]; total: number }> {
  const db = getDb();
  const limit = Math.min(Math.max(options.limit, 1), 100);
  const offset = Math.max(options.offset, 0);
  
  // Validação de sanidade para evitar carregar dados demais
  if (offset > 10000) {
    return { entries: [], total: 0 };
  }
  
  // Aplicar filtro de modo (nft ou points) antes de paginar
  let query = db
    .from('leaderboard')
    .select(
      `
      fid,
      username,
      pfp_url,
      points,
      base_points,
      nft_count,
      nft_score,
      total_points,
      neynar_score
    `,
      { count: 'exact' }
    );
  
  // Aplicar filtro de modo se necessário
  if (options.mode === 'nft') {
    query = query.gt('nft_count', 0);
  }
  
  // Ordenar pelo modo apropriado
  if (options.mode === 'nft') {
    query = query
      .order('nft_count', { ascending: false })
      .order('nft_score', { ascending: false })
      .order('total_points', { ascending: false })
      .order('neynar_score', { ascending: false })
      .order('fid', { ascending: true });
  } else {
    query = query
      .order('total_points', { ascending: false })
      .order('nft_count', { ascending: false })
      .order('neynar_score', { ascending: false })
      .order('fid', { ascending: true });
  }
  
  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error || !data) {
    console.warn('[getLeaderboard] Supabase query failed:', error);
    return getLeaderboardFromKv(options);
  }

  const rows = (data as any[]).map((row) => ({
    fid: Number(row.fid),
    username: row.username ?? `fid_${row.fid}`,
    pfp_url: row.pfp_url ?? null,
    base_points: Number(row.base_points ?? row.points ?? 0),
    nft_count: Number(row.nft_count || 0),
    nft_score: Number(row.nft_score || 0),
    total_points: Number(row.total_points || 0),
    neynar_score: Number(row.neynar_score || 0),
  }));

  // Dados já estão paginados e ordenados do Supabase
  const entries = rows.filter((row) => Number.isFinite(row.fid) && row.fid > 0);
  const total = count ?? 0;
  return { entries, total };
}

async function getLeaderboardFromKv(options: {
  mode: 'points' | 'nft';
  limit: number;
  offset: number;
}): Promise<{ entries: LeaderboardEntry[]; total: number }> {
  try {
    const { kv } = await import('@vercel/kv');
    const limit = Math.min(Math.max(options.limit, 1), 100);
    const offset = Math.max(options.offset, 0);
    
    const rawFids = await kv.smembers<string[]>('lb:fids');
    const fids = (rawFids || [])
      .map((v) => Number(v))
      .filter((v) => Number.isFinite(v) && v > 0);

    if (fids.length === 0) {
      return { entries: [], total: 0 };
    }
    
    // Limitar quantidade de FIDs carregados para evitar memory issues
    // Apenas carregar FIDs necessários para a página solicitada + buffer
    const bufferSize = Math.min(limit * 5, 500); // Buffer de até 500 registros
    const startIdx = Math.max(offset, 0);
    const endIdx = startIdx + bufferSize;
    const fidsToLoad = fids.slice(0, endIdx);

    const rowsRaw = await Promise.all(
      fidsToLoad.map(async (fid) => {
        const row = await kv.get<KvLeaderboardEntry>(`lb:${fid}`);
        return { fid, row };
      })
    );

    const rows: LeaderboardEntry[] = rowsRaw
      .map(({ fid, row }) => {
        const username = row?.username ?? `fid_${fid}`;
        const pfp_url = row?.pfp_url ?? row?.pfpUrl ?? null;
        const base_points = Number(row?.base_points ?? row?.points ?? 0);
        const nft_count = Number(row?.nft_count ?? row?.nftCount ?? 0);
        const nft_score = Number(row?.nft_score ?? row?.nftScore ?? 0);
        const total_points = Number(row?.total_points ?? row?.totalPoints ?? (base_points + nft_score));
        const neynar_score = Number(row?.neynar_score ?? row?.neynarScore ?? 0);
        return {
          fid,
          username,
          pfp_url,
          base_points: Number.isFinite(base_points) ? base_points : 0,
          nft_count: Number.isFinite(nft_count) ? nft_count : 0,
          nft_score: Number.isFinite(nft_score) ? nft_score : 0,
          total_points: Number.isFinite(total_points) ? total_points : 0,
          neynar_score: Number.isFinite(neynar_score) ? neynar_score : 0,
        };
      })
      .filter((row) => row.fid > 0);

    const filtered = rows.filter((row) => (options.mode === 'nft' ? row.nft_count > 0 : true));
    filtered.sort((a, b) => {
      if (options.mode === 'nft') {
        return (
          b.nft_count - a.nft_count ||
          b.nft_score - a.nft_score ||
          b.total_points - a.total_points ||
          b.neynar_score - a.neynar_score ||
          a.fid - b.fid
        );
      }
      return (
        b.total_points - a.total_points ||
        b.nft_count - a.nft_count ||
        b.neynar_score - a.neynar_score ||
        a.fid - b.fid
      );
    });

    const start = Math.max(offset, 0);
    const end = start + limit;
    return {
      entries: filtered.slice(start, end),
      total: filtered.length,
    };
  } catch (error) {
    console.warn('[getLeaderboardFromKv] KV query failed:', error);
    return { entries: [], total: 0 };
  }
}

export async function getUserNfts(fid: number): Promise<NftOwnership[]> {
  const db = getDb();
  const { data } = await db
    .from('nft_ownership')
    .select('fid, token_id, wallet_address, image_url, metadata_url, synced_at')
    .eq('fid', fid)
    .order('synced_at', { ascending: false })
    .order('token_id', { ascending: false });

  return (data as NftOwnership[]) ?? [];
}

export async function upsertUser(params: {
  fid: number;
  username: string;
  pfp_url?: string | null;
  follower_count?: number;
  following_count?: number;
  neynar_score?: number;
  verified_wallets?: string[];
  primary_wallet?: string | null;
}): Promise<void> {
  const db = getDb();
  const { error } = await db.from('users').upsert(
    {
      ...params,
      synced_at: new Date().toISOString(),
    },
    { onConflict: 'fid' }
  );
  assertDbOk('upsertUser failed', error);
}

export async function upsertLeaderboard(params: {
  fid: number;
  base_points: number;
  nft_count: number;
}): Promise<void> {
  const db = getDb();
  const { error } = await db.from('leaderboard').upsert(
    {
      fid: params.fid,
      base_points: params.base_points,
      nft_count: params.nft_count,
    },
    { onConflict: 'fid' }
  );
  assertDbOk('upsertLeaderboard failed', error);
}

export async function upsertCheckin(params: {
  fid: number;
  streak: number;
  best_streak: number;
  last_date: string;
  history: string[];
}): Promise<void> {
  const db = getDb();
  const { error } = await db.from('checkins').upsert(
    {
      ...params,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'fid' }
  );
  assertDbOk('upsertCheckin failed', error);
}

export async function upsertNftOwnership(
  fid: number,
  nfts: {
    token_id: string;
    wallet_address: string;
    image_url?: string | null;
    metadata_url?: string | null;
  }[]
): Promise<void> {
  if (!nfts.length) return;
  const db = getDb();
  const { error } = await db.from('nft_ownership').upsert(
    nfts.map((n) => ({ ...n, fid, synced_at: new Date().toISOString() })),
    { onConflict: 'fid,token_id' }
  );
  assertDbOk('upsertNftOwnership failed', error);

  // Best-effort reconcile to keep leaderboard/profile in sync with ownership table.
  try {
    await db.rpc("reconcile_nft_points", { p_fid: fid });
  } catch (e: unknown) {
    console.warn("[db] reconcile_nft_points RPC missing or failed:", e);
  }
  try {
    await db.rpc("recalculate_ranks");
  } catch (e: unknown) {
    console.warn("[db] recalculate_ranks RPC missing or failed:", e);
  }
}

export async function addBasePoints(fid: number, points: number): Promise<number> {
  const db = getDb();
  const { data, error } = await db.rpc('increment_base_points', {
    p_fid: fid,
    p_points: points,
  });
  assertDbOk('addBasePoints failed', error);
  return Number(data ?? 0);
}

export async function recalculateRanks(): Promise<void> {
  const db = getDb();
  await db.rpc('recalculate_ranks');
}
