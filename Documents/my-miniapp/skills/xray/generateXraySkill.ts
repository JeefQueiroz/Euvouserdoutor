import type { SkillResult, XrayInput, XrayOutput } from "../types";

export async function generateXraySkill(input: XrayInput): Promise<SkillResult<XrayOutput>> {
  try {
    if (!input?.fid) {
      return {
        success: false,
        message: "FID é obrigatório para gerar o XRAY.",
      };
    }

    const response = await fetch(`/api/xray/${input.fid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fid: input.fid,
        username: input.username,
        pfpUrl: input.pfpUrl,
      }),
    });

    const raw = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: raw?.error || `Falha ao gerar XRAY: ${response.status}`,
        data: {
          fid: input.fid,
          raw,
        },
      };
    }

    return {
      success: true,
      message: "XRAY gerado com sucesso.",
      data: {
        fid: input.fid,
        imageUrl: raw?.imageUrl || raw?.url || raw?.image,
        raw,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro inesperado ao gerar XRAY.",
    };
  }
}
