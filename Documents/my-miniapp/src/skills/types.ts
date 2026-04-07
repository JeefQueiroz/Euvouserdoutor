export type SkillInput = {
  fid?: number;
  walletAddress?: string;
  imageUrl?: string;
  username?: string;
  metadata?: Record<string, unknown>;
};

export type SkillResult = {
  success: boolean;
  message: string;
  data?: unknown;
};
