import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fallback local para dev/offline quando KV não estiver disponível.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
let fallbackWarningLogged = false;

function resolveLimit(path: string): number {
  if (path.startsWith('/api/spin')) return 5;
  if (path.startsWith('/api/mint')) return 5;
  if (path.startsWith('/api/xray')) return 5;
  if (path.startsWith('/api/profile')) return 10;
  if (path.startsWith('/api/cron/')) return 1000; // Cron interno, limite muito alto
  if (path.startsWith('/api/notifications/send')) return 1000; // Webhook interno
  return 20;
}

function resolveIp(request: NextRequest): string {
  // Evitar usar request.ip (depreciado no Next.js 15)
  // Usar x-forwarded-for como fonte primária, com fallback para x-real-ip
  const forwarded = request.headers.get('x-forwarded-for') || '';
  const firstForwarded = forwarded.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  return firstForwarded || realIp || 'anonymous-ip';
}

function tooManyRequestsResponse(ip: string, path: string) {
  console.warn(`[RATE LIMIT] Bloqueando IP ${ip} em ${path}`);
  return new NextResponse(
    JSON.stringify({ error: 'Too Many Requests (Muitas requisições. Tente de novo em 1 minuto).' }),
    { status: 429, headers: { 'Content-Type': 'application/json' } }
  );
}

function localRateLimit(ip: string, path: string, windowMs: number, limit: number) {
  const now = Date.now();
  const key = `${ip}:${path}`;
  const record = rateLimitMap.get(key);
  if (!record || now - record.lastReset > windowMs) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return false;
  }
  record.count += 1;
  return record.count > limit;
}

export async function middleware(request: NextRequest) {
  const ip = resolveIp(request);
  const path = request.nextUrl.pathname;
  
  // Excluir rotas de cron e webhooks internos do rate limiting
  if (path.startsWith('/api/cron/') || path.startsWith('/api/notifications/send') || path.startsWith('/api/webhooks/')) {
    return NextResponse.next();
  }
  
  const limit = resolveLimit(path);
  const windowSeconds = 60;

  // Distribuído entre instâncias via KV.
  try {
    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!kvUrl || !kvToken) throw new Error('KV not configured');

    const minuteBucket = Math.floor(Date.now() / (windowSeconds * 1000));
    const key = `ratelimit:${path}:${ip}:${minuteBucket}`;

    const incrRes = await fetch(`${kvUrl.replace(/\/$/, '')}/incr/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${kvToken}` },
      cache: 'no-store',
    });
    if (!incrRes.ok) throw new Error('KV incr failed');
    const incrData = await incrRes.json().catch(() => null);
    const count = Number(incrData?.result ?? 0);

    if (count === 1) {
      await fetch(`${kvUrl.replace(/\/$/, '')}/expire/${encodeURIComponent(key)}/${windowSeconds + 5}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: 'no-store',
      }).catch(() => null);
    }
    if (count > limit) {
      return tooManyRequestsResponse(ip, path);
    }
    return NextResponse.next();
  } catch {
    // Fallback em memória se KV indisponível (desenvolvimento local).
    if (!fallbackWarningLogged) {
      console.warn('[RATE LIMIT] KV unavailable, falling back to per-instance memory limiting.');
      fallbackWarningLogged = true;
    }
    if (localRateLimit(ip, path, windowSeconds * 1000, limit)) {
      return tooManyRequestsResponse(ip, path);
    }
    return NextResponse.next();
  }
}

// Especifica em quais rotas o middleware vai intervir
export const config = {
  matcher: [
    '/api/:path*',
  ],
};
