import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

const SAO_PAULO_TZ = 'America/Sao_Paulo';
const HAS_KV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const STORE_PATH = path.join('/tmp', 'notification-sequence.json'); // Vercel filesystem é read-only exceto /tmp
const EXECUTION_LOCK_WINDOW_SECONDS = 5 * 60;
const MAX_CONSECUTIVE_SEND_FAILURES = 3;

const AIRDROP_MESSAGES = [
  '🧬 XRAY AirDrop is coming! Your mini app score decides your rewards. Keep stacking points. ☠️',
  '🧬 AirDrop alert: XRAY soon. Higher score, bigger rewards. Stay active. ☠️',
  '🧬 XRAY rewards are loading. Your score will define your share. Don\'t slow down. ☠️',
  '🧬 Future XRAY AirDrop ahead. Points matter. Keep building your DNA. ☠️',
  '🧬 XRAY snapshot approaching. Your mini app score counts. Stay consistent. ☠️',
  '🧬 XRAY AirDrop confirmed soon. More points, more tokens. Keep grinding. ☠️',
  '🧬 Your XRAY score matters. AirDrop distribution coming. Stay active. ☠️',
  '🧬 XRAY holders get rewarded. Your mini app score sets your level. ☠️',
  '🧬 Points today, rewards tomorrow. XRAY AirDrop based on your score. ☠️',
  '🧬 XRAY AirDrop incoming. Your activity defines your allocation. ☠️',
];

type Slot = 'morning' | 'afternoon';

function getLocalParts(now = new Date()): { day: string; hour: number } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: SAO_PAULO_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const year = parts.find((p) => p.type === 'year')?.value || '0000';
  const month = parts.find((p) => p.type === 'month')?.value || '01';
  const day = parts.find((p) => p.type === 'day')?.value || '01';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value || '0');
  return { day: `${year}-${month}-${day}`, hour };
}

function resolveSlotFromHour(hour: number): Slot {
  return hour < 13 ? 'morning' : 'afternoon';
}

function resolveAppUrl(request: Request): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (envUrl) {
    const withProtocol = /^https?:\/\//i.test(envUrl) ? envUrl : `https://${envUrl}`;
    try {
      return new URL(withProtocol).toString().replace(/\/$/, '');
    } catch {
      // continue to header-based resolution fallback
    }
  }
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) return '';
  return `${proto}://${host}`;
}

function authorizeCronRequest(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get('authorization');
  if (cronSecret) return authHeader === `Bearer ${cronSecret}`;

  const apiKey = process.env.NOTIFICATIONS_API_KEY?.trim();
  if (apiKey && request.headers.get('x-api-key') === apiKey) return true;

  return request.headers.get('x-vercel-cron') === '1';
}

type LocalState = {
  index: number;
  sentBySlot: Record<string, true>;
  lastExecutionAt?: string;
};

async function readLocalState(): Promise<LocalState> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as LocalState;
    return {
      index: Number(parsed?.index || 0),
      sentBySlot: parsed?.sentBySlot && typeof parsed.sentBySlot === 'object' ? parsed.sentBySlot : {},
      lastExecutionAt: typeof parsed?.lastExecutionAt === 'string' ? parsed.lastExecutionAt : undefined,
    };
  } catch {
    return { index: 0, sentBySlot: {} };
  }
}

async function writeLocalState(state: LocalState): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(state, null, 2), 'utf8');
}

async function hasAlreadySent(slotKey: string): Promise<boolean> {
  if (HAS_KV) {
    const { kv } = await import('@vercel/kv');
    return Boolean(await kv.get(`notify:slot:${slotKey}`));
  }
  const state = await readLocalState();
  return Boolean(state.sentBySlot[slotKey]);
}

async function markSlotSent(slotKey: string): Promise<void> {
  if (HAS_KV) {
    const { kv } = await import('@vercel/kv');
    await kv.set(`notify:slot:${slotKey}`, true, { ex: 60 * 60 * 48 });
    return;
  }
  const state = await readLocalState();
  state.sentBySlot[slotKey] = true;
  await writeLocalState(state);
}

async function getSequenceIndex(): Promise<number> {
  if (HAS_KV) {
    const { kv } = await import('@vercel/kv');
    const current = Number(await kv.get('notify:sequence:index'));
    return Number.isFinite(current) && current >= 0 ? current : 0;
  }
  const state = await readLocalState();
  return Number.isFinite(state.index) && state.index >= 0 ? state.index : 0;
}

async function setSequenceIndex(index: number): Promise<void> {
  const normalized = ((index % AIRDROP_MESSAGES.length) + AIRDROP_MESSAGES.length) % AIRDROP_MESSAGES.length;
  if (HAS_KV) {
    const { kv } = await import('@vercel/kv');
    await kv.set('notify:sequence:index', normalized);
    return;
  }
  const state = await readLocalState();
  state.index = normalized;
  await writeLocalState(state);
}

async function acquireExecutionLock(now: Date): Promise<{ ok: boolean; reason?: string }> {
  if (HAS_KV) {
    const { kv } = await import('@vercel/kv');
    const lockAcquired = await kv.set('notify:cron:execution-lock', now.toISOString(), {
      nx: true,
      ex: EXECUTION_LOCK_WINDOW_SECONDS,
    });
    if (!lockAcquired) return { ok: false, reason: 'Execution lock active (last 5 minutes).' };
    return { ok: true };
  }

  const state = await readLocalState();
  if (state.lastExecutionAt) {
    const lastExecutionMs = Date.parse(state.lastExecutionAt);
    if (Number.isFinite(lastExecutionMs)) {
      const elapsedMs = now.getTime() - lastExecutionMs;
      if (elapsedMs < EXECUTION_LOCK_WINDOW_SECONDS * 1000) {
        return { ok: false, reason: 'Execution lock active (last 5 minutes).' };
      }
    }
  }

  state.lastExecutionAt = now.toISOString();
  await writeLocalState(state);
  return { ok: true };
}

export async function GET(request: Request) {
  // Verifica autorização do cron da Vercel
  if (!authorizeCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const local = getLocalParts(now);
  const slot = resolveSlotFromHour(local.hour);
  const slotKey = `${local.day}:${slot}`;

  if (await hasAlreadySent(slotKey)) {
    return NextResponse.json({ ok: true, skipped: true, reason: 'Already sent for this slot.', slot, day: local.day });
  }

  const executionLock = await acquireExecutionLock(now);
  if (!executionLock.ok) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: executionLock.reason,
      slot,
      day: local.day,
    });
  }

  const sequenceIndex = await getSequenceIndex();
  const message = AIRDROP_MESSAGES[sequenceIndex % AIRDROP_MESSAGES.length];

  const APP_URL = resolveAppUrl(request);
  if (!APP_URL) {
    return NextResponse.json({ ok: false, error: 'Unable to resolve APP_URL.' }, { status: 500 });
  }

  try {
    let consecutiveFailures = 0;
    let data: unknown = null;
    let sentSuccessfully = false;

    for (let attempt = 1; attempt <= MAX_CONSECUTIVE_SEND_FAILURES; attempt++) {
      try {
        const res = await fetch(`${APP_URL}/api/notifications/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NOTIFICATIONS_API_KEY || '',
            'x-internal-cron': process.env.CRON_SECRET || '',
            'x-cron-forwarded': '1',
          },
          body: JSON.stringify({
            title: slot === 'morning' ? '🧬 XRAY Morning Signal' : '🧬 XRAY Afternoon Signal',
            body: message,
            targetUrl: APP_URL,
            notificationId: `xray-airdrop-${slot}-${local.day}-${sequenceIndex % AIRDROP_MESSAGES.length}`,
          }),
        });

        data = await res.json();
        if (!res.ok || (data as { error?: string })?.error) {
          throw new Error((data as { error?: string })?.error || `notifications/send failed with status ${res.status}`);
        }

        sentSuccessfully = true;
        consecutiveFailures = 0;
        break;
      } catch (sendError) {
        consecutiveFailures += 1;
        const sendMessage = sendError instanceof Error ? sendError.message : String(sendError);
        console.error(`[cron/notify] send attempt ${attempt} failed:`, sendMessage);

        if (consecutiveFailures >= MAX_CONSECUTIVE_SEND_FAILURES) {
          throw new Error(`Aborted after ${consecutiveFailures} consecutive send failures.`);
        }
      }
    }

    if (!sentSuccessfully) {
      throw new Error('Unable to send notification.');
    }

    await markSlotSent(slotKey);
    await setSequenceIndex(sequenceIndex + 1);
    console.log('[cron/notify] sent:', { slot, day: local.day, sequenceIndex, message }, data);
    return NextResponse.json({
      ok: true,
      slot,
      day: local.day,
      sequenceIndex,
      message,
      result: data,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Cron error';
    console.error('[cron/notify] error:', msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
