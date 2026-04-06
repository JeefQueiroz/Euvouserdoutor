import { NextRequest, NextResponse } from 'next/server';
import { fetchNftsForWallets, normalizeEthAddress } from '@/src/server/nfts';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawAddresses = searchParams.getAll('address');
    // skip-indexer=1 forces on-chain read (bypasses SimpleHash stale data)
    const skipIndexer = searchParams.get('skip-indexer') === '1';

    const addresses = Array.from(
      new Set(
        rawAddresses
          .map((value) => normalizeEthAddress(value))
          .filter((value): value is string => Boolean(value))
      )
    );

    if (!addresses.length) {
      return NextResponse.json({ nfts: [], count: 0, total: 0, sources: [] });
    }

    const { nfts, onchainWalletHits } = await fetchNftsForWallets(addresses, skipIndexer);
    return NextResponse.json({
      nfts,
      count: nfts.length,
      total: nfts.length,
      sources: onchainWalletHits > 0 ? ['onchain'] : ['none'],
      walletsScanned: addresses.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json(
      { nfts: [], count: 0, total: 0, sources: ['none'], error: message },
      { status: 500 },
    );
  }
}
