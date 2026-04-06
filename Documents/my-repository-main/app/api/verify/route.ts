import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const viewerFid = Number(searchParams.get('fid'));
    const target    = searchParams.get('target') || 'euvouserdoutor';

    if (!viewerFid || isNaN(viewerFid)) {
      return NextResponse.json({ error: 'Invalid FID' }, { status: 400 });
    }

    const apiKey = process.env.NEYNAR_API_KEY?.trim();
    if (!apiKey) {
      // Sem chave configurada — permite por segurança
      return NextResponse.json({ following: true });
    }

    // Passo 1: Busca o FID do target pelo username
    const userRes = await fetch(
      `https://api.neynar.com/v2/farcaster/user/by_username?username=${target}`,
      { headers: { accept: 'application/json', api_key: apiKey }, cache: 'no-store' }
    );

    if (!userRes.ok) {
      return NextResponse.json({ following: true }); // fallback: permite
    }

    const userData = await userRes.json();
    const targetFid = userData?.user?.fid;

    if (!targetFid) {
      return NextResponse.json({ following: true }); // fallback: permite
    }

    // Passo 2: Verifica se o viewer segue o target
    const followRes = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${targetFid}&viewer_fid=${viewerFid}`,
      { headers: { accept: 'application/json', api_key: apiKey }, cache: 'no-store' }
    );

    if (!followRes.ok) {
      return NextResponse.json({ following: true }); // fallback: permite
    }

    const followData = await followRes.json();
    const following  = followData?.users?.[0]?.viewer_context?.following ?? false;

    return NextResponse.json({ following, targetFid, viewerFid });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Verification error';
    // Em caso de erro, permite para não bloquear o usuário
    return NextResponse.json({ following: true, error: message });
  }
}
