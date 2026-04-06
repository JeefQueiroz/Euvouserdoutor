import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const APP_URL = new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://x-rayv2.vercel.app').hostname;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = Number(searchParams.get('fid'));

    if (!fid || isNaN(fid)) {
      return NextResponse.json({ error: 'Invalid FID' }, { status: 400 });
    }

    const apiKey = process.env.NEYNAR_API_KEY?.trim();
    if (!apiKey) {
      // Sem chave — permite por segurança
      return NextResponse.json({ cast_found: true });
    }

    // Busca os últimos 5 casts do usuário
    const res = await fetch(
      `https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=5`,
      { headers: { accept: 'application/json', api_key: apiKey }, cache: 'no-store' }
    );

    if (!res.ok) {
      return NextResponse.json({ cast_found: true }); // fallback: permite
    }

    const data  = await res.json();
    const casts = data?.casts || [];
    const now   = Date.now();

    // Verifica se algum cast recente (últimos 3 minutos) menciona nossa URL
    const found = casts.some((cast: any) => {
      const text      = cast?.text || '';
      const embeds    = cast?.embeds || [];
      const timestamp = new Date(cast?.timestamp || 0).getTime();
      const isRecent  = now - timestamp < 3 * 60 * 1000; // 3 minutos

      if (!isRecent) return false;

      const hasUrl = text.includes(APP_URL) ||
        embeds.some((e: any) => (e?.url || '').includes(APP_URL));

      return hasUrl;
    });

    return NextResponse.json({ cast_found: found, checked: casts.length });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Verification error';
    return NextResponse.json({ cast_found: true, error: msg }); // fallback: permite
  }
}
