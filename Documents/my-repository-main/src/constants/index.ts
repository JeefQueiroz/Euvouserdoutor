import {
  NFT_CONTRACT_ADDRESS as NFT_ADDR,
  TOKEN_CONTRACT_ADDRESS as TOKEN_ADDR,
  CONTRACT_ADDRESS as LEGACY_CONTRACT_ADDR,
  CONTRACT_DEPLOY_BLOCK as DEPLOY_BLOCK,
  FREE_MINT_REAL_LIMIT as FREE_LIMIT,
  FREE_MINT_DISPLAY_MULTIPLIER as FREE_MULTIPLIER,
  PAID_DISPLAY_TOTAL as PAID_TOTAL,
  OPENSEA_COLLECTION_URL as OPENSEA_URL,
} from './contracts';

// Re-export centralizado para evitar drift entre arquivos de constantes.
export const NFT_CONTRACT_ADDRESS = NFT_ADDR;
export const TOKEN_CONTRACT_ADDRESS = TOKEN_ADDR;
export const CONTRACT_ADDRESS = LEGACY_CONTRACT_ADDR;
export const CONTRACT_DEPLOY_BLOCK = DEPLOY_BLOCK;
export const FREE_MINT_REAL_LIMIT = FREE_LIMIT;
export const FREE_MINT_DISPLAY_MULTIPLIER = FREE_MULTIPLIER;
export const PAID_DISPLAY_TOTAL = PAID_TOTAL;
export const OPENSEA_COLLECTION_URL = OPENSEA_URL;

export const abi = [
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'inputFid', type: 'uint256' },
      { internalType: 'string', name: 'url', type: 'string' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'mintXRay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentMintPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // NOTE: currentMintPrice exists on V2+ contracts.
  // The backend already falls back to mintPrice for V1 deployments.
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'verifierAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
] as const;

// ABI mínimo para o frontend (reduz payload importado no client bundle)
export const frontendAbi = [
  {
    inputs: [
      { internalType: 'uint256', name: 'inputFid', type: 'uint256' },
      { internalType: 'string', name: 'url', type: 'string' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'mintXRay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;
