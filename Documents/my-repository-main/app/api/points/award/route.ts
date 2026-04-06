// app/api/points/award/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Errors, createClient as createQuickAuthClient } from '@farcaster/quick-auth';
import { 
  getSupabaseAdmin, 
  recordPointTransaction, 
  syncLeaderboardToSupabase, 
  syncProfileToSupabase, 
  calcNftScore 
} from '@/src/server/supabase';
import { getLeaderboardCacheKey } from '@/src/constants/cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const quickAuthClient = createQuickAuthClient();

const POINTS_MAP: Record<string, number> = {
  follow_fc:  50,
  follow_x:   30,
  mint_nft:  100,
  share_xray: 20,
  notif:      10,
};

const ONE_TIME_TASKS = new Set(['follow_fc', 'follow_x', 'mint_nft', 'notif']);

const TASK_COLUMN: Record<string, string> = {
  follow_fc:  'task_follow_fc',
  follow_x:   'task_follow_x',
  mint_nft:   'task_mint_nft',
  share_xray: 'task_share_xray',
  notif:      'task_notif',
};

function resolveDomain(request: Request): string {
  const envDomain = process.env.QUICK_AUTH_DOMAIN?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Cannot resolve domain.');
  return host;
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 });

    const domain = resolveDomain(req);
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

    const body = await req.json();
    const { eventType } = body as { eventType?: string };
    if (!eventType || !POINTS_MAP[eventType]) {
      return NextResponse.json({ error: 'Invalid eventType' }, { status: 400 });
    }
    const pointsToAdd = POINTS_MAP[eventType];
    const taskCol = TASK_COLUMN[eventType];

    const supabase = getSupabaseAdmin();

    // 1. Verificar se a tarefa já foi concluída no Supabase
    if (ONE_TIME_TASKS.has(eventType)) {
      const { data: profile } = await supabase
        .from('profiles')
        .select(taskCol)
        .eq('fid', fid)
        .single();

      if (profile && (profile as any)[taskCol] === true) {
        return NextResponse.json({ error: 'Task already completed', alreadyDone: true }, { status: 409 });
      }
    }

    // 2. Persistência ON-TIME no Supabase (Aguardada)
    // Somar pontos via RPC
    await supabase.rpc('increment_points', { p_fid: fid, p_points: pointsToAdd });

    // Marcar flag da task no profile
    if (taskCol) {
      await supabase
        .from('profiles')
        .update({ [taskCol]: true, updated_at: new Date().toISOString() })
        .eq('fid', fid);
    }

    // Buscar perfil atualizado para sincronização de leaderboard
    const { data: profile } = await supabase
      .from('profiles')
      .select('points, username, pfp_url, nft_count, neynar_score, streak, best_streak')
      .eq('fid', fid)
      .single();

    const currentPoints = Number(profile?.points || 0);
    const nftCount = Number(profile?.nft_count || 0);
    const nftScore = calcNftScore(nftCount);
    const totalPoints = currentPoints + nftScore;
    const username = profile?.username || `fid_${fid}`;
    const pfpUrl = profile?.pfp_url || null;
    const neynarScore = Number(profile?.neynar_score || 0);
    const streak = Number(profile?.streak || 0);
    const bestStreak = Number(profile?.best_streak || 0);

    await Promise.all([
      recordPointTransaction(fid, eventType as any, pointsToAdd, { source: 'ontime-sync' }),
      syncLeaderboardToSupabase({
        fid, username, pfp_url: pfpUrl,
        base_points: currentPoints, nft_count: nftCount,
        nft_score: nftScore, total_points: totalPoints,
        neynar_score: neynarScore, streak, best_streak: bestStreak,
      }),
      syncProfileToSupabase({
        fid, username, pfp_url: pfpUrl,
        points: currentPoints, nft_score: nftScore,
        total_points: totalPoints, neynar_score: neynarScore,
        nft_count: nftCount, streak, best_streak: bestStreak,
      }),
    ]);

    // 3. Background sync KV (Cache)
    ;(async () => {
      try {
        const { kv } = await import('@vercel/kv');
        const lbKey = `lb:${fid}`;
        await kv.set(lbKey, {
          fid, username, pfpUrl, points: currentPoints, nftCount, nftScore, totalPoints, neynarScore,
          updatedAt: new Date().toISOString(),
        });
        await kv.del(getLeaderboardCacheKey());
      } catch (e) {
        console.error('[award] background sync error:', e);
      }
    })();

    return NextResponse.json({
      success: true,
      points: currentPoints,
      total_points: totalPoints,
      tasks: {
        follow_fc:  (profile as any)?.task_follow_fc  ?? false,
        follow_x:   (profile as any)?.task_follow_x   ?? false,
        mint_nft:   (profile as any)?.task_mint_nft   ?? false,
        share_xray: (profile as any)?.task_share_xray ?? false,
        notif:      (profile as any)?.task_notif      ?? false,
      },
    });

  } catch (err) {
    console.error('[/api/points/award]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
