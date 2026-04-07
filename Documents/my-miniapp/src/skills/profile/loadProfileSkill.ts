import { SkillInput, SkillResult } from "../types";

export async function loadProfileSkill(input: SkillInput): Promise<SkillResult> {
  try {
    if (!input.fid) return { success: false, message: "FID é obrigatório." };
    
    return {
      success: true,
      message: "Perfil do Farcaster carregado.",
      data: {
        fid: input.fid,
        username: input.username || `user_${input.fid}`,
        pfpUrl: `https://farcaster.network/pfp/${input.fid}.png`
      },
    };
  } catch (error) {
    return { success: false, message: "Erro ao carregar perfil." };
  }
}
