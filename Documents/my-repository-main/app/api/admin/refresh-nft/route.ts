import { NextResponse } from 'next/server';
import { base } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { abi, CONTRACT_ADDRESS } from '@/src/constants';
import { kvDeleteNftCache } from '@/src/server/nft-cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// Proteção por secret — configure ADMIN_SECRET no .env
function isAuthorized(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const auth = request.headers.get('x-admin-secret');
  return auth === secret;
}

function getPublicClient() {
  return createPublicClient({
    chain: base,
    transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
  });
}

// Força re-indexação no OpenSea
async function triggerOpenSeaRefresh(tokenId: number): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.opensea.io/api/v2/chain/base/contract/${CONTRACT_ADDRESS}/nfts/${tokenId}/refresh`,
      {
        method: 'POST',
        headers: {
          'x-api-key': process.env.OPENSEA_API_KEY || '',
        },
      },
    );
    return res.ok || res.status === 202;
  } catch {
    return false;
  }
}

// Busca a imagem atual do tokenURI on-chain
async function getCurrentImageUrl(fid: number): Promise<string | null> {
  try {
    const client = getPublicClient();
    const tokenUri = await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: 'tokenURI',
      args: [BigInt(fid)],
    }) as string;

    if (!tokenUri) return null;

    if (tokenUri.startsWith('data:application/json;base64,')) {
      const base64 = tokenUri.replace('data:application/json;base64,', '');
      const json = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
      return json.image || null;
    }
    if (tokenUri.startsWith('{')) {
      const json = JSON.parse(tokenUri);
      return json.image || null;
    }
    if (tokenUri.startsWith('https://') || tokenUri.startsWith('ipfs://')) {
      return tokenUri;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * POST /api/admin/refresh-nft
 * Body: { fid: number }
 * Header: x-admin-secret: <ADMIN_SECRET>
 *
 * Busca a imagem atual on-chain e força re-indexação no OpenSea.
 * Use este endpoint sempre que trocar a imagem de uma NFT no Pinata.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const fid  = Number(body.fid);

    if (!fid || Number.isNaN(fid)) {
      return NextResponse.json({ error: 'Invalid FID.' }, { status: 400 });
    }

    // 1. Read current on-chain image
    const currentImage = await getCurrentImageUrl(fid);
    if (!currentImage) {
      return NextResponse.json(
        { error: `NFT for FID ${fid} was not found on-chain.` },
        { status: 404 },
      );
    }

    // 2. Trigger OpenSea refresh
    const refreshed = await triggerOpenSeaRefresh(fid);
    // 3. Invalidate NFT cache so app reads latest tokenURI/image
    await kvDeleteNftCache(fid);

    return NextResponse.json({
      success:      true,
      fid,
      tokenId:      fid,
      currentImage,
      openSeaRefresh: refreshed,
      cacheBusted: true,
      message:      refreshed
        ? `NFT #${fid} refreshed on OpenSea and cache invalidated.`
        : `NFT #${fid} found on-chain, cache invalidated, but OpenSea refresh failed.`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/admin/refresh-nft?fid=1060895
 * Apenas consulta a imagem atual on-chain sem disparar refresh.
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const fid = Number(searchParams.get('fid'));

  if (!fid || Number.isNaN(fid)) {
    return NextResponse.json({ error: 'Invalid FID.' }, { status: 400 });
  }

  const currentImage = await getCurrentImageUrl(fid);
  if (!currentImage) {
    return NextResponse.json(
      { error: `NFT for FID ${fid} was not found on-chain.` },
      { status: 404 },
    );
  }

  return NextResponse.json({ fid, tokenId: fid, currentImage });
}
