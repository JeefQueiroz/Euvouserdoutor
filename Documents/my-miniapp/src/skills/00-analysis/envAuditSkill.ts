import type { SkillResult } from "../types";

export async function envAuditSkill(): Promise<
  SkillResult<{
    issues: string[];
    duplicatedLike: string[];
    publicRiskLike: string[];
  }>
> {
  try {
    const issues: string[] = [];
    const duplicatedLike: string[] = [];
    const publicRiskLike: string[] = [];

    if (process.env.NEXT_PUBLIC_DEVELOPER_FID?.includes("==")) {
      issues.push("NEXT_PUBLIC_DEVELOPER_FID parece conter '==' e deve ser normalizado.");
    }

    const maybeDuplicated = [
      "NOTIFICATIONS_API_KEY",
      "NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY",
      "NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY",
      "NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_URL",
      "VERTEX_PROJECT_ID",
      "VERTEX_LOCATION",
    ];

    duplicatedLike.push(...maybeDuplicated);

    const maybePublicRisk = [
      "NEXT_PUBLIC_SUPABASE_POSTGRES_DATABASE",
      "NEXT_PUBLIC_SUPABASE_POSTGRES_HOST",
      "NEXT_PUBLIC_SUPABASE_POSTGRES_PASSWORD",
      "NEXT_PUBLIC_SUPABASE_POSTGRES_PRISMA_URL",
      "NEXT_PUBLIC_SUPABASE_POSTGRES_URL",
      "NEXT_PUBLIC_SUPABASE_POSTGRES_URL_NON_POOLING",
      "NEXT_PUBLIC_SUPABASE_POSTGRES_USER",
      "NEXT_PUBLIC_SUPABASE_SUPABASE_JWT_SECRET",
      "NEXT_PUBLIC_SUPABASE_SUPABASE_SECRET_KEY",
      "NEXT_PUBLIC_SUPABASE_SUPABASE_SERVICE_ROLE_KEY",
    ];

    publicRiskLike.push(...maybePublicRisk);

    if ((process.env.OPENAI_API_KEY || "").startsWith("sk-")) {
      issues.push("OPENAI_API_KEY presente no ambiente; manter somente no servidor.");
    }

    return {
      success: true,
      message: "Auditoria de env concluída.",
      data: {
        issues,
        duplicatedLike,
        publicRiskLike,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao auditar env.",
    };
  }
}
