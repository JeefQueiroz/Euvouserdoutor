import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { CONTRACT_ADDRESS } from '@/src/constants';

export const dynamic = 'force-dynamic';
export const maxDuration = 15;

const TRANSFER_EVENT = {
  anonymous: false,
  inputs: [
    { indexed: true,  internalType: 'address', name: 'from',    type: 'address' },
    { indexed: true,  internalType: 'address', name: 'to',      type: 'address' },
    { indexed: true,  internalType: 'uint256', name: 'tokenId', type: 'uint256' },
  ],
  name: 'Transfer',
  type: 'event',
} as const;

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

// ~1 bloco por 2s na Base
// 1_200  blocos ≈ 40 min  (live)
// 36_000 blocos ≈ 20h     (today)
// 50_000 blocos ≈ 28h     (recent, janela principal)
const BLOCKS_LIVE    = 1_200n;
const BLOCKS_TODAY   = 36_000n;
const BLOCKS_RECENT  = 50_000n;
const BLOCKS_WIDE    = 200_000n;

function shortAddr(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function timeAgo(timestampSeconds: number): string {
  const diff = Math.floor(Date.now() / 1000) - timestampSeconds;
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export async function GET() {
  try {
    const client = createPublicClient({
      chain:     base,
      transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
    });

    const currentBlock = await client.getBlockNumber();

    // ── UMA única chamada RPC de logs ──────────────────────────────────────
    // Tenta janela recente (50k blocos ≈ 28h).
    // Se vier vazio, expande para wide (200k blocos ≈ 70h) — ainda 1 call.
    let fromBlock = currentBlock > BLOCKS_RECENT ? currentBlock - BLOCKS_RECENT : 0n;
    let logs = await client.getLogs({
      address:   CONTRACT_ADDRESS as `0x${string}`,
      event:     TRANSFER_EVENT,
      fromBlock,
      toBlock:   'latest',
    });

    if (logs.length === 0 && currentBlock > BLOCKS_WIDE) {
      fromBlock = currentBlock - BLOCKS_WIDE;
      logs = await client.getLogs({
        address:   CONTRACT_ADDRESS as `0x${string}`,
        event:     TRANSFER_EVENT,
        fromBlock,
        toBlock:   'latest',
      });
    }

    // ── Filtros client-side (sem RPC adicional) ────────────────────────────
    const liveThreshold  = currentBlock > BLOCKS_LIVE  ? currentBlock - BLOCKS_LIVE  : 0n;
    const todayThreshold = currentBlock > BLOCKS_TODAY ? currentBlock - BLOCKS_TODAY : 0n;

    const liveLogs  = logs.filter((l) => (l.blockNumber ?? 0n) >= liveThreshold);
    const todayMints = logs.filter(
      (l) =>
        (l.blockNumber ?? 0n) >= todayThreshold &&
        String(l.args.from || '').toLowerCase() === ZERO_ADDRESS
    );

    // Pega os 8 mais recentes para exibição
    const recent = [...logs].reverse().slice(0, 8);

    const activities = await Promise.all(
      recent.map(async (log) => {
        try {
          const block   = await client.getBlock({ blockNumber: log.blockNumber! });
          const from    = log.args.from    as string;
          const to      = log.args.to      as string;
          const tokenId = log.args.tokenId as bigint;
          const isMint  = from.toLowerCase() === ZERO_ADDRESS;

          return {
            address:     shortAddr(to),
            fullAddress: to,
            tokenId:     Number(tokenId),
            action:      isMint ? 'Identity Active' : 'Key Synced',
            time:        timeAgo(Number(block.timestamp)),
            tx:          log.transactionHash,
          };
        } catch {
          return null;
        }
      })
    );

    return NextResponse.json({
      activities: activities.filter(Boolean),
      stats: {
        liveScans:      liveLogs.length,
        mutationsToday: todayMints.length,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return NextResponse.json({
      activities: [],
      stats: { liveScans: 0, mutationsToday: 0 },
      error: message,
    }, { status: 200 });
  }
}
