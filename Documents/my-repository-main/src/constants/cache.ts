/**
 * Cache Keys - Centralized constants to avoid hardcoding and cache invalidation issues
 * Versioning: Increment version suffix when cache structure changes
 */

export const CACHE_KEYS = {
  // Leaderboard cache
  LB_TOP_CACHE: 'lb:top:cache:v2',
  
  // Rate limiting
  RATE_LIMIT_PREFIX: 'ratelimit',
  
  // Generation
  XRAY_GEN_RL_PREFIX: 'xray:gen:rl',
  
  // Leaderboard FIDs set
  LB_FIDS_SET: 'lb:fids',
  
  // Leaderboard entry prefix
  LB_ENTRY_PREFIX: 'lb',
} as const;

/**
 * Get the leaderboard cache key
 */
export function getLeaderboardCacheKey(): string {
  return CACHE_KEYS.LB_TOP_CACHE;
}

/**
 * Get the leaderboard entry key for a specific FID
 */
export function getLeaderboardEntryKey(fid: number): string {
  return `${CACHE_KEYS.LB_ENTRY_PREFIX}:${fid}`;
}

/**
 * Get the rate limit key for a specific path and IP
 */
export function getRateLimitKey(path: string, ip: string, bucket: number): string {
  return `${CACHE_KEYS.RATE_LIMIT_PREFIX}:${path}:${ip}:${bucket}`;
}

/**
 * Get the generation rate limit key for a specific FID
 */
export function getGenerationRateLimitKey(fid: number, hour: string): string {
  return `${CACHE_KEYS.XRAY_GEN_RL_PREFIX}:${fid}:${hour}`;
}
