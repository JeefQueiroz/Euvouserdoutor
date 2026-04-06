// src/server/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ── Cliente admin (service role) ─────────────────────────────────────────────
let _adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_adminClient) return _adminClient;
  
  // Suporte a nomes de variáveis com prefixos duplicados do Vercel
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_URL ||
    (process.env.NEXT_PUBLIC_SUPABASE_POSTGRES_HOST ? `https://${process.env.NEXT_PUBLIC_SUPABASE_POSTGRES_HOST}` : '') ||
    '';
  
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SECRET ||
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY ||
    '';
  
  if (!url || !key) {
    console.error('[getSupabaseAdmin] URL:', !!url, '| KEY:', !!key);
    throw new Error('Supabase admin config missing.');
  }
  
  _adminClient = createClient(url.trim(), key.trim(), { auth: { persistSession: false } });
  return _adminClient;
}

// Alias para compatibilidade com imports existentes
export const supabaseAdmin = {
  get client() {
    return getSupabaseAdmin();
  },
  from: (...args: Parameters<SupabaseClient['from']>) => getSupabaseAdmin().from(...args),
  rpc:  (...args: Parameters<SupabaseClient['rpc']>)  => getSupabaseAdmin().rpc(...args),
};

// ── calcNftScore ──────────────────────────────────────────────────────────────
// genesis: 50pts; cada NFT adicional: +100pts
export function calcNftScore(nftCount: number): number {
  const n = Math.max(0, Math.floor(Number(nftCount) || 0));
  if (n === 0) return 0;
  return 50 + (n - 1) * 100;
}

// ── Tipos compartilhados ──────────────────────────────────────────────────────
export type LeaderboardSyncParams = {
  fid: number;
  username: string;
  pfp_url: string | null;
  base_points: number;
  nft_count: number;
  nft_score: number;
  total_points: number;
  neynar_score: number;
  streak?: number;
  best_streak?: number;
};

export type ProfileSyncParams = {
  fid: number;
  username: string;
  pfp_url: string | null;
  points: number;
  nft_score: number;
  total_points: number;
  neynar_score: number;
  nft_count: number;
  streak?: number;
  best_streak?: number;
  wallet_address?: string | null;
};

export type UserIdentitySyncParams = {
  fid: number;
  username: string;
  pfp_url: string | null;
  neynar_score: number;
  follower_count: number;
  following_count: number;
  verified_wallets: string[];
  primary_wallet: string | null;
};

// ── syncLeaderboardToSupabase ────────────────────────────────────────────────
export async function syncLeaderboardToSupabase(params: LeaderboardSyncParams): Promise<void> {
  const db = getSupabaseAdmin();
  const { error } = await db.from('leaderboard').upsert(
    {
      fid:          params.fid,
      username:     params.username,
      pfp_url:      params.pfp_url,
      base_points:  params.base_points,
      nft_count:    params.nft_count,
      nft_score:    params.nft_score,
      total_points: params.total_points,
      neynar_score: params.neynar_score,
      streak:       params.streak ?? 0,
      best_streak:  params.best_streak ?? 0,
      updated_at:   new Date().toISOString(),
    },
    { onConflict: 'fid' }
  );
  if (error) {
    // Log visível — não silenciado — para detectar schema drift
    console.error('[syncLeaderboardToSupabase] ERRO:', error.message, '| code:', error.code);
  }
}

// ── syncProfileToSupabase ────────────────────────────────────────────────────
export async function syncProfileToSupabase(params: ProfileSyncParams): Promise<void> {
  const db = getSupabaseAdmin();
  const row: Record<string, unknown> = {
    fid:          params.fid,
    username:     params.username,
    pfp_url:      params.pfp_url,
    points:       params.points,
    nft_score:    params.nft_score,
    total_points: params.total_points,
    neynar_score: params.neynar_score,
    nft_count:    params.nft_count,
    streak:       params.streak ?? 0,
    best_streak:  params.best_streak ?? 0,
    updated_at:   new Date().toISOString(),
  };
  if (params.wallet_address) row.wallet_address = params.wallet_address;

  // Retry removendo colunas inexistentes (max 4 tentativas — trata schema drift)
  for (let i = 0; i < 4; i++) {
    const { error } = await db.from('profiles').upsert(row, { onConflict: 'fid' });
    if (!error) return;
    const match = error.message?.match(/Could not find the '([^']+)' column/i)
      ?? error.message?.match(/column .*\.([a-zA-Z0-9_]+) does not exist/i);
    const col = match?.[1];
    if (!col || !(col in row)) {
      console.error('[syncProfileToSupabase] ERRO não recuperável:', error.message, '| code:', error.code);
      return;
    }
    console.warn(`[syncProfileToSupabase] coluna '${col}' não existe no schema — removendo e retentando.`);
    delete row[col];
  }
}

// ── syncUserIdentityToSupabase ───────────────────────────────────────────────
export async function syncUserIdentityToSupabase(params: UserIdentitySyncParams): Promise<void> {
  const db = getSupabaseAdmin();
  const { error } = await db.from('users').upsert(
    {
      fid:              params.fid,
      username:         params.username,
      pfp_url:          params.pfp_url,
      neynar_score:     params.neynar_score,
      follower_count:   params.follower_count,
      following_count:  params.following_count,
      verified_wallets: params.verified_wallets,
      primary_wallet:   params.primary_wallet,
      synced_at:        new Date().toISOString(),
    },
    { onConflict: 'fid' }
  );
  if (error) {
    console.error('[syncUserIdentityToSupabase] ERRO:', error.message, '| code:', error.code);
  }
}

// ── recordPointTransaction ───────────────────────────────────────────────────
// CORRIGIDO: usa os nomes de colunas corretos do schema
// (event_type, points_earned, event_date) em vez de (type, amount)
export async function recordPointTransaction(
  fid: number,
  event_type: string,
  points_earned: number,
  meta?: Record<string, unknown>
): Promise<void> {
  const db = getSupabaseAdmin();
  const { error } = await db.from('point_transactions').insert({
    fid,
    event_type,
    points_earned,
    event_date: new Date().toISOString().slice(0, 10), // DATE campo: YYYY-MM-DD
    meta: meta ?? null,
    created_at: new Date().toISOString(),
  });
  if (error) {
    console.error('[recordPointTransaction] ERRO:', error.message, '| code:', error.code);
  }
}

// ── syncUserSnapshotToSupabase ──────────────────────────────────────────────
export async function syncUserSnapshotToSupabase(
  fid: number,
  snapshot: Record<string, unknown>
): Promise<void> {
  const db = getSupabaseAdmin();
  const row: Record<string, unknown> = {
    fid,
    ...snapshot,
    updated_at: new Date().toISOString(),
  };

  // Retry removendo colunas inexistentes (max 8 tentativas — trata schema drift)
  for (let i = 0; i < 8; i++) {
    const { error } = await db.from('profiles').upsert(row, { onConflict: 'fid' });
    if (!error) return;
    const match = error.message?.match(/Could not find the '([^']+)' column/i)
      ?? error.message?.match(/column .*\.([a-zA-Z0-9_]+) does not exist/i);
    const col = match?.[1];
    if (!col || !(col in row)) {
      console.error('[syncUserSnapshotToSupabase] ERRO não recuperável:', error.message, '| code:', error.code);
      return;
    }
    console.warn(`[syncUserSnapshotToSupabase] coluna '${col}' não existe — removendo e retentando.`);
    delete (row as Record<string, unknown>)[col];
  }
}
