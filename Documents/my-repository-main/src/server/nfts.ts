import { createPublicClient, http, parseAbiItem } from 'viem';
import { base } from 'viem/chains';
import { abi, CONTRACT_ADDRESS, CONTRACT_DEPLOY_BLOCK } from '@/src/constants';
import { resolveIpfsCandidates, resolveIpfsUrl } from '@/src/lib/ipfs';

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

type NftItem = {
  tokenId: string;
  name: string;
  imageUrl: string | null;
  openseaUrl: string;
};

type WalletNftResult = {
  nfts: NftItem[];
  source: 'onchain' | 'none';
};

export type NftOwnershipItem = {
  token_id: string;
  wallet_address: string;
  image_url: string | null;
  metadata_url: string | null;
};

export function normalizeEthAddress(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!ETH_ADDRESS_REGEX.test(trimmed)) return null;
  return trimmed.toLowerCase();
}

function getPublicClient() {
  return createPublicClient({
    chain: base,
    transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
  });
}

async function getTransferLogsSafe(
  client: ReturnType<typeof getPublicClient>,
  args: { to?: `0x${string}`; from?: `0x${string}` },
  fromBlock: bigint,
) {
  const transferEvent = parseAbiItem(
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  );
  try {
    return await client.getLogs({
      address: CONTRACT_ADDRESS as `0x${string}`,
      event: transferEvent,
      args,
      fromBlock,
    });
  } catch {
    const latestBlock = await client.getBlockNumber();
    // Base public RPC limits eth_getLogs range to ~10k blocks per request.
    // Keep below limit to avoid silent empty ownership scans.
    const chunkSize = 2_000n; // Reduzido para evitar rate limits e timeouts
    const logs: any[] = [];
    let cursor = fromBlock;

    while (cursor <= latestBlock) {
      const toBlock = cursor + chunkSize > latestBlock ? latestBlock : cursor + chunkSize;
      try {
        const chunk = await client.getLogs({
          address: CONTRACT_ADDRESS as `0x${string}`,
          event: transferEvent,
          args,
          fromBlock: cursor,
          toBlock,
        });
        logs.push(...chunk);
      } catch {
        /* skip chunk on transient errors */
      }
      cursor = toBlock + 1n;
    }
    return logs;
  }
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 8_000,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function extractImageFromTokenUri(tokenUri: string): Promise<string | null> {
  try {
    if (tokenUri.startsWith('data:image/')) return tokenUri;

    if (tokenUri.startsWith('data:application/json;base64,')) {
      const json = JSON.parse(
        Buffer.from(tokenUri.replace('data:application/json;base64,', ''), 'base64').toString('utf-8'),
      );
      return json.image ? resolveIpfsUrl(json.image) : null;
    }

    if (tokenUri.startsWith('{')) {
      const json = JSON.parse(tokenUri);
      return json.image ? resolveIpfsUrl(json.image) : null;
    }

    const candidateUrls = resolveIpfsCandidates(tokenUri).filter(
      (url) => url.startsWith('https://') || url.startsWith('http://'),
    );
    if (!candidateUrls.length) return null;

    for (const httpUrl of candidateUrls) {
      let response: Response | null = null;
      try {
        response = await fetchWithTimeout(httpUrl, { cache: 'no-store' });
      } catch {
        response = null;
      }
      if (!response?.ok) continue;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.startsWith('image/')) return httpUrl;
      if (!contentType.includes('json') && !contentType.includes('text')) continue;

      const json = await response.json().catch(() => null);
      const image = json?.image ? String(json.image) : null;
      if (image) return resolveIpfsUrl(image);
    }
    return null;
  } catch {
    return null;
  }
}

// ✅ SimpleHash indexer (fast path). Only used when skipIndexer = false.
async function fetchNftsFromSimpleHash(address: string): Promise<NftItem[]> {
  const apiKey = process.env.SIMPLEHASH_API_KEY?.trim();
  if (!apiKey) return [];

  try {
    const res = await fetchWithTimeout(
      `https://api.simplehash.com/api/v0/nfts/owners?chains=base&wallet_addresses=${address}&contract_addresses=${CONTRACT_ADDRESS}&limit=50`,
      {
        headers: { 'X-API-KEY': apiKey },
        cache: 'no-store',
      },
      5_000 // 5 segundos de timeout para SimpleHash
    );
    if (!res.ok) return [];

    const data = await res.json();
    const nfts: any[] = data?.nfts ?? [];

    return nfts.map((nft: any) => ({
      tokenId: String(nft.token_id),
      name: nft.name || `X-RAY #${nft.token_id}`,
      // ✅ Use image_url from SimpleHash but prefer on-chain for updated images
      imageUrl: nft.previews?.image_medium_url || nft.image_url || null,
      openseaUrl: `https://opensea.io/assets/base/${CONTRACT_ADDRESS}/${nft.token_id}`,
    }));
  } catch {
    return [];
  }
}

// ✅ On-chain fallback: always reads the LATEST tokenURI from chain
async function fetchWalletNftsFromChain(address: string): Promise<NftItem[]> {
  try {
    const client = getPublicClient();
    const balance = (await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    })) as bigint;

    if (Number(balance) <= 0) return [];

    const [inLogs, outLogs] = await Promise.all([
      getTransferLogsSafe(client, { to: address as `0x${string}` }, CONTRACT_DEPLOY_BLOCK),
      getTransferLogsSafe(client, { from: address as `0x${string}` }, CONTRACT_DEPLOY_BLOCK),
    ]);

    const candidateTokenIds = new Set<string>();
    for (const log of [...inLogs, ...outLogs]) {
      const tokenId = (log as any).args?.tokenId;
      if (typeof tokenId === 'bigint') candidateTokenIds.add(tokenId.toString());
    }

    const ownedTokenIds: string[] = [];
    await Promise.all(
      Array.from(candidateTokenIds).map(async (tokenId) => {
        try {
          const owner = (await client.readContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi,
            functionName: 'ownerOf',
            args: [BigInt(tokenId)],
          })) as string;

          if (owner?.toLowerCase() === address.toLowerCase()) {
            ownedTokenIds.push(tokenId);
          }
        } catch {
          /* burned or invalid */
        }
      }),
    );

    const nfts = await Promise.all(
      ownedTokenIds.map(async (tokenId) => {
        let imageUrl: string | null = null;
        try {
          // ✅ Always read tokenURI from chain — picks up updateTokenUrl changes
          const tokenUri = (await client.readContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi,
            functionName: 'tokenURI',
            args: [BigInt(tokenId)],
          })) as string;
          imageUrl = await extractImageFromTokenUri(tokenUri);
        } catch {
          imageUrl = null;
        }

        return {
          tokenId,
          name: `X-RAY #${tokenId}`,
          imageUrl,
          openseaUrl: `https://opensea.io/assets/base/${CONTRACT_ADDRESS}/${tokenId}`,
        };
      }),
    );

    return nfts.sort((a, b) => Number(b.tokenId) - Number(a.tokenId));
  } catch {
    return [];
  }
}

export async function fetchNftsForWallet(address: string, skipIndexer = false): Promise<WalletNftResult> {
  if (!skipIndexer) {
    const indexedNfts = await fetchNftsFromSimpleHash(address);
    if (indexedNfts.length > 0) {
      return { nfts: indexedNfts, source: 'onchain' };
    }
  }

  const fromChain = await fetchWalletNftsFromChain(address);
  if (fromChain.length > 0) {
    return { nfts: fromChain, source: 'onchain' };
  }

  return { nfts: [], source: 'none' };
}

export async function fetchNftsForWallets(
  addresses: string[],
  skipIndexer = false,
): Promise<{
  nfts: NftItem[];
  onchainWalletHits: number;
}> {
  const uniqueAddresses = Array.from(
    new Set(
      addresses
        .map((address) => normalizeEthAddress(address))
        .filter((address): address is string => !!address),
    ),
  );
  if (!uniqueAddresses.length) {
    return { nfts: [], onchainWalletHits: 0 };
  }

  let onchainWalletHits = 0;
  const byToken = new Map<string, NftItem>();

  const results = await Promise.all(
    uniqueAddresses.map((address) => fetchNftsForWallet(address, skipIndexer)),
  );
  for (const result of results) {
    if (result.source === 'onchain') onchainWalletHits += 1;
    for (const nft of result.nfts) {
      if (!nft?.tokenId) continue;
      if (!byToken.has(nft.tokenId)) byToken.set(nft.tokenId, nft);
    }
  }

  const nfts = Array.from(byToken.values()).sort(
    (a, b) => Number(b.tokenId) - Number(a.tokenId),
  );
  return { nfts, onchainWalletHits };
}

export async function countNftsForWallets(addresses: string[]): Promise<number> {
  const uniqueAddresses = Array.from(
    new Set(
      addresses
        .map((address) => normalizeEthAddress(address))
        .filter((address): address is string => !!address),
    ),
  );
  if (!uniqueAddresses.length) return 0;

  const client = getPublicClient();
  const balances = await Promise.all(
    uniqueAddresses.map(async (address) => {
      try {
        const balance = (await client.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi,
          functionName: 'balanceOf',
          args: [address as `0x${string}`],
        })) as bigint;
        return Number(balance);
      } catch {
        return 0;
      }
    }),
  );

  return balances.reduce((total, current) => total + current, 0);
}

export async function fetchNftOwnershipForWallets(
  addresses: string[],
  skipIndexer = false,
): Promise<NftOwnershipItem[]> {
  const uniqueAddresses = Array.from(
    new Set(
      addresses
        .map((address) => normalizeEthAddress(address))
        .filter((address): address is string => !!address),
    ),
  );
  if (!uniqueAddresses.length) return [];

  const ownershipByToken = new Map<string, NftOwnershipItem>();

  await Promise.all(
    uniqueAddresses.map(async (walletAddress) => {
      const result = await fetchNftsForWallet(walletAddress, skipIndexer);
      for (const nft of result.nfts) {
        if (!nft?.tokenId) continue;
        ownershipByToken.set(String(nft.tokenId), {
          token_id: String(nft.tokenId),
          wallet_address: walletAddress,
          image_url: nft.imageUrl ?? null,
          metadata_url: null,
        });
      }
    }),
  );

  return Array.from(ownershipByToken.values());
}

// Fast-path helper: check ownership for a specific fid/tokenId and wallet.
// Isto evita escanear todos os logs quando você só precisa saber se um FID já tem NFT.
export async function checkUserNft(fid: number, walletAddress: string): Promise<boolean> {
  const client = getPublicClient();
  try {
    const owner = (await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: 'ownerOf',
      args: [BigInt(fid)],
    })) as string;

    return owner.toLowerCase() === walletAddress.toLowerCase();
  } catch {
    // token não existe ou erro de leitura
    return false;
  }
}
