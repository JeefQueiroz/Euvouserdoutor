import { NextResponse } from 'next/server';
import { getUserProfile, getUserNfts, getDb, upsertNftOwnership } from '@/src/server/db';
import { syncUserToSupabase } from '@/src/server/sync';
import { resolveIdentityByFid } from '@/src/server/farcaster';
import { countNftsForWallets, fetchNftOwnershipForWallets, fetchNftsForWallets } from '@/src/server/nfts';
import { calcNftScore } from '@/src/server/supabase';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { fid: string } }) {
  try {
    const fid = Number(params.fid);
    if (!fid || Number.isNaN(fid)) {
      return NextResponse.json({ error: 'Invalid FID' }, { status: 400 });
    }

    let profile = await getUserProfile(fid).catch(() => null);
    // First visit must not get stuck on 202 forever.
    if (!profile) {
      await syncUserToSupabase(fid).catch(() => null);
      profile = await getUserProfile(fid).catch(() => null);
    }

    const identity = await resolveIdentityByFid(fid).catch(() => null);

    if (profile) {
      const syncedAt = new Date(profile.profile_synced_at || 0).getTime();
      if (Date.now() - syncedAt > 10 * 60 * 1000) {
        syncUserToSupabase(fid).catch(() => null);
      }
    }

    const normalizeWallet = (v: unknown): string | null =>
      typeof v === 'string' && /^0x[a-fA-F0-9]{40}$/.test(v.trim()) ? v.trim().toLowerCase() : null;

    const fallbackWallets = identity?.allKnownWallets || [];
    const profileWallets = profile?.verified_wallets || [];
    const profilePrimaryWallet = normalizeWallet(profile?.primary_wallet ?? null);
    let linkedWallets: string[] = [];
    try {
      const db = getDb();
      const { data } = await db.from('fid_wallets').select('wallet_address').eq('fid', fid).limit(200);
      linkedWallets = Array.isArray(data)
        ? data
            .map((row: { wallet_address?: unknown }) =>
              typeof row?.wallet_address === 'string' ? row.wallet_address.toLowerCase() : null
            )
            .filter((w: string | null): w is string => !!w)
        : [];
    } catch {
      linkedWallets = [];
    }

    // Garante que todas as carteiras conhecidas (do perfil, da identidade Farcaster e do DB) sejam consideradas.
    // Isso é crucial na primeira visita ou quando a Neynar API Key não está configurada,
    // para que os NFTs sejam carregados corretamente.
    const mergedWallets = Array.from(
      new Set(
        [...(profile?.verified_wallets || []), ...(identity?.allKnownWallets || []), ...linkedWallets, profilePrimaryWallet]
          .map((w) => normalizeWallet(w))
          .filter((w): w is string => !!w)
      )
    );
    const secondaryWallets = identity?.secondaryWallets || [];

    // Persist merged wallet history for this FID so future leaderboard syncs can see Base wallets too.
    try {
      if (mergedWallets.length > 0) {
        const { kv } = await import('@vercel/kv');
        await Promise.all(mergedWallets.map((wallet) => kv.sadd(`fid:wallets:${fid}`, wallet)));
      }
    } catch {
      // best effort cache history only
    }

    let balanceBasedCount = 0;
    // 1. Sempre tenta buscar todos os NFTs on-chain para não perder os NFTs Extras
    let fallbackNfts: any[] = [];
    if (mergedWallets.length > 0) {
      try {
        const [fetched, counted] = await Promise.all([
          fetchNftsForWallets(mergedWallets, true),
          countNftsForWallets(mergedWallets),
        ]);
        fallbackNfts = fetched.nfts.map((n: any) => ({
          token_id: n.tokenId,
          image_url: n.imageUrl,
        }));
        balanceBasedCount = Number(counted || 0);
      } catch (e) {
        console.error("Error fetching fallback NFTs:", e);
      }
    }

    let dbNfts: any[] = [];
    try {
      dbNfts = profile ? await getUserNfts(fid) : [];
    } catch (e) {}

    // Mescla NFTs do DB com os NFTs Extras da varredura on-chain (sem duplicar)
    const nftsMap = new Map();
    for (const n of fallbackNfts) nftsMap.set(String(n.token_id), n);
    for (const n of dbNfts) {
      if (!nftsMap.has(String(n.token_id))) {
        nftsMap.set(String(n.token_id), { token_id: n.token_id, image_url: n.image_url });
      }
    }
    const nfts = Array.from(nftsMap.values());

    // Persist token ownership discovered from merged wallets (Base + Farcaster wallets).
    if (mergedWallets.length > 0) {
      try {
        const ownership = await fetchNftOwnershipForWallets(mergedWallets, true);
        if (ownership.length > 0) {
          await upsertNftOwnership(fid, ownership);
        }
      } catch {
        // best effort ownership sync
      }
    }

    // Busca e atualiza pontos/NFTs no Leaderboard automaticamente
    let points = 0;
    try {
      const db = getDb();
      const { data: lbData } = await db.from('leaderboard').select('total_points, base_points, nft_count, neynar_score').eq('fid', fid).maybeSingle();
      
      const currentDbNftCount = lbData?.nft_count ?? 0;
      const actualNftCount = Math.max(
        Number(currentDbNftCount || 0),
        Number(profile?.nft_count || 0),
        Number(nfts.length || 0),
        Number(balanceBasedCount || 0)
      );
      
      const basePoints = lbData?.base_points ?? 0;
      const nftScore = calcNftScore(actualNftCount);
      points = basePoints + nftScore;

      // Reconciliamos sempre que detectar divergência para evitar nft_count/nft_score zerados.
      const expectedHasNft = actualNftCount > 0;
      const expectedSecondary = Math.max(actualNftCount - 1, 0);
      const profileNeedsSync =
        Number(profile?.nft_score || 0) !== nftScore ||
        Boolean(profile?.nft_count && profile.nft_count > 0) !== expectedHasNft;
      const leaderboardNeedsSync =
        Number(currentDbNftCount || 0) !== actualNftCount ||
        Number(lbData?.total_points || 0) !== points;

      if (profileNeedsSync || leaderboardNeedsSync) {
        await Promise.allSettled([
          db.from('leaderboard').upsert({
            fid,
            nft_count: actualNftCount,
            nft_score: nftScore,
            total_points: points,
            has_nft: expectedHasNft,
            updated_at: new Date().toISOString()
          }, { onConflict: 'fid' }),
          db.from('profiles').upsert({
            fid,
            genesis_nft: expectedHasNft,
            secondary_nfts: expectedSecondary,
            nft_score: nftScore,
            total_points: points,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'fid' }),
        ]);
      }
    } catch (e) {}

    if (!profile && !identity) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Prefer canonical Supabase score to reduce pressure on Neynar API calls.
    const profileScore = Number(profile?.neynar_score ?? 0);
    const identityScore = Number(identity?.score ?? 0);
    const dbLeaderboardScore = Number((await getDb().from('leaderboard').select('neynar_score').eq('fid', fid).maybeSingle()).data?.neynar_score ?? 0);
    const resolvedScore = Number.isFinite(profileScore) && profileScore > 0
      ? profileScore
      : Math.max(Number.isFinite(identityScore) ? identityScore : 0, Number.isFinite(dbLeaderboardScore) ? dbLeaderboardScore : 0);

    return NextResponse.json({
      fid: profile?.fid ?? fid,
      username: profile?.username ?? identity?.username ?? `fid_${fid}`,
      pfp: profile?.pfp_url ?? identity?.pfp ?? null,
      follower_count: profile?.follower_count ?? identity?.followerCount ?? 0,
      following_count: profile?.following_count ?? identity?.followingCount ?? 0,
      score: resolvedScore,
      points,
      primary_wallet: profile?.primary_wallet ?? identity?.verifiedWallet ?? null,
      verified_wallets: mergedWallets,
      wallets: mergedWallets,
      verifiedWallets: mergedWallets,
      verifiedWallet: profile?.primary_wallet ?? identity?.verifiedWallet ?? null,
      secondaryWallets,
      allKnownWallets: mergedWallets,
      profile: {
        fid: profile?.fid ?? fid,
        username: profile?.username ?? identity?.username ?? `fid_${fid}`,
        pfp: profile?.pfp_url ?? identity?.pfp ?? null,
        verifiedWallet: profile?.primary_wallet ?? identity?.verifiedWallet ?? null,
        dnaNFTs: nfts.map((n: { token_id: string; image_url: string | null }) => ({
          tokenId: n.token_id,
          name: `XRAY #${n.token_id}`,
          imageUrl: n.image_url,
          openseaUrl: `https://opensea.io/assets/base/0xaC5fd046C7ea0bA5C2081622EdF1B07e28040068/${n.token_id}`,
        })),
        rewardBalance: String(points),
        streak: profile?.streak ?? 0,
        bestStreak: profile?.best_streak ?? 0,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
