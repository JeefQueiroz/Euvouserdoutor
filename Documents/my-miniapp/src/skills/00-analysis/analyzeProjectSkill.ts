import fs from "fs";
import path from "path";
import type { SkillResult } from "../types";

export async function analyzeProjectSkill(): Promise<SkillResult<{ structure: string[] }>> {
  try {
    const root = process.cwd();
    const structure: string[] = [];

    function walk(dir: string, depth = 0) {
      if (depth > 3) return;
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        structure.push(fullPath.replace(root, "") || "/");

        if (stat.isDirectory()) {
          walk(fullPath, depth + 1);
        }
      }
    }

    walk(root);

    return {
      success: true,
      message: "Projeto analisado com sucesso.",
      data: { structure },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao analisar projeto.",
    };
  }
}
