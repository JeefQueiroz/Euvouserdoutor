import { SkillInput, SkillResult } from "../types";

export async function generateXraySkill(input: SkillInput): Promise<SkillResult> {
  try {
    if (!input.fid || !input.imageUrl) return { success: false, message: "FID e imageUrl são obrigatórios." };

    return {
      success: true,
      message: "Payload de geração montado.",
      data: { fid: input.fid, sourceImage: input.imageUrl, model: "gemini-pro-vision" },
    };
  } catch (error) {
    return { success: false, message: "Erro na geração do X-RAY." };
  }
}
