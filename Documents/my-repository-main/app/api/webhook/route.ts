import { NextResponse } from 'next/server';
import { parseWebhookEvent, verifyAppKeyWithNeynar } from '@farcaster/miniapp-node';
import { removeSubscriber, upsertSubscriber } from '@/src/server/notifications';
import { syncUserSnapshotToSupabase } from '@/src/server/supabase';
import { createHmac, timingSafeEqual } from 'crypto';

export const dynamic = 'force-dynamic';

// Verifica assinatura HMAC enviada pelo Neynar no header X-Neynar-Signature
function verifyHmacSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.NEYNAR_WEBHOOK_SECRET;
  // Se secret não está configurado, pula verificação (dev/local)
  if (!secret) return true;
  if (!signature) return false;
  const expected = createHmac('sha512', secret)
    .update(rawBody)
    .digest('hex');
  try {
    return timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(signature.replace(/^0x/, ''), 'hex')
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('X-Neynar-Signature');

    if (!verifyHmacSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
    }

    const data = JSON.parse(rawBody);
    const parsed = await parseWebhookEvent(data, verifyAppKeyWithNeynar);

    const event = parsed.event.event;
    const fid = parsed.fid;

    if (event === 'miniapp_added' || event === 'notifications_enabled') {
      const details = parsed.event.notificationDetails;
      if (details?.url && details?.token) {
        await upsertSubscriber(fid, {
          url: details.url,
          token: details.token,
        });
        await syncUserSnapshotToSupabase(fid, {
          notificationToken: details.token,
          notificationUrl: details.url,
        });
      }
      try {
        const { kv } = await import('@vercel/kv');
        const day = new Date().toISOString().slice(0, 10);
        await Promise.all([
          kv.srem('notify:removed:fids', String(fid)),
          kv.del(`notify:removed:${fid}`),
          kv.hincrby(`notify:stats:${day}`, 'newSubscribers', 1),
        ]);
      } catch {
        // best effort
      }
      return NextResponse.json({ success: true, event, fid });
    }

    if (event === 'miniapp_removed' || event === 'notifications_disabled') {
      await removeSubscriber(fid);
      await syncUserSnapshotToSupabase(fid, {
        notificationToken: null,
        notificationUrl: null,
      });
      try {
        const { kv } = await import('@vercel/kv');
        const day = new Date().toISOString().slice(0, 10);
        await Promise.all([
          kv.sadd('notify:removed:fids', String(fid)),
          kv.set(`notify:removed:${fid}`, {
            fid,
            event,
            removedAt: new Date().toISOString(),
          }),
          kv.hincrby(`notify:stats:${day}`, 'disabledSubscribers', 1),
        ]);
      } catch {
        // best effort
      }
      return NextResponse.json({ success: true, event, fid });
    }

    return NextResponse.json({ success: true, event, fid, ignored: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook event.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
