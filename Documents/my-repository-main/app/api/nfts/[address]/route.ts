import { NextResponse } from 'next/server';
import { fetchNftsForWallet } from '@/src/server/nfts';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { address: string } }) {
  try {
    const address = params.address?.toLowerCase();
    if (!address || !/^0x[0-9a-f]{40}$/i.test(address)) {
      return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
    }

    const { nfts, source } = await fetchNftsForWallet(address);
    return NextResponse.json({ nfts, count: nfts.length, source });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ nfts: [], count: 0, source: 'none', error: message });
  }
}
