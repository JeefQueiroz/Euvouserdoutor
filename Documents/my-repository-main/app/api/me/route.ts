import { NextResponse } from 'next/server';
import { Errors, createClient } from '@farcaster/quick-auth';

export const dynamic = 'force-dynamic';

const client = createClient();

function resolveDomain(request: Request): string {
  const envDomain = process.env['QUICK_AUTH_DOMAIN']?.trim();
  if (envDomain) return envDomain;

  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) {
    throw new Error('Não foi possível resolver o domínio para validar Quick Auth JWT.');
  }
  return host;
}

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];
    const domain = resolveDomain(request);
    const payload = await client.verifyJwt({ token, domain });

    const fid = Number(payload.sub);
    if (!Number.isFinite(fid) || fid <= 0) {
      return NextResponse.json({ error: 'Invalid FID in token.' }, { status: 400 });
    }

    return NextResponse.json({ fid });
  } catch (error) {
    if (error instanceof Errors.InvalidTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    const message = error instanceof Error ? error.message : 'Quick Auth verification failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
