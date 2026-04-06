import { resolveIdentityByFid } from './farcaster';
import { countNftsForWallets, fetchNftOwnershipForWallets, fetchNftsForWallets } from './nfts';
import {
  getDb,
  upsertUser,
  upsertLeaderboard,
  upsertNftOwnership,
} from './db';
import { calcNftScore, syncProfileToSupabase, syncLeaderboardToSupabase } from './supabase';

// Reduzido de 300s para 60s — evita descartar eventos num intervalo longo
const SYNC_LOCK_TTL_SECONDS = 60;

export async function syncUserToSupabase(fid: number): Promise<void> {
  const lockKey = `sync:lock:${fid}`;
  const { kv } = await import('@vercel/kv');
  const locked = await kv.set(lockKey, 1, { nx: true, ex: SYNC_LOCK_TTL_SECONDS });
  if (!locked) {
    console.warn(`[syncUserToSupabase] Sync lock active for FID ${fid}. Skipping sync.`);
    return;
  }

  try {
    const identity = await resolveIdentityByFid(fid);
    const normalizeWallet = (v: unknown): string | null =>
      typeof v === 'string' && /^0x[a-fA-F0-9]{40}$/.test(v.trim()) ? v.trim().toLowerCase() : null;

    let linkedWallets: string[] = [];
    let userWalletsFromDb: string[] = [];
    let profileWalletFromDb: string | null = null;
    try {
      const dbForWallets = getDb();
      const [{ data }, { data: userRow }, { data: profileRow }] = await Promise.all([
        dbForWallets.from('fid_wallets').select('wallet_address').eq('fid', fid).limit(200),
        dbForWallets.from('users').select('verified_wallets, primary_wallet').eq('fid', fid).maybeSingle(),
        dbForWallets.from('profiles').select('wallet_address').eq('fid', fid).maybeSingle(),
      ]);
      linkedWallets = Array.isArray(data)
        ? data
            .map((row: { wallet_address?: unknown }) =>
              typeof row?.wallet_address === 'string' ? row.wallet_address.toLowerCase() : null
            )
            .filter((w: string | null): w is string => !!w)
        : [];

      const verifiedWallets = Array.isArray((userRow as any)?.verified_wallets)
        ? ((userRow as any).verified_wallets as unknown[])
        : [];
      const primaryWallet = (userRow as any)?.primary_wallet;
      userWalletsFromDb = Array.from(
        new Set(
          [...verifiedWallets, primaryWallet]
            .map((w) => normalizeWallet(w))
            .filter((w): w is string => !!w)
        )
      );
      profileWalletFromDb = normalizeWallet((profileRow as any)?.wallet_address ?? null);
    } catch {
      linkedWallets = [];
      userWalletsFromDb = [];
      profileWalletFromDb = null;
    }

    const walletsForSync = Array.from(new Set([...(identity.allKnownWallets || []), ...linkedWallets]));
    const allWalletsForSync = Array.from(
      new Set(
        [...walletsForSync, ...userWalletsFromDb, profileWalletFromDb]
          .map((w) => normalizeWallet(w))
          .filter((w): w is string => !!w)
      )
    );

    // Sincroniza identidade do usuário com todas as carteiras consolidadas
    await upsertUser({
      fid,
      username: identity.username,
      pfp_url: identity.pfp,
      follower_count: identity.followerCount ?? 0,
      following_count: identity.followingCount ?? 0,
      neynar_score: identity.score ?? 0,
      verified_wallets: allWalletsForSync,
      primary_wallet: identity.verifiedWallet || allWalletsForSync[0] || null,
    });

    // Sincroniza dados do Neynar no Supabase (follower_count)
    try {
      const db = getDb();
      await db.from('profiles').update({
        follower_count: identity.followerCount ?? 0,
        neynar_score: identity.score ?? 0,
        updated_at: new Date().toISOString(),
      }).eq('fid', fid);
    } catch (e) {
      console.warn('[sync] Failed to update Neynar data in profiles:', e);
    }

    if (allWalletsForSync.length > 0) {
      // Consolida NFTs de todas as carteiras vinculadas (Farcaster + Base)
      const [{ nfts }, balanceBasedCount] = await Promise.all([
        fetchNftsForWallets(allWalletsForSync, true),
        countNftsForWallets(allWalletsForSync),
      ]);
      const fallbackWallet = identity.verifiedWallet || allWalletsForSync[0] || '';
      const ownership = await fetchNftOwnershipForWallets(allWalletsForSync, true);
      
      // Log para debug: quantos NFTs foram encontrados em cada carteira
      console.log(`[sync] FID ${fid}: ${allWalletsForSync.length} carteiras, ${nfts.length} NFTs encontrados, ${balanceBasedCount} por saldo`);

      // RPCs protegidos para não quebrar o fluxo principal
      if (ownership.length > 0) {
        await upsertNftOwnershipSafe(fid, ownership);
      } else if (nfts.length > 0) {
        await upsertNftOwnershipSafe(
          fid,
          nfts.map((n) => ({
            token_id: n.tokenId,
            wallet_address: fallbackWallet,
            image_url: n.imageUrl,
            metadata_url: null,
          }))
        );
      }

      const db = getDb();
      const existing = await db
        .from('leaderboard')
        .select('base_points,nft_count')
        .eq('fid', fid)
        .single();

      const kvRow = await kv.get<{ points?: number }>(`lb:${fid}`).catch(() => null);
      const dbBasePoints = Number(existing.data?.base_points || 0);
      const dbNftCount = Number(existing.data?.nft_count || 0);
      const kvBasePoints = Number(kvRow?.points || 0);
      // Consolida contagem de NFTs de múltiplas fontes
      const nftCount = Math.max(nfts.length, ownership.length, Number(balanceBasedCount || 0), dbNftCount);
      const genesisFloor = nftCount > 0 ? 50 : 0;
      const basePoints = Math.max(genesisFloor, dbBasePoints, kvBasePoints);

      await upsertLeaderboard({ fid, base_points: basePoints, nft_count: nftCount });

      const nftScore = calcNftScore(nftCount);
      const totalPoints = basePoints + nftScore;
      
      // Sincroniza leaderboard e perfil com dados consolidados de NFTs
      await Promise.allSettled([
        syncLeaderboardToSupabase({
          fid,
          username: identity.username,
          pfp_url: identity.pfp,
          base_points: basePoints,
          nft_count: nftCount,
          nft_score: nftScore,
          total_points: totalPoints,
          neynar_score: identity.score ?? 0,
          streak: 0,
          best_streak: 0,
        }),
        syncProfileToSupabase({
          fid,
          username: identity.username,
          pfp_url: identity.pfp,
          points: basePoints,
          nft_score: nftScore,
          total_points: totalPoints,
          neynar_score: identity.score ?? 0,
          nft_count: nftCount,
          streak: 0,
          best_streak: 0,
          wallet_address: fallbackWallet || null,
        }),
      ]);
    }
  } finally {
    await kv.del(lockKey);
  }
}

/**
 * Versão segura do upsertNftOwnership — RPCs opcionais não quebram o fluxo.
 */
async function upsertNftOwnershipSafe(
  fid: number,
  nfts: { token_id: string; wallet_address: string; image_url?: string | null; metadata_url?: string | null }[]
): Promise<void> {
  if (!nfts.length) return;
  const db = getDb();
  const { error } = await db.from('nft_ownership').upsert(
    nfts.map((n) => ({ ...n, fid, synced_at: new Date().toISOString() })),
    { onConflict: 'fid,token_id' }
  );
  if (error) {
    console.warn('[upsertNftOwnershipSafe] upsert error:', error.message);
    return; // não propaga — RPCs abaixo são opcionais
  }
  // RPCs são best-effort — se não existirem no Supabase, apenas logam warning
  try {
    await db.rpc('reconcile_nft_points', { p_fid: fid });
  } catch (e: unknown) {
    console.warn('[sync] reconcile_nft_points RPC missing or failed:', e);
  }
  try {
    await db.rpc('recalculate_ranks');
  } catch (e: unknown) {
    console.warn('[sync] recalculate_ranks RPC missing or failed:', e);
  }
}

export async function recalculateRanks(): Promise<void> {
  const db = getDb();
  await db.rpc('recalculate_ranks');
}

export async function syncLeaderboardBatch(fids: number[]): Promise<void> {
  const BATCH_SIZE = 20;
  for (let i = 0; i < fids.length; i += BATCH_SIZE) {
    const batch = fids.slice(i, i + BATCH_SIZE);
    console.log(`[sync] Sincronizando batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} usuários`);
    await Promise.allSettled(batch.map((fid) => syncUserToSupabase(fid)));
    if (i + BATCH_SIZE < fids.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  console.log('[sync] Recalculando ranks...');
  await recalculateRanks();
  console.log('[sync] Batch completo!');
}
