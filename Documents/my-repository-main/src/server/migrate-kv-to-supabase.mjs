import { kv } from '@vercel/kv';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL || 
                   process.env.NEXT_PUBLIC_SUPABASE_URL || 
                   process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL || 
                   process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                   process.env.SUPABASE_SERVICE_KEY || 
                   process.env.SUPABASE_SECRET || 
                   process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SERVICE_ROLE_KEY || 
                   process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_SECRET_KEY || 
                   process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(SUPABASE_URL.trim(), SUPABASE_KEY.trim(), { auth: { persistSession: false } });

async function migrate() {
  console.log('Iniciando migração completa KV → Supabase (Profiles + Notificações)...');
  
  const lbFids = await kv.smembers('lb:fids') || [];
  const notifFids = await kv.smembers('fids') || [];
  
  // Une todos os FIDs únicos que interagiram com o app
  const allFids = Array.from(new Set([...lbFids, ...notifFids]))
    .map(Number)
    .filter(Number.isFinite);
  
  console.log(`${allFids.length} usuários únicos encontrados no KV.`);
  
  let migrated = 0;
  let failed = 0;
  
  for (const fid of allFids) {
    try {
      const lbEntry = await kv.get(`lb:${fid}`);
      const notifEntry = await kv.get(`notifications:${fid}`);
      
      const username = lbEntry?.username || notifEntry?.username || `fid_${fid}`;
      
      // 1. Salva na nova tabela de perfis (profiles)
      const { error: profileError } = await supabase.from('profiles').upsert({
        fid,
        username,
        points: lbEntry?.points || 0,
        notification_token: notifEntry?.token || null,
        notification_url: notifEntry?.url || null,
      }, { onConflict: 'fid' });
      
      // 2. Mantém a tabela de admin de notificações alimentada
      if (notifEntry?.token && notifEntry?.url) {
        await supabase.from('notification_subscribers').upsert({
          fid, token: notifEntry.token, url: notifEntry.url, username, updated_at: new Date().toISOString(),
        }, { onConflict: 'fid' });
      }
      
      if (profileError) { console.error(`Erro no FID ${fid}:`, profileError.message); failed++; }
      else { migrated++; }
    } catch (e) {
      console.error(`Erro fatal no FID ${fid}:`, e);
      failed++;
    }
  }
  
  console.log(`\n✅ Migrados com sucesso: ${migrated}`);
  if (failed > 0) console.log(`❌ Falhas: ${failed}`);
}

migrate().catch(console.error);