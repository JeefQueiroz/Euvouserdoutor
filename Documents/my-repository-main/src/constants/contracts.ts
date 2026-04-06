/**
 * src/constants/contracts.ts
 *
 * Endereços de contratos do ecossistema X-RAY Protocol na Base Network.
 * Todos os endereços com label explícito para evitar ambiguidade.
 *
 * Corrige o Bug #3 descrito em FIXES.md:
 * "NFT_CONTRACT_ADDRESS e TOKEN_CONTRACT_ADDRESS exportados separadamente
 *  sem ambiguidade entre o contrato Token e o NFT"
 */

// ─── Contratos Principais ─────────────────────────────────────────────────────

/** Contrato NFT ERC-721 — X-RAY Identity Layer */
export const NFT_CONTRACT_ADDRESS =
  '0xaC5fd046C7ea0bA5C2081622EdF1B07e28040068' as const;

/** Contrato Token ERC-20 — $XRAY Utility Token */
export const TOKEN_CONTRACT_ADDRESS =
  '0x1678FF3b9D29F2fE0340a9528262927e3D44354C' as const;

// ─── Contratos do Ecossistema ─────────────────────────────────────────────────

/** Staking Contract — bloqueia supply e distribui recompensas */
export const STAKING_CONTRACT_ADDRESS =
  '0x475BbB4008f14A950Be696d27EbB3D98fB93AAe6' as const;

/** Vesting Contract — controla cronograma de liberação de tokens */
export const VESTING_CONTRACT_ADDRESS =
  '0x7b8041f9c49Cc40A800206D25bC90c712874Ab90' as const;

/** Treasury — fundo de reserva do protocolo */
export const TREASURY_ADDRESS =
  '0xF80DFaAB2CFac368f1986df922E70f847B6e4861' as const;

/** Liquidity Wallet — par de liquidez DEX */
export const LIQUIDITY_WALLET_ADDRESS =
  '0xeF1f2517d65e31E243F451463BbE0AeA90fcF8f2' as const;

/** Community Wallet — recompensas e crescimento da comunidade */
export const COMMUNITY_WALLET_ADDRESS =
  '0xCb6d58B3129167e4D981b8173102d316822711aa' as const;

// ─── Compatibilidade com imports legados ─────────────────────────────────────

/**
 * @deprecated Use NFT_CONTRACT_ADDRESS para clareza.
 * Mantido para compatibilidade com imports existentes que usam CONTRACT_ADDRESS.
 */
export const CONTRACT_ADDRESS = NFT_CONTRACT_ADDRESS;

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const CHAIN_ID = 8453; // Base Mainnet

export const OPENSEA_COLLECTION_URL =
  'https://opensea.io/collection/xray-protocol' as const;

export const BASESCAN_NFT_URL = `https://basescan.org/token/${NFT_CONTRACT_ADDRESS}` as const;
export const BASESCAN_TOKEN_URL = `https://basescan.org/token/${TOKEN_CONTRACT_ADDRESS}` as const;

/** Bloco aproximado do deploy do contrato NFT XRAY na Base */
export const CONTRACT_DEPLOY_BLOCK = 28_000_000n;

// ─── Display Config ──────────────────────────────────────────────────────────

export const FREE_MINT_REAL_LIMIT = 333;
export const FREE_MINT_DISPLAY_MULTIPLIER = 3;
export const PAID_DISPLAY_TOTAL = 1333;
