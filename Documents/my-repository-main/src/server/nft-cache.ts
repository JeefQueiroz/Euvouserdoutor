import { kv } from '@vercel/kv';

const CACHE_TTL_SECONDS = 5 * 60;
const nftCacheKey = (fid: number) => `nft:fid:${fid}`;

export async function kvDeleteNftCache(fid: number): Promise<void> {
  try {
    await kv.del(nftCacheKey(fid));
  } catch {
    // best-effort cache invalidation
  }
}

export async function kvGetNftCache(fid: number): Promise<{ image: string; imageProxy: string; fid: number } | null> {
  try {
    const value = await kv.get(nftCacheKey(fid));
    if (!value || typeof value !== 'object') return null;
    const candidate = value as { image?: unknown; imageProxy?: unknown; fid?: unknown };
    if (
      typeof candidate.image === 'string' &&
      typeof candidate.imageProxy === 'string' &&
      Number(candidate.fid) === fid
    ) {
      return {
        image: candidate.image,
        imageProxy: candidate.imageProxy,
        fid,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function kvSetNftCache(fid: number, payload: { image: string; imageProxy: string; fid: number }): Promise<void> {
  try {
    await kv.set(nftCacheKey(fid), payload, { ex: CACHE_TTL_SECONDS });
  } catch {
    // best-effort cache set
  }
}

