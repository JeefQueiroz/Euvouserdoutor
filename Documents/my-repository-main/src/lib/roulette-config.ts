export type RiskLevelKey = 'LOW' | 'MEDIUM' | 'HIGH';

export type RouletteOutcome = {
  label: string;
  reward: number;
  probability: number;
};

export type RiskLevelConfig = {
  label: string;
  cost: number;
  outcomes: RouletteOutcome[];
  maxLoss: number;
};

export const RISK_LEVELS: Record<RiskLevelKey, RiskLevelConfig> = {
  LOW: {
    label: 'Low Risk',
    cost: 5,
    outcomes: [
      { label: 'Win +2 XRAY', reward: 2, probability: 0.7 },
      { label: 'Win +3 XRAY', reward: 3, probability: 0.25 },
      { label: 'No change', reward: 0, probability: 0.05 },
    ],
    maxLoss: 0,
  },
  MEDIUM: {
    label: 'Medium Risk',
    cost: 20,
    outcomes: [
      { label: 'Double! +20 XRAY', reward: 20, probability: 0.4 },
      { label: 'Break even', reward: 0, probability: 0.1 },
      { label: 'Lose 50%', reward: -10, probability: 0.5 },
    ],
    maxLoss: 0.5,
  },
  HIGH: {
    label: 'High Risk',
    cost: 50,
    outcomes: [
      { label: '5x JACKPOT! +250 XRAY', reward: 250, probability: 0.15 },
      { label: '2x Win +100 XRAY', reward: 100, probability: 0.2 },
      { label: 'Lose All', reward: -50, probability: 0.65 },
    ],
    maxLoss: 1,
  },
};

export const TOKEN_DISTRIBUTION = {
  burn: 0.25,
  stakingPool: 0.25,
  treasury: 0.5,
} as const;
