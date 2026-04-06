const DEFAULT_IPFS_GATEWAYS = [
  'https://gateway.pinata.cloud/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://dweb.link/ipfs/',
  'https://ipfs.io/ipfs/',
] as const;

function normalizeGateway(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
    return `${trimmed.replace(/\/+$/, '')}/`;
  } catch {
    return null;
  }
}

function configuredGateway(): string | null {
  const envGateway =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY ||
    process.env.IPFS_GATEWAY ||
    '';
  return normalizeGateway(envGateway);
}

export function getIpfsGateways(): string[] {
  const list = [configuredGateway(), ...DEFAULT_IPFS_GATEWAYS]
    .filter((value): value is string => Boolean(value));
  return Array.from(new Set(list));
}

export function resolveIpfsCandidates(url: string): string[] {
  if (typeof url !== 'string' || !url.trim()) return [];
  const raw = url.trim();

  if (raw.startsWith('ipfs://')) {
    const path = raw.replace(/^ipfs:\/\//, '');
    return getIpfsGateways().map((gateway) => `${gateway}${path}`);
  }

  if (raw.startsWith('ipns://')) {
    const path = raw.replace(/^ipns:\/\//, '');
    return getIpfsGateways().map((gateway) => gateway.replace('/ipfs/', '/ipns/') + path);
  }

  if (raw.startsWith('ar://')) {
    return [`https://arweave.net/${raw.replace(/^ar:\/\//, '')}`];
  }

  return [raw];
}

// Retorna o primeiro gateway (compatibilidade legada)
export function resolveIpfsUrl(url: string): string {
  const [first] = resolveIpfsCandidates(url);
  return first || url;
}

/**
 * Tenta fazer fetch da imagem percorrendo os gateways IPFS em sequência.
 * Retorna a primeira URL que responder com status 2xx.
 * Útil para server-side (API routes, sync).
 * Para client-side use o hook: import { useNftImageWithFallback } from '@/src/hooks/useNftImageWithFallback';
 */
export async function fetchWithGatewayFallback(
  url: string,
  timeoutMs = 6_000
): Promise<{ resolvedUrl: string; ok: boolean }> {
  const candidates = resolveIpfsCandidates(url);
  if (!candidates.length) return { resolvedUrl: url, ok: false };

  for (const candidate of candidates) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(candidate, {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-store',
      });
      clearTimeout(timer);
      if (res.ok) return { resolvedUrl: candidate, ok: true };
    } catch {
      // tenta próximo gateway
    }
  }

  // Nenhum funcionou — retorna o primeiro candidato como fallback
  return { resolvedUrl: candidates[0], ok: false };
}
