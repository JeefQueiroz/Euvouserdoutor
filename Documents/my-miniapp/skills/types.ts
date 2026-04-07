export type SkillResult<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type ProfileData = {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
};

export type XrayInput = {
  fid: number;
  username?: string;
  pfpUrl?: string;
};

export type XrayOutput = {
  fid: number;
  imageUrl?: string;
  raw?: unknown;
};

export type MintInput = {
  walletAddress: string;
  imageUrl: string;
  name?: string;
  description?: string;
  metadata?: Record<string, unknown>;
};

export type MintOutput = {
  walletAddress: string;
  imageUrl: string;
  tokenName: string;
  metadata: Record<string, unknown>;
};
