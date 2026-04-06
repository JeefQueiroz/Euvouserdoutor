import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/src/server/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

function parseLimit(raw: string | null): number {
  const parsed = Number(raw || 100);
  if (!Number.isFinite(parsed)) return 100;
  return Math.min(Math.max(Math.floor(parsed), 1), 100);
}

function parseMode(raw: string | null): 'points' | 'nft' {
  return raw === 'nft' ? 'nft' : 'points';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams.get('limit'));
    const mode = parseMode(searchParams.get('mode'));
    const offset = Math.max(Number(searchParams.get('offset') ?? 0), 0);

    const dbResult = await getLeaderboard({ mode, limit, offset });
    const entries = dbResult.entries;
    const total = dbResult.total;

    const users = entries.map((entry, index) => ({
      fid: entry.fid,
      username: entry.username,
      pfpUrl: entry.pfp_url,
      // Keep `points` aligned with ranking score shown in UI.
      points: entry.total_points,
      basePoints: entry.base_points,
      nftCount: entry.nft_count,
      nftScore: entry.nft_score,
      totalPoints: entry.total_points,
      rank: offset + index + 1,
      neynarScore: entry.neynar_score,
      hasNft: entry.nft_count > 0,
    }));

    return NextResponse.json({
      users,
      total,
      mode,
      limit,
      offset,
      hasMore: offset + users.length < total,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
