import type { MintInput, MintOutput, SkillResult } from "../types";

function buildTokenName(name?: string) {
  return name?.trim() ? name.trim() : "XRAY NFT";
}

export async function createMintSkill(input: MintInput): Promise<SkillResult<MintOutput>> {
  try {
    if (!input.walletAddress) {
      return {
        success: false,
        message: "walletAddress é obrigatório.",
      };
    }

    if (!input.imageUrl) {
      return {
        success: false,
        message: "imageUrl é obrigatório.",
      };
    }

    const tokenName = buildTokenName(input.name);

    const metadata: Record<string, unknown> = {
      name: tokenName,
      description: input.description || "XRAY NFT generated from Farcaster mini app.",
      image: input.imageUrl,
      ...(input.metadata || {}),
    };

    return {
      success: true,
      message: "Dados de mint preparados com sucesso.",
      data: {
        walletAddress: input.walletAddress,
        imageUrl: input.imageUrl,
        tokenName,
        metadata,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro inesperado ao preparar mint.",
    };
  }
}
