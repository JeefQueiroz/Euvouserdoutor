// update-token-urls.mjs
// Corrige os tokenUrls dos NFTs mintados com URL errada.
// Rode com: node update-token-urls.mjs
// Atualiza os NFTs no contrato 0xaC5fd046C7ea0bA5C2081622EdF1B07e28040068
// Requer: OWNER_PRIVATE_KEY e BASE_RPC_URL no .env

import { createWalletClient, createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { config } from 'dotenv';

config({ path: '.env' });
config({ path: '.env.local' });

const CONTRACT_ADDRESS = '0xaC5fd046C7ea0bA5C2081622EdF1B07e28040068';

const ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'string',  name: 'newUrl',  type: 'string'  },
    ],
    name: 'updateTokenUrl',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// ─── TOKENS A CORRIGIR (LISTA ATUALIZADA) ──────────────────────────────────────
const TOKENS = [
  { fid: 1462291, url: 'https://aquamarine-casual-whale-994.mypinata.cloud/ipfs/bafkreieuopyra5eigqdjez4wg6oeao2w7pd7shxoudhonuubam2mjaeb24' },
  { fid: 1060895, url: 'https://aquamarine-casual-whale-994.mypinata.cloud/ipfs/bafybeid46jzhxgdjoqb4uttbn3bqf6dhjbvvoceu3dy55ouenu5jgaxirm' },
  { fid: 1020531, url: 'https://aquamarine-casual-whale-994.mypinata.cloud/ipfs/bafybeiaeijj2mxkhpug4jpbxpkfumie2sztoicjwvqabgiy6hdpudu23wq' },
  { fid: 278104,  url: 'https://aquamarine-casual-whale-994.mypinata.cloud/ipfs/bafybeifqtjo33zbpsvcbdt7v5cf6b6qtvbbbyro3wtcei7jtmf4vhfa4de' },
  { fid: 1115947, url: 'https://aquamarine-casual-whale-994.mypinata.cloud/ipfs/bafybeigfalygzendvljhsjtf5vt7rdqdizs2kgu3wb4tz2ucrpfpvbbqku' },
  { fid: 1076010, url: 'https://aquamarine-casual-whale-994.mypinata.cloud/ipfs/bafybeicc3hxhnyzffta6njodx7tywdipkahw55bxmmpmfx2qaa4jm53a4i' },
];

// ─── SETUP ────────────────────────────────────────────────────────────────────

const ownerKey = process.env.OWNER_PRIVATE_KEY?.trim();
if (!ownerKey || !/^0x[0-9a-fA-F]{64}$/.test(ownerKey)) {
  console.error('❌ OWNER_PRIVATE_KEY ausente ou inválida no .env');
  process.exit(1);
}

const account = privateKeyToAccount(ownerKey);
const rpcUrl  = process.env.BASE_RPC_URL || 'https://mainnet.base.org';

const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl),
});

const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http(rpcUrl),
});

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔧 Iniciando correção de ${TOKENS.length} tokens...`);
  console.log(`👛 Owner: ${account.address}`);
  console.log(`🌐 RPC:   ${rpcUrl}\n`);

  let success = 0;
  let failed  = 0;

  for (const token of TOKENS) {
    try {
      process.stdout.write(`FID ${token.fid} → enviando tx... `);

      const hash = await walletClient.writeContract({
        address:      CONTRACT_ADDRESS,
        abi:          ABI,
        functionName: 'updateTokenUrl',
        args:         [BigInt(token.fid), token.url],
      });

      console.log(`✅ tx: ${hash}`);

      // Aguarda confirmação
      await publicClient.waitForTransactionReceipt({ hash });
      console.log(`   ✔ confirmado`);

      success++;

      // Pequena pausa para evitar rate limit do RPC ou problemas de nonce
      await new Promise(r => setTimeout(r, 1500));

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`❌ ERRO: ${msg}`);
      failed++;
    }
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`✅ Sucesso: ${success} tokens`);
  if (failed > 0) {
    console.log(`❌ Falhas:  ${failed} tokens`);
  }
  console.log(`─────────────────────────────────\n`);
}

main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
