import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function isBlockedHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  if (normalized === 'localhost' || normalized.endsWith('.local')) return true;
  if (normalized === '127.0.0.1' || normalized === '0.0.0.0' || normalized === '::1') return true;
  return false;
}

function isPrivateIpv4(hostname: string): boolean {
  const match = hostname.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return false;
  const a = Number(match[1]);
  const b = Number(match[2]);

  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

export async function GET(request: Request) {
  try {
    const src = new URL(request.url).searchParams.get('src')?.trim();
    if (!src) {
      return NextResponse.json({ error: 'Missing src.' }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(src);
    } catch {
      return NextResponse.json({ error: 'Invalid src URL.' }, { status: 400 });
    }

    if (parsed.protocol !== 'https:') {
      return NextResponse.json({ error: 'Only https URLs are allowed.' }, { status: 400 });
    }

    if (isBlockedHost(parsed.hostname) || isPrivateIpv4(parsed.hostname)) {
      return NextResponse.json({ error: 'Blocked src host.' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const upstream = await fetch(parsed.toString(), {
        signal: controller.signal,
        headers: { Accept: 'image/*' },
        cache: 'no-store',
      });

      if (!upstream.ok) {
        return NextResponse.json({ error: `Upstream image fetch failed (${upstream.status}).` }, { status: 502 });
      }

      const contentType = upstream.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) {
        return NextResponse.json({ error: 'Upstream content is not an image.' }, { status: 415 });
      }

      const data = await upstream.arrayBuffer();
      return new NextResponse(data, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=300, s-maxage=300',
        },
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'PFP proxy error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
