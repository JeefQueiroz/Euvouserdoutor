'use client';

import { sdk } from '@farcaster/miniapp-sdk';
import { XRAY_STORAGE_PREFIX } from '@/src/constants/storage';

const memStore: Record<string, string> = {};
let _lsAvailable: boolean | null = null;

// Debounce para evitar múltiplas chamadas HTTP ao sincronizar estado
let syncTimeout: NodeJS.Timeout | null = null;
const pendingUpdates: Record<string, string> = {};

function flushSync(): void {
  if (Object.keys(pendingUpdates).length === 0) return;
  
  const updates = { ...pendingUpdates };
  Object.keys(pendingUpdates).forEach(key => delete pendingUpdates[key]);
  
  sdk.quickAuth.fetch('/api/supabase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'user_state', updates }),
  }).catch(() => { /* silent fallback */ });
}

function scheduleSyncWithDebounce(): void {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    flushSync();
    syncTimeout = null;
  }, 1000); // Debounce de 1 segundo
}

function isLocalStorageAvailable(): boolean {
  if (_lsAvailable !== null) return _lsAvailable;
  try {
    const probe = '__xray_ls_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    _lsAvailable = true;
  } catch {
    _lsAvailable = false;
  }
  return _lsAvailable;
}

// Limpar pendências ao descarregar a página
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (syncTimeout) {
      clearTimeout(syncTimeout);
      syncTimeout = null;
    }
    flushSync();
  });
}

export const safeStorage = {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      if (isLocalStorageAvailable()) return localStorage.getItem(key);
    } catch { /* fallthrough */ }
    return key in memStore ? memStore[key] : null;
  },
  setItem(key: string, value: string, skipSync = false): void {
    if (typeof window === 'undefined') return;
    const shouldSync = !skipSync && key.startsWith(XRAY_STORAGE_PREFIX);
    try {
      if (isLocalStorageAvailable()) {
        localStorage.setItem(key, value);
        if (shouldSync) {
          pendingUpdates[key] = value;
          scheduleSyncWithDebounce();
        }
        return;
      }
    } catch { /* fallthrough */ }
    memStore[key] = value;

    if (shouldSync) {
      pendingUpdates[key] = value;
      scheduleSyncWithDebounce();
    }
  },
  removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      if (isLocalStorageAvailable()) { 
        localStorage.removeItem(key);
        // Remover do buffer de sync pendente também
        delete pendingUpdates[key];
        return;
      }
    } catch { /* fallthrough */ }
    delete memStore[key];
    delete pendingUpdates[key];
  },
  // Método para forçar sincronização imediata (para casos críticos)
  flush(): void {
    if (syncTimeout) {
      clearTimeout(syncTimeout);
      syncTimeout = null;
    }
    flushSync(); // Chamar a função flushSync local
  },
};
