'use client';

import { useState, useEffect } from 'react';

const BRAND_GREEN = '#6AC46E';
const SESSION_KEY = 'xray-admin-session-v2';

type AdminStats = {
  total: number;
  valid: number;
  sent: number;
  skipped: number;
  nonReceived: number;
  disabledSubscribers: number;
  newSubscribers: number;
  removedInvalidSubscribers: number;
};
type AdminUser = {
  fid: number;
  username: string;
  points: number;
  streak: number;
  bestStreak: number;
  lastCheckin: string | null;
  notificationEnabled: boolean;
  neynarScore: number;
  followerCount: number;
  notificationToken: string | null;
  notificationUrl: string | null;
};

type RemovedUser = {
  fid: number;
  event?: string;
  removedAt?: string;
};

type ApiResponse = {
  success: boolean;
  day: string;
  period: string;
  stats: AdminStats;
  activeSubscribers: number;
  usersTotal: number;
  users: AdminUser[];
  removedCount: number;
  removed: RemovedUser[];
};

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState<'7' | '15' | '30' | 'total'>('7');
  const [title, setTitle] = useState('☠️ X-RAY Protocol Atualizado');
  const [body, setBody] = useState('');
  const [targetUrl, setTargetUrl] = useState('https://x-rayv2.vercel.app');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<any>(null);

  const storedSession = typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_KEY) : null;
  useEffect(() => {
    if (storedSession) {
      setApiKey(storedSession);
      setAuthed(true);
    }
  }, [storedSession]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim().length > 10) {
      setAuthed(true);
      setError('');
      sessionStorage.setItem(SESSION_KEY, apiKey.trim());
      loadData();
    } else {
      setError('A senha precisa ter pelo menos 10 caracteres.');
    }
  };

  const loadData = async (currentPeriod = period) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/notifications?period=${currentPeriod}`, {
        headers: { 'x-api-key': apiKey },
      });
      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        setError(result.error || 'Erro ao carregar dados.');
      }
    } catch (err) {
      setError('Falha na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) {
      loadData();
    }
  }, [authed, period]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return setError('Título e mensagem são obrigatórios.');
    setSending(true);
    setError('');
    setSendResult(null);
    try {
      const res = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ title, body, targetUrl }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Falha ao enviar.');
      setSendResult(result);
      setBody('');
      loadData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: 'radial-gradient(ellipse at top, rgba(10,25,43,0.9) 0%, #000 60%)' }}>
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <p className="text-5xl mb-4">☠️</p>
            <h1 className="text-3xl font-black italic uppercase tracking-[0.25em] text-white">Painel ADM X-RAY</h1>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mt-2">Acesso restrito do protocolo</p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="p-8 rounded-[2.5rem] border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.4em] mb-3 block">Senha secreta</label>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-sm outline-none focus:border-green-500/70 transition"
              />
              {error && <p className="text-red-400 text-[10px] font-mono uppercase italic mt-4 text-center">{error}</p>}
              <button
                type="submit"
                className="w-full mt-6 py-4 rounded-2xl font-black uppercase text-sm italic text-black transition active:scale-95"
                style={{ backgroundColor: BRAND_GREEN }}
              >
                Entrar no painel
              </button>
              <p className="text-[10px] text-zinc-400 uppercase italic mt-3 text-center">
                Use a mesma senha secreta do mini app para manter o controle sincronizado.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03050A] text-zinc-200 font-sans selection:bg-green-500/30">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-white/5 bg-black/60 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto flex h-24 items-center justify-between px-6">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-zinc-500">Monitor de identidade</div>
              <h1 className="text-2xl font-black uppercase tracking-tight">
                X-RAY <span className="text-green-400">Admin</span>
              </h1>
              <p className="text-[10px] text-zinc-400 uppercase">
                {loading ? 'Atualizando dados…' : 'Dados sincronizados'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex rounded-full border border-white/10 bg-white/5 p-1 text-[10px] uppercase tracking-[0.3em]">
                {(['7', '15', '30', 'total'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-full transition ${period === p ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {p === 'total' ? 'Tudo' : `${p}D`}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setAuthed(false);
                  setApiKey('');
                  sessionStorage.removeItem(SESSION_KEY);
                }}
                className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 transition hover:text-red-400"
              >
                Encerrar sessão
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            <section className="grid gap-4 lg:grid-cols-4">
              {['Ativos', 'Válidos', 'Enviados', 'Pulados'].map((label, index) => {
                const stat = data?.stats;
                const values = [data?.activeSubscribers, stat?.valid, stat?.sent, stat?.skipped];
                return (
                  <div key={label} className="rounded-3xl border border-white/5 bg-white/5 p-5 text-sm uppercase tracking-[0.3em]">
                    <div className="text-xs text-zinc-400">{label}</div>
                    <div className="mt-4 text-2xl font-black text-white">
                      {formatNumber(values[index] ?? 0)}
                    </div>
                  </div>
                );
              })}
            </section>

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <section className="space-y-4 rounded-[2rem] border border-white/10 bg-black/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.5em] text-zinc-500">Envio de mensagens</p>
                    <h2 className="text-xl font-black text-white">Sinal de comportamento</h2>
                  </div>
                  {data && <span className="text-[10px] uppercase text-zinc-400">{data.day}</span>}
                </div>
                <form onSubmit={handleSend} className="space-y-3">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título da notificação"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-green-400"
                  />
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    placeholder="Mensagem que aparecerá no mini app (aratando o que está acontecendo)."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-green-400"
                  />
                  <input
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="URL alvo (opcional)"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-green-400"
                  />
                  {error && <p className="text-xs uppercase text-red-400">{error}</p>}
                  {sendResult && (
                    <p className="text-xs uppercase text-green-400">
                      Enviado com sucesso ({sendResult.sent} mensagens).
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-2xl bg-green-400 px-5 py-3 text-xs font-black uppercase tracking-[0.4em] text-black transition hover:bg-green-500 disabled:opacity-60"
                  >
                    {sending ? 'Enviando...' : 'Enviar sinal'}
                  </button>
                </form>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">Recebidos</p>
                <div className="mt-3 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Total de usuários</span>
                    <strong>{formatNumber(data?.usersTotal ?? 0)}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Remoções registradas</span>
                    <strong>{formatNumber(data?.removedCount ?? 0)}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Novos canais</span>
                    <strong>{formatNumber(data?.stats?.newSubscribers ?? 0)}</strong>
                  </div>
                </div>
              </section>
            </div>

            <section className="rounded-[2rem] border border-white/5 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-zinc-400">Histórico de exclusões</p>
                <span className="text-[10px] uppercase text-zinc-500">{data?.period.toUpperCase()}</span>
              </div>
              <div className="mt-4 grid gap-3">
                {(data?.removed || []).map((item) => (
                  <div key={item.fid} className="grid gap-1 rounded-xl border border-white/5 bg-black/50 p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span>FID #{item.fid}</span>
                      <span className="text-green-400 font-bold">{item.event || 'removido'}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">Em {item.removedAt ?? '—'}</span>
                  </div>
                ))}
                {!data?.removed?.length && <p className="text-xs text-zinc-500">Nenhuma remoção registrada.</p>}
              </div>
            </section>
          </div>
        </main>

        <footer className="border-t border-white/5 bg-black/50 py-4 text-center text-[10px] uppercase tracking-[0.4em] text-zinc-500">
          Painel administrativo X-RAY Protocol • Base Network
        </footer>
      </div>
    </div>
  );
}
