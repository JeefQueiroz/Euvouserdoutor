/**
 * src/xray/types.ts
 * Types compartilhados pelo X-RAY Core Engine.
 */

export type SubjectNature = 'biological' | 'mechanical' | 'hybrid' | 'abstract';

export type SubjectNatureInput = SubjectNature | 'auto';

export interface XrayRequestBody {
  pfpUrl?: string;
  subjectImageUrl?: string;
  subjectImageBase64?: string;
  subjectNature?: SubjectNatureInput;
  externalReference?: string;
}

export interface SubjectAnalysis {
  resolvedNature: SubjectNature;
  confidence: 'low' | 'medium' | 'high';
  reason: string;
}

export interface RarityResult {
  tier: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  score: number;
  seed: number;
}

export interface XrayMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
}

export interface XrayGenerationResult {
  success: boolean;
  fid: number;
  image: string;
  metadata: XrayMetadata;
  analysis: SubjectAnalysis;
  rarity: RarityResult;
  capabilities: {
    provider: string;
    model: string;
    cost: string;
    morphologyFidelity: string;
  };
}
