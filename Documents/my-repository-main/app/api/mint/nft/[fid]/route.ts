import { NextResponse } from 'next/server';
import { base } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { abi, CONTRACT_ADDRESS } from '@/src/constants';
import { resolveIpfsCandidates, resolveIpfsUrl } from '@/src/lib/ipfs';
import { kvGetNftCache, kvSetNftCache } from '@/src/server/nft-cache';

export const dynamic = 'force-dynamic';

// Cache de ownership separado — TTL menor, pois muda com transfers
const ownerCache = new Map<number, { owner: string; expiresAt: number }>();
const OWNER_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

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

async function extractImageUrl(tokenUri: string): Promise<string | null> {
  if (tokenUri.startsWith('data:image/')) return tokenUri;
  if (tokenUri.startsWith('data:application/json;base64,')) {
    try {
      const base64 = tokenUri.replace('data:application/json;base64,', '');
      const json = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
      return json.image ? resolveIpfsUrl(json.image) : null;
    } catch { return null; }
  }
  if (tokenUri.startsWith('{')) {
    try {
      const json = JSON.parse(tokenUri);
      return json.image ? resolveIpfsUrl(json.image) : null;
    } catch { return null; }
  }
  const candidateUris = resolveIpfsCandidates(tokenUri);
  for (const httpsUri of candidateUris) {
    if (!httpsUri.startsWith('https://') && !httpsUri.startsWith('http://')) continue;
    if (httpsUri.includes('/api/image/')) continue;
    try {
      const res = await fetchWithTimeout(httpsUri, { cache: 'no-store' });
      if (!res.ok) continue;
      const contentType = res.headers.get('content-type') || '';
      if (contentType.startsWith('image/')) return httpsUri;
      if (contentType.includes('json') || contentType.includes('text') || contentType.includes('octet-stream')) {
        try {
          const json = await res.json();
          return json.image ? resolveIpfsUrl(String(json.image)) : null;
        } catch { return null; }
      }
    } catch {
      // Try next candidate URI
    }
  }
  return null;
}

// Busca e cacheia o owner atual do tokenId
async function getCurrentOwner(tokenId: number): Promise<string | null> {
  const cached = ownerCache.get(tokenId);
  if (cached && Date.now() < cached.expiresAt) return cached.owner;

  try {
    const client = getPublicClient();
    const owner = await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: 'ownerOf',
      args: [BigInt(tokenId)],
    }) as string;
    ownerCache.set(tokenId, { owner: owner.toLowerCase(), expiresAt: Date.now() + OWNER_CACHE_TTL_MS });
    return owner.toLowerCase();
  } catch {
    // ownerOf reverts se o token não existe ou foi queimado
    return null;
  }
}

export async function GET(_req: Request, { params }: { params: { fid: string } }) {
  try {
    const fid = Number(params.fid);
    if (!fid || isNaN(fid)) {
      return NextResponse.json({ error: 'Invalid FID' }, { status: 400 });
    }

    // ?owner=0x... → valida ownership atual antes de retornar
    const { searchParams } = new URL(_req.url);
    const ownerParam = searchParams.get('owner')?.toLowerCase().trim();

    // Verifica ownership se solicitado
    if (ownerParam) {
      const currentOwner = await getCurrentOwner(fid);
      if (!currentOwner) {
        // Token não existe ou foi queimado
        return NextResponse.json({ error: 'Token not found or burned' }, { status: 404 });
      }
      if (currentOwner !== ownerParam) {
        // Token existe mas pertence a outro endereço
        console.log(`[nft/${fid}] ownership mismatch: current=${currentOwner} requested=${ownerParam}`);
        return NextResponse.json(
          { error: 'Token not owned by address', currentOwner, requestedOwner: ownerParam },
          { status: 403 }
        );
      }
    }

    const kvCached = await kvGetNftCache(fid);
    if (kvCached) {
      return NextResponse.json(kvCached);
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
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    if (!tokenUri || tokenUri.length === 0) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    const imageUrl = await extractImageUrl(tokenUri);
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image not found in token metadata' }, { status: 404 });
    }

    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://x-rayv2.vercel.app';
    const result = { image: imageUrl, imageProxy: `${APP_URL}/api/image/${fid}`, fid };
    await kvSetNftCache(fid, result);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
