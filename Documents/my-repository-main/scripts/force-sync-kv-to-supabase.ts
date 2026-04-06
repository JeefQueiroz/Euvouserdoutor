import { kv } from '@vercel/kv';
import { getDb, upsertUser, upsertLeaderboard, upsertCheckin } from '../src/server/db';
import { syncUserToSupabase, recalculateRanks } from '../src/server/sync';

async function forceSync() {
  console.log('🚀 Iniciando Sincronização Forçada (Padrão Atualizado): KV -> Supabase');
  
  try {
    const db = getDb();
    
    // 1. Coletar todos os FIDs do KV
    const lbFidsRaw = await kv.smembers<string[]>('lb:fids');
    const lbFids = (lbFidsRaw || []).map(Number).filter(n => Number.isFinite(n) && n > 0);

    const notifFidsRaw = await kv.smembers<string[]>('fids'); 
    const notifFids = (notifFidsRaw || []).map(Number).filter(n => Number.isFinite(n) && n > 0);

    const allFids = Array.from(new Set([...lbFids, ...notifFids]));
    console.log(`\n📊 Total de usuários únicos no KV: ${allFids.length}`);

    let synced = 0;
    let failed = 0;

    // 2. Processar em lotes
    const BATCH_SIZE = 10;
    for (let i = 0; i < allFids.length; i += BATCH_SIZE) {
      const batch = allFids.slice(i, i + BATCH_SIZE);
      console.log(`\n🔄 Processando lote ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} usuários)...`);
      
      await Promise.all(batch.map(async (fid) => {
        try {
          // A) Sincronização principal (Identidade, NFTs, Leaderboard)
          // Esta função já cuida das tabelas 'users', 'leaderboard' e 'profiles'
          await syncUserToSupabase(fid);
          
          // B) Sincronização de Checkins (Tabela: checkins)
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
          
          // C) Sincronização de Notificações (Tabela: notification_subscribers)
          const notif = await kv.get<{ token?: string; url?: string; username?: string; pfpUrl?: string }>(`notifications:${fid}`);
          if (notif?.token && notif?.url) {
             await db.from('notification_subscribers').upsert({
               fid,
               token: notif.token,
               url: notif.url,
               username: notif.username || null,
               pfp_url: notif.pfpUrl || null,
               updated_at: new Date().toISOString()
             }, { onConflict: 'fid' });
          }

          // D) Sincronização de Estado/Cache (Tabela: profiles - colunas JSONB)
          // O mini app salva o estado bruto em user:state:{fid}
          const rawState = await kv.hgetall<Record<string, string>>(`user:state:${fid}`);
          if (rawState && Object.keys(rawState).length > 0) {
            await db.from('profiles').update({
              state_blob: rawState,
              cache_updated_at: new Date().toISOString()
            }).eq('fid', fid);
          }

          synced++;
          process.stdout.write('.');
        } catch (err: any) {
          failed++;
          console.error(`\n❌ Erro no FID ${fid}: ${err.message}`);
        }
      }));
    }

    // 3. Recalcular Ranks e Reconciliar NFTs via RPC (Padrão do Schema)
    console.log('\n\n🏆 Finalizando: Recalculando ranks e reconciliando NFTs...');
    await db.rpc('reconcile_nft_points');
    await recalculateRanks();

    console.log('\n✅ Sincronização concluída com sucesso!');
    console.log(`📈 Sucesso: ${synced}`);
    console.log(`📉 Falhas: ${failed}`);

  } catch (error: any) {
    console.error('\n💥 Erro fatal na migração:', error.message);
  }
}

forceSync().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
