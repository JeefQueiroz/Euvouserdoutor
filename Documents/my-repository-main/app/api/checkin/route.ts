import { NextResponse } from 'next/server';
import { Errors, createClient } from '@farcaster/quick-auth';
import {
  syncLeaderboardToSupabase,
  syncProfileToSupabase,
  recordPointTransaction,
  calcNftScore,
  getSupabaseAdmin,
} from '@/src/server/supabase';
import { syncUserToSupabase } from '@/src/server/sync';
import { getLeaderboardCacheKey } from '@/src/constants/cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const quickAuthClient = createClient();

// Cache key do leaderboard top (importado de constante centralizada)
const LB_TOP_CACHE_KEY = getLeaderboardCacheKey();

function resolveDomain(request: Request): string {
  const envDomain = process.env.QUICK_AUTH_DOMAIN?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Cannot resolve domain.');
  return host;
}

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayUTC(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 401 });
    }

    const token  = authorization.split(' ')[1];
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

    const { kv } = await import('@vercel/kv');
    const today     = todayUTC();
    const yesterday = yesterdayUTC();
    
    // Lock distribuído para evitar double check-in
    const lockKey = `checkin:lock:${fid}:${today}`;
    const lockAcquired = await kv.set(lockKey, 1, { nx: true, ex: 20 });
    if (!lockAcquired) {
      return NextResponse.json({
        success: false,
        retry: true,
        message: 'Check-in in progress. Try again in a few seconds.',
      }, { status: 409 });
    }

    try {
      const supabase = getSupabaseAdmin();
      
      // 1. Obter dados atuais do Supabase (Fonte de Verdade Primária)
      const { data: profile } = await supabase
        .from('profiles')
        .select('points, streak, best_streak, last_checkin, username, pfp_url, nft_count, neynar_score')
        .eq('fid', fid)
        .single();

      const lastCheckinDate = profile?.last_checkin ? profile.last_checkin.slice(0, 10) : '';

      if (lastCheckinDate === today) {
        return NextResponse.json({
          success: false, alreadyDone: true,
          streak: profile?.streak || 0,
          bestStreak: profile?.best_streak || 0,
          lastDate: lastCheckinDate,
          pointsEarned: 0,
          points: profile?.points || 0,
          message: 'Already checked in today.',
        });
      }

      // 2. Calcular novo estado
      const currentStreak = profile?.streak || 0;
      const newStreak = lastCheckinDate === yesterday ? currentStreak + 1 : 1;
      const newBest = Math.max(newStreak, profile?.best_streak || 0);
      const weeklyBonus = newStreak > 0 && newStreak % 7 === 0;
      const pointsEarned = weeklyBonus ? 30 : 10;
      
      const currentPoints = Number(profile?.points || 0);
      const nftCount = Number(profile?.nft_count || 0);
      const pointsWithGenesisFloor = Math.max(currentPoints, nftCount > 0 ? 50 : 0);
      const nextPoints = pointsWithGenesisFloor + pointsEarned;
      const nftScore = calcNftScore(nftCount);
      const totalPoints = nextPoints + nftScore;
      
      const username = profile?.username || `fid_${fid}`;
      const pfpUrl = profile?.pfp_url || null;
      const neynarScore = Number(profile?.neynar_score || 0);

      // 3. Persistência ON-TIME no Supabase (Aguardada)
      await Promise.all([
        // Atualiza perfil
        syncProfileToSupabase({
          fid, username, pfp_url: pfpUrl,
          points: nextPoints, nft_score: nftScore,
          total_points: totalPoints, neynar_score: neynarScore,
          nft_count: nftCount, streak: newStreak, best_streak: newBest,
        }),
        // Atualiza leaderboard
        syncLeaderboardToSupabase({
          fid, username, pfp_url: pfpUrl,
          base_points: nextPoints, nft_count: nftCount,
          nft_score: nftScore, total_points: totalPoints,
          neynar_score: neynarScore, streak: newStreak, best_streak: newBest,
        }),
        // Registra transação
        recordPointTransaction(fid, 'checkin', pointsEarned, {
          streak: newStreak, weeklyBonus, source: 'ontime-sync'
        })
      ]);

      // 4. Atualização em Background (KV para compatibilidade e Cache)
      ;(async () => {
        try {
          // Atualiza cache de checkin
          await kv.set(`checkin:${fid}`, {
            fid, streak: newStreak, bestStreak: newBest, lastDate: today, history: [today]
          });
          // Atualiza cache de leaderboard
          await kv.set(`lb:${fid}`, {
            fid, username, pfpUrl, points: nextPoints, nftCount, nftScore, totalPoints, neynarScore,
            updatedAt: new Date().toISOString(),
          });
          await kv.sadd('lb:fids', String(fid));
          await kv.del(LB_TOP_CACHE_KEY);
          
          // Reconciliação profunda opcional
          await syncUserToSupabase(fid);
        } catch (e) {
          console.error('[checkin] background sync error:', e);
        }
      })();

      return NextResponse.json({
        success: true, alreadyDone: false,
        streak: newStreak, bestStreak: newBest,
        lastDate: today,
        pointsEarned, weeklyBonus,
        points: nextPoints,
        message: weeklyBonus
          ? `🎉 Weekly bonus! +${pointsEarned} pts (${newStreak}-day streak)`
          : `✅ Check-in done! +${pointsEarned} pts`,
      });
    } finally {
      await kv.del(lockKey);
    }

  } catch (error) {
    console.error('[/api/checkin] error:', error);
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 401 });
    }

    const token  = authorization.split(' ')[1];
    const domain = resolveDomain(request);
    let fid: number;

    try {
      const payload = await quickAuthClient.verifyJwt({ token, domain });
      fid = Number(payload.sub);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const { data: profile } = await supabase
      .from('profiles')
      .select('points, streak, best_streak, last_checkin')
      .eq('fid', fid)
      .single();

    const today = todayUTC();
    const lastCheckinDate = profile?.last_checkin ? profile.last_checkin.slice(0, 10) : '';

    return NextResponse.json({
      fid,
      streak:       profile?.streak      || 0,
      bestStreak:   profile?.best_streak || 0,
      lastDate:     lastCheckinDate,
      points:       Number(profile?.points || 0),
      checkedToday: lastCheckinDate === today,
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
