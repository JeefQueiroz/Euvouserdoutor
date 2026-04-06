// app/api/notifications/send/route.ts
import { NextResponse } from 'next/server';
import {
  getSubscribersByFids,
  removeSubscribersByTokens,
  sendFarcasterNotification,
} from '@/src/server/notifications';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const HAS_KV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const DEFAULT_MAX_BROADCAST_SUBSCRIBERS = 120;
const DEFAULT_MAX_TOKENS_PER_BATCH = 20;
const DEFAULT_MAX_BATCHES_PER_REQUEST = 6;
const DEFAULT_BATCH_DELAY_MS = 150;
const DEFAULT_MAX_EXECUTION_MS = 8_000;
const BROADCAST_COOLDOWN_SECONDS = 20 * 60 * 60;
const DEFAULT_MAX_RATE_LIMIT_RETRY_ATTEMPTS = 2;
const RATE_LIMIT_RETRY_BASE_DELAY_MS = 700;
const MAX_DAILY_RATE_LIMIT_RETRY_PER_TOKEN = 3;

type SendBody = {
  fids?:           number[];
  title?:          string;
  body?:           string;
  targetUrl?:      string;
  notificationId?: string;
};

function requireInternalCron(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const apiKey = process.env.NOTIFICATIONS_API_KEY?.trim();
  const allowVercelCron =
    ['1', 'true', 'yes'].includes((process.env.NOTIFICATIONS_ALLOW_VERCEL_CRON || '').trim().toLowerCase());

  // Fallback controlado: permite apenas invocação de Cron nativo da Vercel se explicitamente habilitado.
  if (!cronSecret && !apiKey && allowVercelCron) {
    return request.headers.get('x-vercel-cron') === '1';
  }

  if (!cronSecret && !apiKey) {
    console.error(
      '[notifications/send] Blocked: configure CRON_SECRET or NOTIFICATIONS_API_KEY, ' +
      'or set NOTIFICATIONS_ALLOW_VERCEL_CRON=true.'
    );
    return false;
  }

  if (cronSecret && request.headers.get('x-internal-cron') === cronSecret) {
    return true;
  }

  if (apiKey && request.headers.get('x-api-key') === apiKey) {
    return true;
  }

  return false;
}

function parseBoundedInt(input: string | undefined, fallback: number, min: number, max: number): number {
  const parsed = Number(input);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.trunc(parsed), min), max);
}

function getMaxBroadcastSubscribers(): number {
  return parseBoundedInt(process.env.NOTIFICATIONS_MAX_BROADCAST_SUBSCRIBERS, DEFAULT_MAX_BROADCAST_SUBSCRIBERS, 1, 2000);
}

function getMaxTokensPerBatch(): number {
  return parseBoundedInt(process.env.NOTIFICATIONS_MAX_TOKENS_PER_BATCH, DEFAULT_MAX_TOKENS_PER_BATCH, 5, 50);
}

function getMaxBatchesPerRequest(): number {
  return parseBoundedInt(process.env.NOTIFICATIONS_MAX_BATCHES_PER_REQUEST, DEFAULT_MAX_BATCHES_PER_REQUEST, 1, 50);
}

function getBatchDelayMs(): number {
  return parseBoundedInt(process.env.NOTIFICATIONS_BATCH_DELAY_MS, DEFAULT_BATCH_DELAY_MS, 0, 5_000);
}

function getMaxExecutionMs(): number {
  return parseBoundedInt(process.env.NOTIFICATIONS_MAX_EXECUTION_MS, DEFAULT_MAX_EXECUTION_MS, 1_000, 55_000);
}

function getMaxRetryAttempts(): number {
  return parseBoundedInt(
    process.env.NOTIFICATIONS_MAX_RATE_LIMIT_RETRY_ATTEMPTS,
    DEFAULT_MAX_RATE_LIMIT_RETRY_ATTEMPTS,
    0,
    5
  );
}

function buildNotificationId(title: string, customId?: string): string {
  if (customId?.trim()) return customId.trim().slice(0, 128);
  const today = new Date().toISOString().slice(0, 10);
  const slug  = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return `xray-${slug}-${today}`;
}

// ✅ Só valida se é uma URL https válida — sem restrição de path
function isValidNotificationUrl(url: string | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

function chunkTokens(tokens: string[], chunkSize: number): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < tokens.length; i += chunkSize) {
    chunks.push(tokens.slice(i, i + chunkSize));
  }
  return chunks;
}

async function acquireBroadcastLock(notificationId: string): Promise<{ ok: boolean; reason?: string }> {
  if (!HAS_KV) return { ok: true };
  const { kv } = await import('@vercel/kv');

  const dedupeKey = `notify:dedupe:${notificationId}`;
  const lockKey = 'notify:broadcast:lock';

  const dedupeAcquired = await kv.set(dedupeKey, 1, { nx: true, ex: 60 * 60 * 24 });
  if (!dedupeAcquired) return { ok: false, reason: 'notificationId already processed recently' };

  const lockAcquired = await kv.set(lockKey, 1, { nx: true, ex: BROADCAST_COOLDOWN_SECONDS });
  if (!lockAcquired) {
    await kv.del(dedupeKey);
    return { ok: false, reason: 'broadcast cooldown active' };
  }
  return { ok: true };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelayMs(attempt: number): number {
  const jitter = Math.floor(Math.random() * 300);
  return RATE_LIMIT_RETRY_BASE_DELAY_MS * (2 ** attempt) + jitter;
}

async function selectRetryableTokens(tokens: string[]): Promise<string[]> {
  const uniqueTokens = Array.from(new Set(tokens)).filter((token) => token.length > 0);
  if (!HAS_KV || uniqueTokens.length === 0) return uniqueTokens;

  const { kv } = await import('@vercel/kv');
  const dayKey = new Date().toISOString().slice(0, 10);

  const attempts = await Promise.all(uniqueTokens.map(async (token) => {
    const encoded = Buffer.from(token).toString('base64url');
    const key = `notify:retry:${dayKey}:${encoded}`;
    const count = await kv.incr(key);
    if (count === 1) await kv.expire(key, 60 * 60 * 48);
    return { token, count };
  }));

  return attempts
    .filter(({ count }) => count <= MAX_DAILY_RATE_LIMIT_RETRY_PER_TOKEN)
    .map(({ token }) => token);
}

export async function POST(request: Request) {
  try {
    if (!requireInternalCron(request)) {
      return NextResponse.json({ error: 'Forbidden: internal cron only.' }, { status: 403 });
    }

    const payload        = (await request.json()) as SendBody;
    const day = new Date().toISOString().slice(0, 10);
    const title          = payload.title?.trim()     || 'X-RAY Update';
    const body           = payload.body?.trim()      || 'Your X-RAY protocol has news.';
    const targetUrl      = payload.targetUrl?.trim() || 'https://x-rayv2.vercel.app';
    const notificationId = buildNotificationId(title, payload.notificationId);

    const fids = Array.isArray(payload.fids)
      ? payload.fids.map(Number).filter(Number.isFinite)
      : undefined;
    const maxBroadcastSubscribers = getMaxBroadcastSubscribers();
    const maxTokensPerBatch = getMaxTokensPerBatch();
    const maxBatchesPerRequest = getMaxBatchesPerRequest();
    const batchDelayMs = getBatchDelayMs();
    const maxExecutionMs = getMaxExecutionMs();
    const maxRetryAttempts = getMaxRetryAttempts();
    const hardCapByExecution = maxTokensPerBatch * maxBatchesPerRequest;

    const isBroadcast = !fids || fids.length === 0;
    if (isBroadcast) {
      const lock = await acquireBroadcastLock(notificationId);
      if (!lock.ok) {
        return NextResponse.json({
          success: true,
          sent: 0,
          skipped: 0,
          notificationId,
          result: `Skipped: ${lock.reason}`,
        });
      }
    }

    const allSubscribers = await getSubscribersByFids(fids);

    // ✅ Filtra só subscribers com URL e token presentes
    const subscribers = allSubscribers.filter(s =>
      isValidNotificationUrl(s.details?.url) &&
      typeof s.details?.token === 'string' &&
      s.details.token.length > 0,
    );

    const maxSubscribersThisRun = isBroadcast
      ? Math.min(maxBroadcastSubscribers, hardCapByExecution)
      : hardCapByExecution;
    const limitedSubscribers = subscribers.slice(0, maxSubscribersThisRun);

    const skipped = allSubscribers.length - limitedSubscribers.length;

    if (limitedSubscribers.length === 0) {
      return NextResponse.json({
        success:         true,
        sent:            0,
        skipped,
        subscribers:     allSubscribers.length,
        result:          'No valid subscribers found.',
      });
    }

    // Agrupa tokens por URL de destino
    const grouped = new Map<string, string[]>();
    for (const subscriber of limitedSubscribers) {
      const key     = subscriber.details.url;
      const current = grouped.get(key) || [];
      current.push(subscriber.details.token);
      grouped.set(key, current);
    }

    let sent = 0;
    const invalidTokensGlobal: string[] = [];
    let processedBatches = 0;
    let stoppedEarly = false;
    const batches: Array<{
      url:               string;
      successfulTokens:  string[];
      invalidTokens:     string[];
      rateLimitedTokens: string[];
      error?:            string;
    }> = [];
    const startedAt = Date.now();

    outer: 
    for (const [url, tokens] of grouped.entries()) {
      const tokenChunks = chunkTokens(tokens, maxTokensPerBatch);
      for (const tokenChunk of tokenChunks) {
        if (processedBatches >= maxBatchesPerRequest || Date.now() - startedAt >= maxExecutionMs) {
          stoppedEarly = true;
          break outer;
        }
        processedBatches += 1;

        try {
          const result = await sendFarcasterNotification({
            url,
            tokens: tokenChunk,
            notificationId,
            title,
            body,
            targetUrl,
          });

          let successfulTokens = [...result.successfulTokens];
          let invalidTokens = [...result.invalidTokens];
          let rateLimitedTokens = [...result.rateLimitedTokens];
          let retryErrorMsg: string | undefined;

          for (let attempt = 0; attempt < maxRetryAttempts && rateLimitedTokens.length > 0; attempt++) {
            const retryableTokens = await selectRetryableTokens(rateLimitedTokens);
            if (retryableTokens.length === 0) break;
            try {
              await sleep(getRetryDelayMs(attempt));
              const retryResult = await sendFarcasterNotification({
                url,
                tokens: retryableTokens,
                notificationId: `${notificationId}-r${attempt + 1}`,
                title,
                body,
                targetUrl,
              });
              successfulTokens = successfulTokens.concat(retryResult.successfulTokens);
              invalidTokens = invalidTokens.concat(retryResult.invalidTokens);
              rateLimitedTokens = retryResult.rateLimitedTokens;
            } catch (retryError) {
              retryErrorMsg = retryError instanceof Error ? retryError.message : String(retryError);
              break;
            }
          }

          sent += successfulTokens.length;
          invalidTokensGlobal.push(...invalidTokens);
          batches.push({
            url,
            successfulTokens,
            invalidTokens,
            rateLimitedTokens,
            error: retryErrorMsg ? `retry failed: ${retryErrorMsg}` : undefined,
          });
        } catch (batchError) {
          const errorMsg = batchError instanceof Error ? batchError.message : String(batchError);
          console.error(`[notifications/send] batch para ${url} falhou:`, errorMsg);
          batches.push({
            url,
            successfulTokens:  [],
            invalidTokens:     [],
            rateLimitedTokens: [],
            error:             errorMsg,
          });
        }

        if (batchDelayMs > 0) {
          await sleep(batchDelayMs);
        }
      }
    }

    const removedInvalidSubscribers = await removeSubscribersByTokens(invalidTokensGlobal);
    try {
      const { kv } = await import('@vercel/kv');
      await Promise.all([
        kv.hincrby(`notify:stats:${day}`, 'total', allSubscribers.length),
        kv.hincrby(`notify:stats:${day}`, 'valid', limitedSubscribers.length),
        kv.hincrby(`notify:stats:${day}`, 'sent', sent),
        kv.hincrby(`notify:stats:${day}`, 'skipped', skipped),
        kv.hincrby(`notify:stats:${day}`, 'nonReceived', Math.max(0, limitedSubscribers.length - sent)),
        kv.hincrby(`notify:stats:${day}`, 'removedInvalidSubscribers', removedInvalidSubscribers),
      ]);
    } catch {
      // best effort only
    }

    return NextResponse.json({
      success:                  true,
      sent,
      skipped,
      notificationId,
      subscribers:              allSubscribers.length,
      validSubscribers:         limitedSubscribers.length,
      limitedBySafetyCap:       isBroadcast && subscribers.length > maxBroadcastSubscribers,
      maxBroadcastSubscribers,
      maxSubscribersThisRun,
      hardCapByExecution,
      maxTokensPerBatch,
      maxBatchesPerRequest,
      batchDelayMs,
      maxExecutionMs,
      processedBatches,
      stoppedEarly,
      removedInvalidSubscribers,
      batches,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao enviar notificações.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
