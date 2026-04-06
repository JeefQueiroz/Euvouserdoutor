import { NextResponse } from 'next/server';
import { base } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { abi, CONTRACT_ADDRESS } from '@/src/constants';

export const dynamic = 'force-dynamic';

function getPublicClient() {
  return createPublicClient({
    chain: base,
    transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
  });
}

export async function GET() {
  try {
    const total = await getPublicClient().readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: 'totalSupply',
    });

    return NextResponse.json({ count: Number(total as bigint) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch mint count';
    console.error('mint/count error:', message);
    return NextResponse.json({ count: 0, error: message }, { status: 200 });
  }
}
