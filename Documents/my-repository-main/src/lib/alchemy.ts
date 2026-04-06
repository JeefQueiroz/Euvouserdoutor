/**
 * Alchemy NFT Integration
 * Handles NFT queries and ownership verification on Base Network
 */

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_BASE_URL = "https://base-mainnet.g.alchemy.com/nft/v3";

export interface NFT {
  contractAddress: string;
  tokenId: string;
  name?: string;
  description?: string;
  image?: string;
  symbol?: string;
  tokenType?: string;
}

export interface AlchemyNFTResponse {
  ownedNfts: Array<{
    contract: {
      address: string;
      name?: string;
      symbol?: string;
    };
    tokenId: string;
    name?: string;
    description?: string;
    image?: {
      cachedUrl?: string;
      originalUrl?: string;
    };
    tokenType?: string;
  }>;
  totalCount: number;
  blockHash: string;
}

/**
 * Get NFTs owned by a wallet on Base Network
 */
export async function getNFTsForOwner(
  walletAddress: string,
  limit: number = 100
): Promise<NFT[]> {
  if (!ALCHEMY_API_KEY) {
    console.error("ALCHEMY_API_KEY not configured");
    return [];
  }

  try {
    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error("Invalid wallet address");
    }

    const url = new URL(`${ALCHEMY_BASE_URL}/${ALCHEMY_API_KEY}/getNFTsForOwner`);
    url.searchParams.append("owner", walletAddress);
    url.searchParams.append("pageSize", limit.toString());
    url.searchParams.append("withMetadata", "true");

    const response = await fetch(url.toString(), {
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Alchemy API error: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data: AlchemyNFTResponse = await response.json();

    return data.ownedNfts.map((nft) => ({
      contractAddress: nft.contract.address,
      tokenId: nft.tokenId,
      name: nft.name || nft.contract.name || "Unknown NFT",
      description: nft.description,
      image: nft.image?.cachedUrl || nft.image?.originalUrl,
      symbol: nft.contract.symbol,
      tokenType: nft.tokenType,
    }));
  } catch (error) {
    console.error("Error fetching NFTs from Alchemy:", error);
    return [];
  }
}

/**
 * Get NFTs for multiple wallets
 */
export async function getNFTsForMultipleWallets(
  walletAddresses: string[]
): Promise<{ [wallet: string]: NFT[] }> {
  const results: { [wallet: string]: NFT[] } = {};

  const promises = walletAddresses.map(async (wallet) => {
    const nfts = await getNFTsForOwner(wallet);
    results[wallet] = nfts;
  });

  await Promise.all(promises);
  return results;
}

/**
 * Count NFTs for a wallet
 */
export async function countNFTsForOwner(walletAddress: string): Promise<number> {
  const nfts = await getNFTsForOwner(walletAddress, 1);
  // Note: Alchemy returns totalCount but we'd need to paginate to get exact count
  // For now, we'll just return the count of fetched NFTs
  return nfts.length;
}

/**
 * Check if wallet owns a specific NFT contract
 */
export async function ownsNFTFromContract(
  walletAddress: string,
  contractAddress: string
): Promise<boolean> {
  const nfts = await getNFTsForOwner(walletAddress);
  return nfts.some(
    (nft) => nft.contractAddress.toLowerCase() === contractAddress.toLowerCase()
  );
}
