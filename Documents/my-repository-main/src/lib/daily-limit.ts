export const SPIN_LIMITS = {
  default: 3,
  nftHolder: 5,
  staker: 7,
} as const;

export type SpinAllowance = {
  allowed: boolean;
  spinsLeft: number;
  limit: number;
};

export function utcDateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function resolveSpinLimit(userHasNft: boolean, userIsStaker: boolean): number {
  if (userIsStaker) return SPIN_LIMITS.staker;
  if (userHasNft) return SPIN_LIMITS.nftHolder;
  return SPIN_LIMITS.default;
}

export function canSpin(spinsToday: number, userHasNft: boolean, userIsStaker: boolean): SpinAllowance {
  const limit = resolveSpinLimit(userHasNft, userIsStaker);
  const safeSpinsToday = Number.isFinite(spinsToday) && spinsToday > 0 ? Math.floor(spinsToday) : 0;
  const spinsLeft = Math.max(0, limit - safeSpinsToday);
  return {
    allowed: safeSpinsToday < limit,
    spinsLeft,
    limit,
  };
}
