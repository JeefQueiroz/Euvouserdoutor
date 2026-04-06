"use client";

import { useState, useCallback } from "react";
import { resolveIpfsCandidates, resolveIpfsUrl } from "@/src/lib/ipfs";

/**
 * Hook de imagem para NFT com fallback automático entre múltiplos gateways IPFS.
 *
 * Uso sugerido:
 *
 *   const { src, onError } = useNftImageWithFallback(nft.imageUrl);
 *   <Image src={src ?? "/fallback-nft.png"} onError={onError} ... />
 */
export function useNftImageWithFallback(rawUrl: string | null) {
  const [gatewayIndex, setGatewayIndex] = useState(0);

  const initialSrc = rawUrl ? resolveIpfsUrl(rawUrl) : null;
  const [src, setSrc] = useState<string | null>(initialSrc);

  const onError = useCallback(() => {
    if (!rawUrl) return;
    const candidates = resolveIpfsCandidates(rawUrl);
    const next = gatewayIndex + 1;
    if (next < candidates.length) {
      setGatewayIndex(next);
      setSrc(candidates[next]);
    }
  }, [rawUrl, gatewayIndex]);

  return { src, onError };
}
