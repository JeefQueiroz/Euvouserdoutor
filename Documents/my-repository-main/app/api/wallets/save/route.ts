import { NextResponse } from 'next/server';
import { Errors, createClient } from '@farcaster/quick-auth';
import { resolveIdentityByFid } from '@/src/server/farcaster';
import { syncUserIdentityToSupabase, getSupabaseAdmin } from '@/src/server/supabase';
import { syncUserToSupabase } from '@/src/server/sync';

export const dynamic = 'force-dynamic';

const quickAuthClient = createClient();
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

function resolveDomain(request: Request): string {
  const envDomain = process.env.QUICK_AUTH_DOMAIN?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Cannot resolve domain.');
  return host;
}

function normalizeAddress(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!ETH_ADDRESS_REGEX.test(trimmed)) return null;
  return trimmed.toLowerCase();
}

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];
    const domain = resolveDomain(request);
    let fid: number;

    try {
      const payload = await quickAuthClient.verifyJwt({ token, domain });
      fid = Number(payload.sub);
      if (!Number.isFinite(fid) || fid <= 0) {
        return NextResponse.json({ error: 'Invalid FID.' }, { status: 400 });
      }
    } catch (error) {
      if (error instanceof Errors.InvalidTokenError) {
        return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
      }
      throw error;
    }

    const body: any = await request.json().catch(() => ({}));
    const walletsInput: unknown[] = Array.isArray(body?.wallets) ? body.wallets : [body?.walletAddress];
    const wallets: string[] = Array.from(
      new Set(walletsInput.map((w) => normalizeAddress(w)).filter((w): w is string => !!w))
    );

    if (wallets.length === 0) {
      return NextResponse.json({ error: 'No valid wallet addresses provided.' }, { status: 400 });
    }

    // 1. Obter identidade e mesclar carteiras
    const identity = await resolveIdentityByFid(fid);
    const mergedWallets: string[] = Array.from(
      new Set(
        [...(Array.isArray(identity.allKnownWallets) ? identity.allKnownWallets : []), ...wallets]
          .map((w) => normalizeAddress(w))
          .filter((w): w is string => !!w)
      )
    );

    // 2. Persistência ON-TIME no Supabase (Aguardada)
    // Sincroniza identidade básica
    await syncUserIdentityToSupabase({
      fid,
      username: identity.username || `fid_${fid}`,
      pfp_url: identity.pfp ?? null,
      neynar_score: identity.score ?? 0,
      follower_count: identity.followerCount ?? 0,
      following_count: identity.followingCount ?? 0,
      verified_wallets: mergedWallets,
      primary_wallet: identity.verifiedWallet ?? mergedWallets[0] ?? null,
    });

    // Sincroniza NFTs e pontos (Aguardado agora para ser on-time)
    await syncUserToSupabase(fid);

    // 3. Background sync KV (Cache)
    ;(async () => {
      try {
        const { kv } = await import('@vercel/kv');
        await Promise.all(mergedWallets.map((wallet) => kv.sadd(`fid:wallets:${fid}`, wallet)));
      } catch (e) {
        console.error('[wallets/save] background sync error:', e);
      }
    })();

    return NextResponse.json({
      success: true,
      fid,
      savedWallets: wallets,
      allKnownWallets: mergedWallets,
    });
  } catch (error) {
    console.error('[/api/wallets/save] error:', error);
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
