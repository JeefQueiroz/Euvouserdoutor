import { NextResponse } from 'next/server';
import { createPublicClient, http, encodeAbiParameters, keccak256 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { abi, CONTRACT_ADDRESS } from '@/src/constants';
import { pinFileToIpfs, pinJsonToIpfs, parseDataUrl } from '@/src/server/ipfs';
import { Errors, createClient } from '@farcaster/quick-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Vercel Hobby permite máximo 60s

const quickAuthClient = createClient();

function resolveDomain(request: Request): string {
  const envDomain = process.env.QUICK_AUTH_DOMAIN?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Cannot resolve domain.');
  return host;
}

function getPublicClient() {
  return createPublicClient({
    chain: base,
    transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
  });
}

async function isAlreadyMinted(fid: number): Promise<boolean> {
  const client = getPublicClient();
  try {
    // ownerOf é a forma mais direta para saber se o tokenId/FID já existe.
    await client.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: 'ownerOf',
      args: [BigInt(fid)],
    });
    return true;
  } catch (error) {
    const errorChunks = [
      error instanceof Error ? error.message : String(error),
      (error as any)?.shortMessage,
      (error as any)?.details,
      (error as any)?.cause?.message,
      (error as any)?.cause?.shortMessage,
    ]
      .filter(Boolean)
      .map((msg) => String(msg).toLowerCase());

    const isNonexistent = errorChunks.some((message) =>
      message.includes('nonexistent') ||
      message.includes('owner query for nonexistent token') ||
      message.includes('erc721nonexistenttoken') ||
      message.includes('0x7e273289') ||
      message.includes('ownerof') && message.includes('signature')
    );

    if (isNonexistent) return false;

    const fallback = errorChunks[0] || 'Unknown error.';
    // Falha de RPC/infra deve falhar fechado para evitar falso negativo de "não mintado".
    throw new Error(`Mint status check failed: ${fallback}`);
  }
}

async function getMintPriceWei(): Promise<bigint> {
  try {
    const client = getPublicClient();
    // Tenta currentMintPrice primeiro (preço dinâmico), fallback para mintPrice fixo
    try {
      const price = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: 'currentMintPrice',
      }) as bigint;
      return price;
    } catch {
      const price = await client.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: 'mintPrice',
      }) as bigint;
      return price;
    }
  } catch {
    return 0n; // free mint fallback
  }
}

async function signMintPayload(
  fid: number,
  imageIpfsUrl: string,
  minter: string,
): Promise<`0x${string}`> {
  const signerKey = process.env.SIGNER_PRIVATE_KEY?.trim();
  if (!signerKey) throw new Error('SIGNER_PRIVATE_KEY not configured.');

  const account = privateKeyToAccount(signerKey as `0x${string}`);
  const client = getPublicClient();

  // Valida se a chave privada configurada corresponde ao verifier on-chain.
  const verifierAddress = (await client.readContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: 'verifierAddress',
  }) as string).toLowerCase();

  if (account.address.toLowerCase() !== verifierAddress) {
    throw new Error(
      `SIGNER_PRIVATE_KEY does not match verifierAddress. signer=${account.address} verifier=${verifierAddress}`
    );
  }

  // Hash deve coincidir EXATAMENTE com o contrato:
  // keccak256(abi.encode(msg.sender, inputFid, url, block.chainid, address(this)))
  const messageHash = keccak256(
    encodeAbiParameters(
      [
        { type: 'address' },
        { type: 'uint256' },
        { type: 'string' },
        { type: 'uint256' },
        { type: 'address' },
      ],
      [
        minter as `0x${string}`,
        BigInt(fid),
        imageIpfsUrl,
        BigInt(base.id),
        CONTRACT_ADDRESS as `0x${string}`,
      ]
    )
  );

  const signature = await account.signMessage({
    message: { raw: messageHash },
  });

  console.log('[prepare] signed mint:', { fid, imageIpfsUrl, minter, signer: account.address });
  return signature;
}

export async function POST(
  request: Request,
  { params }: { params: { fid: string } }
) {
  const fid = Number(params.fid);
  if (!fid || isNaN(fid)) {
    return NextResponse.json({ error: 'Invalid FID.' }, { status: 400 });
  }

  // 1. Autenticação via Quick Auth
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing token.' }, { status: 401 });
  }
  try {
    const token = authorization.split(' ')[1];
    const domain = resolveDomain(request);
    const payload = await quickAuthClient.verifyJwt({ token, domain });
    const tokenFid = Number(payload.sub);
    if (tokenFid !== fid) {
      return NextResponse.json({ error: 'FID mismatch.' }, { status: 403 });
    }
  } catch (error) {
    if (error instanceof Errors.InvalidTokenError) {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
    }
    throw error;
  }

  // 2. Verifica se já foi mintado (retorna 409 para o frontend tratar)
  try {
    if (await isAlreadyMinted(fid)) {
      return NextResponse.json({ error: 'Already minted.' }, { status: 409 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Mint status check failed.';
    return NextResponse.json({ error: message }, { status: 503 });
  }

  // 3. Parse do body
  const body = await request.json().catch(() => ({}));
  const { minter, imageDataUrl, metadata: frontendMetadata } = body as {
    minter?: string;
    imageDataUrl?: string;
    metadata?: any;
  };

  if (!minter || !/^0x[a-fA-F0-9]{40}$/.test(minter)) {
    return NextResponse.json({ error: 'Invalid minter address.' }, { status: 400 });
  }
  if (!imageDataUrl?.startsWith('data:')) {
    return NextResponse.json({ error: 'imageDataUrl is required.' }, { status: 400 });
  }

  const jwt = process.env.PINATA_JWT?.trim();
  if (!jwt) {
    return NextResponse.json({ error: 'PINATA_JWT not configured.' }, { status: 500 });
  }

  try {
    // 4. Upload da imagem para IPFS
    console.log('[prepare] uploading image to IPFS for fid:', fid);
    const { mimeType, bytes } = parseDataUrl(imageDataUrl);
    const ext = mimeType.includes('jpeg') || mimeType.includes('jpg') ? 'jpg' : 'png';
    const imageResult = await pinFileToIpfs({
      jwt,
      filename: `xray-${fid}.${ext}`,
      bytes,
      mimeType,
    });

    // 5. Upload dos metadados para IPFS
    const metadata = {
      name: `X-RAY DNA #${fid}`,
      description: `Radiographic identity for FID ${fid} on Base Network.`,
      image: imageResult.ipfsUri,
      external_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://x-rayv2.vercel.app'}`,
      attributes: [
        { trait_type: 'FID', value: fid },
        { trait_type: 'Network', value: 'Base' },
        { trait_type: 'Collection', value: 'X-RAY Protocol' },
        ...(frontendMetadata?.generatedAt ? [{ trait_type: 'Generated At', value: frontendMetadata.generatedAt }] : []),
      ],
    };
    const metaResult = await pinJsonToIpfs({
      jwt,
      name: `xray-metadata-${fid}.json`,
      content: metadata,
    });

    // 6. Assina o payload de mint com a MESMA url enviada ao contrato.
    const signature = await signMintPayload(fid, imageResult.ipfsUri, minter);

    // 7. Busca o preço de mint on-chain
    const mintPriceWei = await getMintPriceWei();

    console.log('[prepare] ready to mint:', {
      fid,
      imageIpfs: imageResult.ipfsUri,
      metaIpfs: metaResult.ipfsUri,
      mintPriceWei: mintPriceWei.toString(),
    });

    return NextResponse.json({
      success: true,
      fid,
      imageIpfsUrl: imageResult.ipfsUri,
      metadataIpfsUrl: metaResult.ipfsUri,
      image: {
        ipfs: imageResult.ipfsUri,
        https: imageResult.gatewayUrl,
      },
      signature,
      mintPriceWei: mintPriceWei.toString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Prepare failed.';
    console.error('[prepare] error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
