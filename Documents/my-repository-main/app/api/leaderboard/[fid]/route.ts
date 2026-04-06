import { NextResponse } from 'next/server';
import { getDb, getUserProfile } from '@/src/server/db';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { fid: string } }) {
  try {
    if (!/^\d+$/.test(params.fid)) {
      return NextResponse.json({ error: 'Invalid FID' }, { status: 400 });
    }

    const fid = Number(params.fid);
    if (!Number.isFinite(fid) || fid <= 0) {
      return NextResponse.json({ error: 'Invalid FID' }, { status: 400 });
    }

    const profile = await getUserProfile(fid);
    const db = getDb();
    const [profilesRowResult, leaderboardRowResult] = await Promise.all([
      db
        .from('profiles')
        .select('username, pfp_url, points, nft_score, total_points, genesis_nft, secondary_nfts, updated_at')
        .eq('fid', fid)
        .maybeSingle(),
      db
        .from('leaderboard')
        .select('username, pfp_url, base_points, nft_count, nft_score, total_points, updated_at')
        .eq('fid', fid)
        .maybeSingle(),
    ]);
    const { kv } = await import('@vercel/kv');
    const kvEntry = await kv.get<{
      fid?: number;
      username?: string;
      pfpUrl?: string | null;
      pfp_url?: string | null;
      points?: number;
      hasNft?: boolean;
      nftCount?: number;
      nft_count?: number;
      nftScore?: number;
      totalPoints?: number;
      total_points?: number;
      updatedAt?: string;
    }>(`lb:${fid}`);

    const profilesRow = profilesRowResult.data;
    const leaderboardRow = leaderboardRowResult.data;

    if (!profile && !kvEntry && !profilesRow && !leaderboardRow) {
      return NextResponse.json({ fid, points: 0, hasNft: false, found: false });
    }

    const profilePoints = Number(profile?.base_points || 0);
    const leaderboardPoints = Number(leaderboardRow?.base_points || 0);
    const kvPoints = Number(kvEntry?.points || 0);
    const points = Math.max(profilePoints, leaderboardPoints, kvPoints);

    const profileNftCount = Number(profile?.nft_count || 0);
    const leaderboardNftCount = Number(leaderboardRow?.nft_count || 0);
    const profilesNftCount = Number(profilesRow?.secondary_nfts || 0) + (profilesRow?.genesis_nft ? 1 : 0);
    const kvNftCount = Number(kvEntry?.nftCount ?? kvEntry?.nft_count ?? 0);
    const nftCount = Math.max(profileNftCount, leaderboardNftCount, profilesNftCount, kvNftCount);

    const profileNftScore = Number(profile?.nft_score || 0);
    const profilesNftScore = Number(profilesRow?.nft_score || 0);
    const leaderboardNftScore = Number(leaderboardRow?.nft_score || 0);
    const kvNftScore = Number(kvEntry?.nftScore || 0);
    const nftScore = Math.max(profileNftScore, profilesNftScore, leaderboardNftScore, kvNftScore);

    const profileTotal = Number(profile?.total_points || 0);
    const profilesTotal = Number(profilesRow?.total_points || 0);
    const leaderboardTotal = Number(leaderboardRow?.total_points || 0);
    const kvTotal = Number(kvEntry?.totalPoints ?? kvEntry?.total_points ?? (points + nftScore));
    const totalPoints = Math.max(profileTotal, profilesTotal, leaderboardTotal, kvTotal, points + nftScore);

    return NextResponse.json({
      fid,
      username: profile?.username ?? profilesRow?.username ?? leaderboardRow?.username ?? kvEntry?.username ?? null,
      pfpUrl: profile?.pfp_url ?? profilesRow?.pfp_url ?? leaderboardRow?.pfp_url ?? kvEntry?.pfpUrl ?? kvEntry?.pfp_url ?? null,
      points,
      hasNft: nftCount > 0,
      nftCount,
      nftScore,
      totalPoints,
      updatedAt:
        profile?.profile_synced_at ??
        profilesRow?.updated_at ??
        leaderboardRow?.updated_at ??
        kvEntry?.updatedAt ??
        null,
      found: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
