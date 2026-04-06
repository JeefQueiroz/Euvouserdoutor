import { NextResponse } from 'next/server';
import { Errors, createClient } from '@farcaster/quick-auth';
import { resolveIdentityByFid } from '@/src/server/farcaster';
import { countNftsForWallets, fetchNftOwnershipForWallets } from '@/src/server/nfts';
import {
  calcNftScore,
  syncLeaderboardToSupabase,
  syncProfileToSupabase,
  syncUserIdentityToSupabase,
} from '@/src/server/supabase';
import { getDb, upsertNftOwnership } from '@/src/server/db';
import { getLeaderboardCacheKey } from '@/src/constants/cache';

export const dynamic = 'force-dynamic';

const quickAuthClient = createClient();

// Cache key do leaderboard top (importado de constante centralizada)
const LB_TOP_CACHE_KEY = getLeaderboardCacheKey();

function resolveDomain(request: Request): string {
  const envDomain = process.env.QUICK_AUTH_DOMAIN?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Cannot resolve domain for Quick Auth.');
  return host;
}

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];
    const domain = resolveDomain(request);
    let authenticatedFid: number;

    try {
      const payload = await quickAuthClient.verifyJwt({ token, domain });
      authenticatedFid = Number(payload.sub);
      if (!Number.isFinite(authenticatedFid) || authenticatedFid <= 0) {
        return NextResponse.json({ error: 'Invalid FID in token.' }, { status: 400 });
      }
    } catch (error) {
      if (error instanceof Errors.InvalidTokenError) {
        return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
      }
      throw error;
    }

    const body = await request.json().catch(() => ({}));
    const bodyUsername = typeof body.username === 'string' ? body.username.trim().slice(0, 64) : '';
    const bodyPfpUrl = typeof body.pfpUrl === 'string' ? body.pfpUrl.trim() : '';
    const bodyPoints = Number(body.points);
    const bodyWalletAddress = typeof body.walletAddress === 'string' ? body.walletAddress.trim().toLowerCase() : '';
    const bodyWallets = Array.isArray(body.wallets)
      ? body.wallets
          .filter((w: unknown): w is string => typeof w === 'string')
          .map((w: string) => w.trim().toLowerCase())
      : [];

    const isEth = (v: string) => /^0x[a-fA-F0-9]{40}$/.test(v);
    const knownWalletsFromBody = Array.from(
      new Set([bodyWalletAddress, ...bodyWallets].filter((w) => !!w && isEth(w)))
    );

    const { kv } = await import('@vercel/kv');

    // Salva historico de wallets para FID antes de resolver identidade (merge Farcaster + Base runtime)
    if (knownWalletsFromBody.length > 0) {
      await Promise.all(knownWalletsFromBody.map((wallet) => kv.sadd(`fid:wallets:${authenticatedFid}`, wallet)));
    }

    const identity = await resolveIdentityByFid(authenticatedFid);
    let linkedWallets: string[] = [];
    try {
      const db = getDb();
      const { data } = await db.from('fid_wallets').select('wallet_address').eq('fid', authenticatedFid).limit(200);
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
    const username = bodyUsername && !bodyUsername.startsWith('fid_')
      ? bodyUsername
      : (identity.username || `fid_${authenticatedFid}`);
    const pfpUrl = bodyPfpUrl || identity.pfp || null;
    const wallets = Array.from(new Set([...identity.allKnownWallets, ...knownWalletsFromBody, ...linkedWallets]));
    const nftCount = wallets.length > 0 ? await countNftsForWallets(wallets) : 0;
    const hasNft = nftCount > 0;

    // ── BUG FIX: scoring consistente — genesis=50, adicional=100 ───────────
    const nftScore = calcNftScore(nftCount);
    const existing = await kv.get<{ points?: number; nftScore?: number; neynarScore?: number; checkin?: unknown }>(`lb:${authenticatedFid}`);
    const neynarScore = Math.max(
      Number(existing?.neynarScore ?? 0),
      Number(identity.score ?? 0),
    );

    const existingPoints = Number(existing?.points || 0);
    const genesisFloor = hasNft ? 50 : 0;
    // Mantem monotonicidade e aceita pontos vindos do app (evita leaderboard zerado)
    const basePoints = Number.isFinite(bodyPoints)
      ? Math.max(genesisFloor, existingPoints, Math.max(0, Math.floor(bodyPoints)))
      : Math.max(genesisFloor, existingPoints);
    const totalPoints = basePoints + nftScore;
    const resolvedPrimaryWallet = bodyWalletAddress || identity.verifiedWallet || wallets[0] || null;

    await kv.set(`lb:${authenticatedFid}`, {
      fid: authenticatedFid,
      username,
      pfpUrl,
      points: basePoints,
      hasNft,
      nftCount,
      nftScore,
      totalPoints,
      neynarScore,
      updatedAt: new Date().toISOString(),
    });

    await kv.sadd('lb:fids', String(authenticatedFid));

    // ── BUG FIX: era 'lb:top:cache:v1', o route /top usa 'v2' ────────────
    await kv.del(LB_TOP_CACHE_KEY);

    // ── Supabase sync (fire-and-forget) ──────────────────────────────────
    const checkinData = await kv.get<{ streak?: number; bestStreak?: number }>(`checkin:${authenticatedFid}`);
    Promise.allSettled([
      syncLeaderboardToSupabase({
        fid: authenticatedFid,
        username,
        pfp_url: pfpUrl,
        base_points: basePoints,
        nft_count: nftCount,
        nft_score: nftScore,
        total_points: totalPoints,
        neynar_score: neynarScore,
        streak: checkinData?.streak ?? 0,
        best_streak: checkinData?.bestStreak ?? 0,
      }),
      syncProfileToSupabase({
        fid: authenticatedFid,
        username,
        pfp_url: pfpUrl,
        points: basePoints,
        nft_score: nftScore,
        total_points: totalPoints,
        neynar_score: neynarScore,
        nft_count: nftCount,
        streak: checkinData?.streak ?? 0,
        best_streak: checkinData?.bestStreak ?? 0,
        wallet_address: resolvedPrimaryWallet,
      }),
      syncUserIdentityToSupabase({
        fid: authenticatedFid,
        username,
        pfp_url: pfpUrl,
        neynar_score: neynarScore,
        follower_count: identity.followerCount ?? 0,
        following_count: identity.followingCount ?? 0,
        verified_wallets: wallets,
        primary_wallet: resolvedPrimaryWallet,
      }),
    ]).catch(() => {});

    if (wallets.length > 0 && nftCount > 0) {
      try {
        const ownership = await fetchNftOwnershipForWallets(wallets);
        if (ownership.length > 0) {
          await upsertNftOwnership(authenticatedFid, ownership);
        }
      } catch {
        // best effort ownership sync
      }
    }

    return NextResponse.json({
      success: true,
      fid: authenticatedFid,
      points: basePoints,
      nftCount,
      nftScore,
      totalPoints,
      hasNft,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
