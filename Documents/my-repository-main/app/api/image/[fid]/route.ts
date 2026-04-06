import { NextResponse } from 'next/server';
import { base } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { abi, CONTRACT_ADDRESS } from '@/src/constants';
import { resolveIpfsCandidates, resolveIpfsUrl } from '@/src/lib/ipfs';

export const dynamic = 'force-dynamic';

function getPublicClient() {
  return createPublicClient({
    chain: base,
    transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
  });
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 8_000
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Extrai a URL da imagem do tokenURI.
 * Suporta:
 *  1. data:application/json;base64,... (metadata on-chain)
 *  2. JSON string direto
 *  3. URL IPFS direta (ipfs://...)
 *  4. URL HTTPS direta apontando para imagem
 *  5. URL HTTPS apontando para JSON de metadata
 */
async function extractImageUrl(tokenUri: string): Promise<string | null> {
  if (tokenUri.startsWith('data:image/')) return tokenUri;
  // 1. Base64 JSON inline
  if (tokenUri.startsWith('data:application/json;base64,')) {
    try {
      const base64 = tokenUri.replace('data:application/json;base64,', '');
      const json = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
      return json.image || null;
    } catch { return null; }
  }

  // 2. JSON string direto
  if (tokenUri.startsWith('{')) {
    try {
      const json = JSON.parse(tokenUri);
      return json.image || null;
    } catch { return null; }
  }

  // 3. URL IPFS direta — resolve e verifica se é imagem ou JSON
  const candidates = resolveIpfsCandidates(tokenUri);
  for (const candidate of candidates) {
    if (!candidate.startsWith('https://') && !candidate.startsWith('http://')) continue;
    if (candidate.includes('/api/image/')) continue;
    const resolved = await resolveHttpUrl(candidate);
    if (resolved) return resolveIpfsUrl(resolved);
  }

  return null;
}

/**
 * Busca uma URL HTTP:
 * - Se o Content-Type for imagem, retorna a URL direto
 * - Se for JSON (metadata), extrai o campo "image"
 */
async function resolveHttpUrl(url: string): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(url, { cache: 'no-store' });
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';

    if (contentType.startsWith('image/')) {
      return url; // já é uma imagem
    }

    if (contentType.includes('json') || contentType.includes('text')) {
      try {
        const json = await res.json();
        return json.image || null;
      } catch { return null; }
    }
  } catch { /* ignore */ }
  return null;
}

// GET /api/image/[fid]
export async function GET(_req: Request, { params }: { params: { fid: string } }) {
  try {
    const fid = Number(params.fid);
    if (!fid || Number.isNaN(fid)) {
      return new NextResponse('Invalid FID', { status: 400 });
    }

    const client = getPublicClient();

    let tokenUri: string;
    try {
      tokenUri = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: 'tokenURI',
        args: [BigInt(fid)],
      }) as string;
    } catch {
      return new NextResponse('Token not found', { status: 404 });
    }

    if (!tokenUri || tokenUri.length === 0) {
      return new NextResponse('Token not found', { status: 404 });
    }

    const imageUrl = await extractImageUrl(tokenUri);
    if (!imageUrl) {
      console.error(`[image proxy] Could not extract image from tokenURI for fid ${fid}:`, tokenUri.slice(0, 200));
      return new NextResponse('Image not found', { status: 404 });
    }

    if (imageUrl.startsWith('data:image/')) {
      const match = imageUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (!match) return new NextResponse('Invalid inline image', { status: 400 });
      const contentType = match[1];
      const buffer = Buffer.from(match[2], 'base64');
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type':                contentType,
          'Cache-Control':               'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*',
          'X-Content-Type-Options':      'nosniff',
        },
      });
    }

    const imageCandidates = resolveIpfsCandidates(imageUrl);
    let imageRes: Response | null = null;
    for (const candidate of imageCandidates) {
      if (!candidate.startsWith('https://') && !candidate.startsWith('http://')) continue;
      const res = await fetchWithTimeout(candidate, { cache: 'no-store' }).catch(() => null);
      if (res?.ok) {
        imageRes = res;
        break;
      }
    }
    if (!imageRes?.ok) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    const imageBuffer = await imageRes.arrayBuffer();
    const contentType = imageRes.headers.get('content-type') || 'image/png';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type':                contentType,
        'Cache-Control':               'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options':      'nosniff',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return new NextResponse(message, { status: 500 });
  }
}
