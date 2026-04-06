/**
 * Neynar API Integration
 * Handles user data, verified addresses, and Neynar score
 */

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
const NEYNAR_BASE_URL = "https://api.neynar.com/v2/farcaster";

export interface NeynarUser {
  fid: number;
  username: string;
  display_name?: string;
  pfp_url?: string;
  profile?: {
    bio?: {
      text?: string;
    };
  };
  verified_addresses?: {
    eth_addresses: string[];
    sol_addresses?: string[];
  };
  follower_count: number;
  following_count: number;
  power_badge: boolean;
  score?: number;
}

/**
 * Fetch user data from Neynar by FID
 */
export async function getNeynarUser(fid: number): Promise<NeynarUser | null> {
  if (!NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY not configured");
    return null;
  }

  try {
    const response = await fetch(
      `${NEYNAR_BASE_URL}/user?fid=${fid}`,
      {
        headers: {
          api_key: NEYNAR_API_KEY,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Neynar API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    return data.user as NeynarUser;
  } catch (error) {
    console.error("Error fetching Neynar user:", error);
    return null;
  }
}

/**
 * Fetch multiple users from Neynar by FIDs
 */
export async function getNeynarUsersBulk(
  fids: number[]
): Promise<NeynarUser[]> {
  if (!NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY not configured");
    return [];
  }

  try {
    const fidString = fids.join(",");
    const response = await fetch(
      `${NEYNAR_BASE_URL}/user/bulk?fids=${fidString}`,
      {
        headers: {
          api_key: NEYNAR_API_KEY,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Neynar API error: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();
    return data.users as NeynarUser[];
  } catch (error) {
    console.error("Error fetching Neynar users bulk:", error);
    return [];
  }
}

/**
 * Get verified ETH addresses for a user
 */
export async function getVerifiedAddresses(
  fid: number
): Promise<string[]> {
  const user = await getNeynarUser(fid);
  if (!user || !user.verified_addresses?.eth_addresses) {
    return [];
  }
  return user.verified_addresses.eth_addresses;
}

/**
 * Get Neynar score for a user
 */
export async function getNeynarScore(fid: number): Promise<number> {
  const user = await getNeynarUser(fid);
  return user?.score ?? 0;
}
