import { analyzeProjectSkill } from "../skills/00-analysis/analyzeProjectSkill";
import { envAuditSkill } from "../skills/00-analysis/envAuditSkill";
import { repoMappingSkill } from "../skills/00-analysis/repoMappingSkill";
import { safetyPlanSkill } from "../skills/00-analysis/safetyPlanSkill";

import { loadProfileSkill } from "../skills/profile/loadProfileSkill";
import { generateXraySkill } from "../skills/xray/generateXraySkill";
import { createMintSkill } from "../skills/mint/createMintSkill";

export const skillsRegistry = {
  analyzeProjectSkill,
  envAuditSkill,
  repoMappingSkill,
  safetyPlanSkill,
  loadProfileSkill,
  generateXraySkill,
  createMintSkill,
};

export type SkillRegistry = typeof skillsRegistry;
