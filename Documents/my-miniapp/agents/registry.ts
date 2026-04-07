import { createMintSkill } from "../skills/mint/createMintSkill";
import { loadProfileSkill } from "../skills/profile/loadProfileSkill";
import { generateXraySkill } from "../skills/xray/generateXraySkill";

export const skillsRegistry = {
  loadProfileSkill,
  generateXraySkill,
  createMintSkill,
};

export type SkillRegistry = typeof skillsRegistry;
