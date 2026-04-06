export const XRAY_COLLECTION = {
  name: 'X-RAY Core Engine',
  symbol: 'XRAY',
  network: 'Base',
  maxSupply: 10000,
  rarityDistribution: {
    Common: '85.00%',
    Rare: '11.00%',
    Epic: '3.50%',
    Legendary: '0.50%',
  },
} as const;

export function buildCollectionTokenName(fid: number, rarityTier: string): string {
  return `X-RAY DNA #${fid} [${rarityTier}]`;
}
