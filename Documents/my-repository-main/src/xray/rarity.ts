import type { RarityResult } from './types';

function fnv1a(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function buildDeterministicSeed(fid: number, reference: string): number {
  const hash = fnv1a(`${fid}:${reference}`);
  return hash % 1_000_000_000;
}

export function computeDeterministicRarity(fid: number, reference: string): RarityResult {
  const seed = buildDeterministicSeed(fid, reference);
  const score = seed % 10_000;

  if (score >= 9950) return { tier: 'Legendary', score, seed };
  if (score >= 9600) return { tier: 'Epic', score, seed };
  if (score >= 8500) return { tier: 'Rare', score, seed };
  return { tier: 'Common', score, seed };
}
