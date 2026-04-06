import { NextResponse } from 'next/server';
import { Errors, createClient } from '@farcaster/quick-auth';
import { resolveIdentityByFid } from '@/src/server/farcaster';
import { countNftsForWallets } from '@/src/server/nfts';
import { canSpin, utcDateKey } from '@/src/lib/daily-limit';
import { executeSpin } from '@/src/lib/spin-engine';
import { RISK_LEVELS, type RiskLevelKey } from '@/src/lib/roulette-config';
import { getDb } from '@/src/server/db';
import {
  recordPointTransaction,
  syncLeaderboardToSupabase,
  syncProfileToSupabase,
  calcNftScore,
  getSupabaseAdmin,
} from '@/src/server/supabase';
import { getLeaderboardCacheKey } from '@/src/constants/cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const quickAuthClient = createClient();

function resolveDomain(request: Request): string {
  const envDomain = process.env.QUICK_AUTH_DOMAIN?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Cannot resolve domain for Quick Auth.');
  return host;
}

function parseRiskLevel(input: unknown): RiskLevelKey {
  if (typeof input !== 'string') return 'LOW';
  const normalized = input.toUpperCase();
  if (normalized === 'LOW' || normalized === 'MEDIUM' || normalized === 'HIGH') return normalized;
  return 'LOW';
}

function sanitizeCount(value: unknown): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : 0;
}

async function resolveUserFlags(fid: number): Promise<{ userHasNft: boolean; nftCount: number; userIsStaker: boolean }> {
  const db = getDb();
  const { kv } = await import('@vercel/kv');
  const { data: profile } = await db
    .from('profiles')
    .select('nft_count')
    .eq('fid', fid)
    .maybeSingle();
  const dbNftCount = sanitizeCount((profile as { nft_count?: number } | null)?.nft_count);

  let nftCountFromChain = 0;
  try {
    const identity = await resolveIdentityByFid(fid);
    const wallets = identity.allKnownWallets;
    nftCountFromChain = wallets.length > 0 ? await countNftsForWallets(wallets) : 0;
  } catch {
    nftCountFromChain = dbNftCount;
  }

  const userHasNft = nftCountFromChain > 0 || dbNftCount > 0;
  const nftCount = Math.max(nftCountFromChain, dbNftCount);

  const stakedAmount = sanitizeCount(await kv.get(`stake:${fid}:amount`));
  const userIsStaker = stakedAmount > 0;

  return { userHasNft, nftCount, userIsStaker };
}

async function getSpinsToday(fid: number, date: string): Promise<number> {
  const db = getDb();
  const { data } = await db
    .from('spin_logs')
    .select('spins_used')
    .eq('fid', fid)
    .eq('date', date)
    .maybeSingle();
  return sanitizeCount((data as { spins_used?: number } | null)?.spins_used);
}

async function authenticate(request: Request): Promise<number | NextResponse> {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing token.' }, { status: 401 });
  }
  const token = authorization.split(' ')[1];
  const domain = resolveDomain(request);
  try {
    const payload = await quickAuthClient.verifyJwt({ token, domain });
    const fid = Number(payload.sub);
    if (!Number.isFinite(fid) || fid <= 0) {
      return NextResponse.json({ error: 'Invalid FID in token.' }, { status: 400 });
    }
    return fid;
  } catch (error) {
    if (error instanceof Errors.InvalidTokenError) {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
    }
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const authResult = await authenticate(request);
    if (authResult instanceof NextResponse) return authResult;
    const fid = authResult;
    const today = utcDateKey();
    const { userHasNft, userIsStaker } = await resolveUserFlags(fid);
    const spinsToday = await getSpinsToday(fid, today);
    const allowance = canSpin(spinsToday, userHasNft, userIsStaker);
    return NextResponse.json({
      success: true, fid, today,
      riskLevels: Object.keys(RISK_LEVELS),
      userHasNft, userIsStaker,
      spinsUsed: spinsToday,
      ...allowance,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authResult = await authenticate(request);
    if (authResult instanceof NextResponse) return authResult;
    const fid = authResult;

    const body = await request.json().catch(() => ({}));
    const riskLevel = parseRiskLevel((body as { riskLevel?: unknown })?.riskLevel);

    const { kv } = await import('@vercel/kv');
    const today = utcDateKey();
    const lockKey = `spin:lock:${fid}`;
    const lockToken = `${fid}:${Date.now()}:${Math.random().toString(36).slice(2)}`;

    const lockAcquired = await kv.set(lockKey, lockToken, { nx: true, ex: 30 });
    if (!lockAcquired) {
      return NextResponse.json({ error: 'Spin in progress. Try again in a few seconds.' }, { status: 409 });
    }

    try {
      const { userHasNft, nftCount, userIsStaker } = await resolveUserFlags(fid);
      const spinsToday = await getSpinsToday(fid, today);
      const allowance = canSpin(spinsToday, userHasNft, userIsStaker);

      if (!allowance.allowed) {
        return NextResponse.json({
          error: 'Daily limit reached. Come back tomorrow.',
          today, userHasNft, userIsStaker, spinsUsed: spinsToday, ...allowance,
        }, { status: 429 });
      }

      const result = executeSpin(riskLevel, userHasNft);
      const reward = Number(result.reward || 0);
      const spinsUsed = spinsToday + 1;
      const nextAllowance = canSpin(spinsUsed, userHasNft, userIsStaker);

      const supabase = getSupabaseAdmin();

      // 1. Persistência ON-TIME no Supabase (Aguardada)
      // Salva spin_log
      await supabase.from('spin_logs').upsert(
        {
          fid, date: today, spins_used: spinsUsed,
          last_risk_level: riskLevel,
          last_reward: reward,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'fid,date' }
      );

      // Se houver recompensa, atualiza pontos
      if (reward > 0) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('points, username, pfp_url, nft_count, neynar_score, streak, best_streak')
          .eq('fid', fid)
          .single();

        const currentPoints = Number(profile?.points || 0);
        const newPoints = currentPoints + reward;
        const currentNftCount = Math.max(nftCount, Number(profile?.nft_count || 0));
        const nftScore = calcNftScore(currentNftCount);
        const totalPoints = newPoints + nftScore;
        const username = profile?.username || `fid_${fid}`;
        const pfpUrl = profile?.pfp_url || null;
        const neynarScore = Number(profile?.neynar_score || 0);
        const streak = Number(profile?.streak || 0);
        const bestStreak = Number(profile?.best_streak || 0);

        await Promise.all([
          recordPointTransaction(fid, 'spin', reward, { riskLevel, result, source: 'ontime-sync' }),
          syncLeaderboardToSupabase({
            fid, username, pfp_url: pfpUrl,
            base_points: newPoints, nft_count: currentNftCount,
            nft_score: nftScore, total_points: totalPoints,
            neynar_score: neynarScore, streak, best_streak: bestStreak,
          }),
          syncProfileToSupabase({
            fid, username, pfp_url: pfpUrl,
            points: newPoints, nft_score: nftScore,
            total_points: totalPoints, neynar_score: neynarScore,
            nft_count: currentNftCount, streak, best_streak: bestStreak,
          }),
        ]);

        // Background sync KV
        ;(async () => {
          try {
            const lbKey = `lb:${fid}`;
            await kv.set(lbKey, {
              fid, username, pfpUrl, points: newPoints, nftCount: currentNftCount, nftScore, totalPoints, neynarScore,
              updatedAt: new Date().toISOString(),
            });
            await kv.del(getLeaderboardCacheKey());
          } catch (e) {
            console.error('[spin] background sync error:', e);
          }
        })();
      }

      return NextResponse.json({
        success: true, fid, today, riskLevel, result,
        userHasNft, userIsStaker, spinsUsed, ...nextAllowance,
      });
    } finally {
      const currentLock = await kv.get<string>(lockKey);
      if (currentLock === lockToken) await kv.del(lockKey);
    }
  } catch (error) {
    console.error('[/api/spin] error:', error);
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
