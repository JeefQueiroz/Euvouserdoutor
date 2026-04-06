'use client';

/**
 * src/utils/addresses.ts
 *
 * Utilitário para coletar todas as carteiras conhecidas do usuário,
 * combinando a carteira conectada via wagmi com as carteiras verificadas
 * do contexto Farcaster.
 *
 * Corrige o Bug #2 descrito em FIXES.md:
 * "Garante que NFTs em qualquer carteira do usuário sejam encontradas"
 */

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function normalizeEthAddress(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().toLowerCase();
  return ETH_ADDRESS_REGEX.test(trimmed) ? trimmed : null;
}

/**
 * Combina carteira wagmi (conectada) + todas as carteiras Farcaster verificadas,
 * removendo duplicatas e normalizando para lowercase.
 */
export function getAllUserAddresses(
  wagmiAddress: string | undefined,
  farcasterContext: {
    user?: {
      verifiedAddresses?: {
        ethAddresses?: string[];
      };
      custodyAddress?: string;
    };
  } | null | undefined
): string[] {
  const addresses: string[] = [];

  // 1. Carteira conectada via wagmi (MetaMask, Coinbase, etc.)
  const wagmiNormalized = normalizeEthAddress(wagmiAddress);
  if (wagmiNormalized) addresses.push(wagmiNormalized);

  // 2. Carteiras verificadas do contexto Farcaster
  const ethAddresses = farcasterContext?.user?.verifiedAddresses?.ethAddresses ?? [];
  for (const addr of ethAddresses) {
    const normalized = normalizeEthAddress(addr);
    if (normalized && !addresses.includes(normalized)) {
      addresses.push(normalized);
    }
  }

  // 3. Custody address do Farcaster (fallback)
  const custodyNormalized = normalizeEthAddress(
    farcasterContext?.user?.custodyAddress
  );
  if (custodyNormalized && !addresses.includes(custodyNormalized)) {
    addresses.push(custodyNormalized);
  }

  return addresses;
}

/**
 * Versão simplificada para uso nos componentes React,
 * aceitando arrays já processados.
 */
export function mergeAddresses(
  ...addressLists: (string | null | undefined)[][]
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const list of addressLists) {
    for (const addr of list) {
      const normalized = normalizeEthAddress(addr);
      if (normalized && !seen.has(normalized)) {
        seen.add(normalized);
        result.push(normalized);
      }
    }
  }

  return result;
}

/**
 * Formata endereço para exibição truncada.
 * Ex: 0xDD53...289
 */
export function formatAddress(address: string, prefixLen = 6, suffixLen = 3): string {
  if (!address || address.length < prefixLen + suffixLen) return address;
  return `${address.slice(0, prefixLen)}...${address.slice(-suffixLen)}`;
}
