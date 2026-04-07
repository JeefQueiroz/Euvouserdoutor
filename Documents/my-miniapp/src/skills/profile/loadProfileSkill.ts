import type { ProfileData, SkillResult } from "../types";
import { env } from "../../lib/env";

function getRequiredEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }
  return value;
}

export async function loadProfileSkill(fid: number): Promise<SkillResult<ProfileData>> {
  try {
    if (!fid || Number.isNaN(fid)) {
      return {
        success: false,
        message: "FID inválido.",
      };
    }

    const apiKey = getRequiredEnv(env.server.neynarApiKey, "NEYNAR_API_KEY");
    const url = `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        api_key: apiKey,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        message: `Erro ao buscar perfil no Neynar: ${response.status} ${errorText}`,
      };
    }

    const json = await response.json();
    const user = json?.users?.[0];

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado no Neynar.",
      };
    }

    return {
      success: true,
      message: "Perfil carregado com sucesso.",
      data: {
        fid: user.fid,
        username: user.username,
        displayName: user.display_name,
        pfpUrl: user.pfp_url,
        bio: user.profile?.bio?.text,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro inesperado ao carregar perfil.",
    };
  }
}
