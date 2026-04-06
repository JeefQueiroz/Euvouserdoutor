/**
 * Scoring System
 * Calculates user points based on streak, NFTs, and other metrics
 */

export interface UserScore {
  streak: number;
  nftCount: number;
  neynarScore: number;
  totalPoints: number;
  breakdown: {
    streakPoints: number;
    nftPoints: number;
    neynarBonus: number;
  };
}

/**
 * Calculate total points for a user
 * Formula: (streak * 10) + (nfts_count * 5) + (neynar_score * 0.1)
 */
export function calculateScore(
  streak: number,
  nftCount: number,
  neynarScore: number = 0
): UserScore {
  const streakPoints = Math.max(0, streak) * 10;
  const nftPoints = Math.max(0, nftCount) * 5;
  const neynarBonus = Math.max(0, neynarScore) * 0.1;

  const totalPoints = Math.floor(streakPoints + nftPoints + neynarBonus);

  return {
    streak: Math.max(0, streak),
    nftCount: Math.max(0, nftCount),
    neynarScore: Math.max(0, neynarScore),
    totalPoints,
    breakdown: {
      streakPoints,
      nftPoints,
      neynarBonus: Math.floor(neynarBonus),
    },
  };
}

/**
 * Calculate streak based on check-in dates
 */
export function calculateStreak(
  lastCheckinDate: Date | null,
  currentDate: Date = new Date()
): number {
  if (!lastCheckinDate) {
    return 0;
  }

  const lastDate = new Date(lastCheckinDate);
  lastDate.setHours(0, 0, 0, 0);

  const today = new Date(currentDate);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // If last check-in was today, streak continues
  if (lastDate.getTime() === today.getTime()) {
    return -1; // Signal: already checked in today
  }

  // If last check-in was yesterday, streak continues
  if (lastDate.getTime() === yesterday.getTime()) {
    return 1; // Signal: continue streak
  }

  // Otherwise, streak is broken
  return 0; // Signal: reset streak
}

/**
 * Determine if user can check in today
 */
export function canCheckInToday(lastCheckinDate: Date | null): boolean {
  if (!lastCheckinDate) {
    return true;
  }

  const lastDate = new Date(lastCheckinDate);
  lastDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return lastDate.getTime() !== today.getTime();
}

/**
 * Get week number from date
 */
export function getWeekNumber(date: Date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Get day of week (0 = Monday, 6 = Sunday)
 */
export function getDayOfWeek(date: Date = new Date()): number {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

/**
 * Format score for display
 */
export function formatScore(score: number): string {
  if (score >= 1000000) {
    return `${(score / 1000000).toFixed(1)}M`;
  }
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}K`;
  }
  return score.toString();
}
