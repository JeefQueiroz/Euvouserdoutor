import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getDb, upsertUser, upsertLeaderboard, upsertCheckin } from '@/src/server/db';
import { syncUserToSupabase, recalculateRanks } from '@/src/server/sync';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutos (limite do Vercel Pro para edge/serverless)

function isAuthed(request: Request): boolean {
  const apiKey = process.env.NOTIFICATIONS_API_KEY?.trim();
  if (!apiKey) return false;
  return request.headers.get('x-api-key') === apiKey;
}

export async function POST(request: Request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = {
    totalUsers: 0,
    synced: 0,
    failed: 0,
    errors: [] as string[]
  };

  try {
    // 1. Obter todos os FIDs do leaderboard no KV
    const lbFidsRaw = await kv.smembers<string[]>('lb:fids');
    const lbFids = (lbFidsRaw || []).map(Number).filter(n => Number.isFinite(n) && n > 0);

    // 2. Obter FIDs de notificações
    const notifFidsRaw = await kv.smembers<string[]>('fids'); 
    const notifFids = (notifFidsRaw || []).map(Number).filter(n => Number.isFinite(n) && n > 0);

    // 3. Unificar FIDs
    const allFids = Array.from(new Set([...lbFids, ...notifFids]));
    results.totalUsers = allFids.length;

    // 4. Sincronização em lotes
    const BATCH_SIZE = 5; // Lote menor para evitar timeouts no HTTP
    for (let i = 0; i < allFids.length; i += BATCH_SIZE) {
      const batch = allFids.slice(i, i + BATCH_SIZE);
      
      await Promise.all(batch.map(async (fid) => {
        try {
          // Sincroniza o usuário (identidade, nfts, leaderboard, perfis)
          await syncUserToSupabase(fid);
          
          // Sincroniza Checkins
          const checkin = await kv.get<{ streak?: number; bestStreak?: number; lastDate?: string; history?: string[] }>(`checkin:${fid}`);
          if (checkin && checkin.lastDate) {
            await upsertCheckin({
              fid,
              streak: Number(checkin.streak || 0),
              best_streak: Number(checkin.bestStreak || 0),
              last_date: checkin.lastDate,
              history: checkin.history || []
            });
          }
          results.synced++;
        } catch (err: any) {
          results.failed++;
          results.errors.push(`FID ${fid}: ${err.message}`);
        }
      }));
    }

    // 5. Recalcular Ranks no final
    await recalculateRanks();

    return NextResponse.json({
      success: true,
      results
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      results
    }, { status: 500 });
  }
}
