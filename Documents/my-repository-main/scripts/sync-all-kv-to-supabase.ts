import { kv } from '@vercel/kv';
import { getDb, upsertUser, upsertLeaderboard, upsertCheckin } from '../src/server/db';
import { syncUserToSupabase, recalculateRanks } from '../src/server/sync';

async function syncAll() {
  console.log('🚀 Iniciando sincronização total: KV -> Supabase');
  
  try {
    // 1. Obter todos os FIDs do leaderboard no KV
    console.log('--- Passo 1: Lendo FIDs do Leaderboard ---');
    const lbFidsRaw = await kv.smembers<string[]>('lb:fids');
    const lbFids = (lbFidsRaw || []).map(Number).filter(n => Number.isFinite(n) && n > 0);
    console.log(`Encontrados ${lbFids.length} FIDs no leaderboard do KV.`);

    // 2. Obter FIDs de notificações (pode haver usuários que não estão no leaderboard ainda)
    console.log('--- Passo 2: Lendo FIDs de Notificações ---');
    const notifFidsRaw = await kv.smembers<string[]>('fids'); // Chave legada ou comum para fids de notificação
    const notifFids = (notifFidsRaw || []).map(Number).filter(n => Number.isFinite(n) && n > 0);
    console.log(`Encontrados ${notifFids.length} FIDs nas notificações do KV.`);

    // 3. Unificar FIDs
    const allFids = Array.from(new Set([...lbFids, ...notifFids]));
    console.log(`Total de ${allFids.length} usuários únicos para sincronizar.`);

    // 4. Sincronização em lotes para evitar rate limit e timeout
    const BATCH_SIZE = 10;
    for (let i = 0; i < allFids.length; i += BATCH_SIZE) {
      const batch = allFids.slice(i, i + BATCH_SIZE);
      console.log(`Processando lote ${Math.floor(i / BATCH_SIZE) + 1} de ${Math.ceil(allFids.length / BATCH_SIZE)} (FIDs: ${batch.join(', ')})`);
      
      await Promise.all(batch.map(async (fid) => {
        try {
          // Sincroniza o usuário (isso já faz o fetch da identidade, nfts, leaderboard e perfis)
          await syncUserToSupabase(fid);
          
          // Sincroniza Checkins (que não estão no syncUserToSupabase padrão)
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
          
          console.log(`✅ FID ${fid} sincronizado.`);
        } catch (err: any) {
          console.error(`❌ Erro ao sincronizar FID ${fid}:`, err.message);
        }
      }));

      // Pequeno delay entre lotes
      if (i + BATCH_SIZE < allFids.length) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // 5. Recalcular Ranks no final
    console.log('--- Passo 3: Recalculando Ranks no Supabase ---');
    await recalculateRanks();
    console.log('🚀 Sincronização total concluída com sucesso!');

  } catch (error: any) {
    console.error('💥 Erro fatal durante a sincronização:', error.message);
    process.exit(1);
  }
}

syncAll();
