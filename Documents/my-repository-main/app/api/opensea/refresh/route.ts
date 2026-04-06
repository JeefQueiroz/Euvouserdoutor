import { NextResponse } from 'next/server';
import { CONTRACT_ADDRESS } from '@/src/constants';

export async function POST(req: Request) {
  try {
    const { fid } = await req.json();

    if (!fid) {
      return NextResponse.json({ error: 'Missing FID' }, { status: 400 });
    }

    // A chave OPENSEA_API_KEY deve estar no seu arquivo .env ou nas variáveis de ambiente da Vercel
    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/base/contract/${CONTRACT_ADDRESS}/nfts/${fid}/refresh`,
      {
        method: 'POST',
        headers: {
          'x-api-key': process.env.OPENSEA_API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`OpenSea API responded with status ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error refreshing OpenSea:', error);
    return NextResponse.json({ error: 'Failed to refresh OpenSea' }, { status: 500 });
  }
}
