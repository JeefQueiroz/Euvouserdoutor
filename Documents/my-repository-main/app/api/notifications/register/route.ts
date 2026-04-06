// app/api/notifications/register/route.ts
import { NextResponse } from 'next/server';
import { Errors, createClient } from '@farcaster/quick-auth';
import { getSubscriberByFid, upsertSubscriber } from '@/src/server/notifications';
import { syncUserSnapshotToSupabase } from '@/src/server/supabase';

export const dynamic = 'force-dynamic';

const quickAuthClient = createClient();

function resolveDomain(request: Request): string {
  const envDomain = process.env['QUICK_AUTH_DOMAIN']?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Não foi possível resolver o domínio para Quick Auth.');
  return host;
}

type RegisterBody = {
  notificationDetails?: {
    url?: string;
    token?: string;
  };
};

export async function POST(request: Request) {
  try {
    // ✅ Valida identidade via Quick Auth JWT (igual ao /api/mint/prepare)
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token.' }, { status: 401 });
    }

    const token  = authorization.split(' ')[1];
    const domain = resolveDomain(request);
    let authenticatedFid: number;

    try {
      const payload = await quickAuthClient.verifyJwt({ token, domain });
      const parsed  = Number(payload.sub);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        return NextResponse.json({ error: 'FID inválido no token.' }, { status: 400 });
      }
      authenticatedFid = parsed;
    } catch (error) {
      if (error instanceof Errors.InvalidTokenError) {
        return NextResponse.json({ error: 'Token inválido.' }, { status: 401 });
      }
      throw error;
    }

    const body    = (await request.json()) as RegisterBody;
    const details = body.notificationDetails;

    if (!details?.url || !details?.token) {
      return NextResponse.json({ error: 'notificationDetails inválido.' }, { status: 400 });
    }

    const previous = await getSubscriberByFid(authenticatedFid);
    await upsertSubscriber(authenticatedFid, {
      url:   details.url,
      token: details.token,
    });

    await syncUserSnapshotToSupabase(authenticatedFid, {
      notificationToken: details.token,
      notificationUrl: details.url,
    });

    // Métrica de novos inscritos por dia para painel admin
    if (!previous) {
      try {
        const { kv } = await import('@vercel/kv');
        const day = new Date().toISOString().slice(0, 10);
        await kv.hincrby(`notify:stats:${day}`, 'newSubscribers', 1);
      } catch {
        // best effort only
      }
    }

    return NextResponse.json({ success: true, fid: authenticatedFid });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao registrar notificações.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
