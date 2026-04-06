/**
 * Base Network Integration
 * Handles RPC calls, NFT queries, and blockchain interactions
 */

import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { NFT_CONTRACT_ADDRESS } from "@/src/constants/contracts";

// Initialize Base RPC client
const baseClient = createPublicClient({
  chain: base,
  transport: http(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  ),
});

// XRAY NFT Contract
export const XRAY_NFT_ADDRESS = NFT_CONTRACT_ADDRESS;
export const XRAY_NFT_ABI = [
  {
    inputs: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

/**
 * Check if user owns XRAY NFT
 */
export async function checkXrayOwnership(
  walletAddress: string,
  tokenId: bigint = BigInt(1)
): Promise<{ hasXray: boolean; balance: string }> {
  try {
    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error("Invalid wallet address");
    }

    const balance = await baseClient.readContract({
      address: XRAY_NFT_ADDRESS,
      abi: XRAY_NFT_ABI,
      functionName: "balanceOf",
      args: [walletAddress as `0x${string}`, tokenId],
    });

    return {
      hasXray: balance > BigInt(0),
      balance: balance.toString(),
    };
  } catch (error) {
    console.error("Error checking XRAY ownership:", error);
    throw error;
  }
}

/**
 * Get balance of native token (ETH) on Base
 */
export async function getBalance(walletAddress: string): Promise<string> {
  try {
    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error("Invalid wallet address");
    }

    const balance = await baseClient.getBalance({
      address: walletAddress as `0x${string}`,
    });

    return balance.toString();
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
}

/**
 * Get RPC client for custom calls
 */
export function getBaseClient() {
  return baseClient;
}
