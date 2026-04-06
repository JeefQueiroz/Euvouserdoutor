import { RISK_LEVELS, TOKEN_DISTRIBUTION, type RiskLevelKey, type RouletteOutcome } from '@/src/lib/roulette-config';

export type SpinEconomy = {
  burn: number;
  stakingPool: number;
  treasury: number;
};

export type SpinExecutionResult = {
  result: string;
  label: string;
  reward: number;
  isLegendary: boolean;
  riskLevel: RiskLevelKey;
  economy: SpinEconomy;
};

function roundTo(value: number, decimals = 4): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function normalizeOutcomes(outcomes: RouletteOutcome[]): RouletteOutcome[] {
  const total = outcomes.reduce((sum, outcome) => sum + outcome.probability, 0);
  if (total <= 0) return outcomes;
  return outcomes.map((outcome) => ({
    ...outcome,
    probability: outcome.probability / total,
  }));
}

function pickOutcome(outcomes: RouletteOutcome[], random: () => number): RouletteOutcome {
  const normalized = normalizeOutcomes(outcomes);
  let roll = random();
  for (const outcome of normalized) {
    if (roll < outcome.probability) return outcome;
    roll -= outcome.probability;
  }
  return normalized[normalized.length - 1];
}

export function executeSpin(
  riskLevel: RiskLevelKey,
  userHasNft = false,
  random: () => number = Math.random,
): SpinExecutionResult {
  const config = RISK_LEVELS[riskLevel];
  const cost = config.cost;

  const economy: SpinEconomy = {
    burn: roundTo(cost * TOKEN_DISTRIBUTION.burn),
    stakingPool: roundTo(cost * TOKEN_DISTRIBUTION.stakingPool),
    treasury: roundTo(cost * TOKEN_DISTRIBUTION.treasury),
  };

  const legendaryRoll = random();
  if (legendaryRoll < 0.01) {
    return {
      result: 'LEGENDARY',
      label: 'Legendary Radiograph!',
      reward: roundTo(cost * 10),
      isLegendary: true,
      riskLevel,
      economy,
    };
  }

  let outcomes = [...config.outcomes];
  if (userHasNft) {
    outcomes = outcomes.map((outcome) => {
      const boostedProbability = outcome.reward > 0
        ? outcome.probability * 1.05
        : outcome.probability * 0.97;
      const boostedReward = outcome.reward > 0
        ? roundTo(outcome.reward * 1.02)
        : outcome.reward;
      return {
        ...outcome,
        probability: boostedProbability,
        reward: boostedReward,
      };
    });
  }

  const outcome = pickOutcome(outcomes, random);
  return {
    result: outcome.label,
    label: outcome.label,
    reward: roundTo(outcome.reward),
    isLegendary: false,
    riskLevel,
    economy,
  };
}
