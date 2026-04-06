import { resolveIpfsUrl } from '@/src/lib/ipfs';

export function parseDataUrl(dataUrl: string): { mimeType: string; bytes: Uint8Array } {
  const match = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!match) {
    throw new Error('Formato de imagem inválido. Esperado data URL base64.');
  }

  const mimeType = match[1];
  const base64 = match[2];
  const buffer = Buffer.from(base64, 'base64');
  return { mimeType, bytes: new Uint8Array(buffer) };
}

const IPFS_GATEWAYS = [
  'https://gateway.pinata.cloud/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://dweb.link/ipfs/',
  'https://ipfs.io/ipfs/',
] as const;

export function ipfsGatewayUrl(cid: string, gatewayIndex = 0): string {
  const gateway = IPFS_GATEWAYS[gatewayIndex % IPFS_GATEWAYS.length];
  return `${gateway}${cid}`;
}

export function resolveIpfsUrlWithFallback(url: string): string {
  if (!url.startsWith('ipfs://')) return url;
  const cid = url.replace('ipfs://', '');
  return ipfsGatewayUrl(cid, 0);
}

export function resolveProtocolUrl(url: string): string {
  if (url.startsWith('ipfs://')) {
    return resolveIpfsUrlWithFallback(url);
  }
  if (url.startsWith('ar://')) {
    const txId = url.replace('ar://', '');
    return `https://arweave.net/${txId}`;
  }
  return url;
}

export async function pinFileToIpfs(params: {
  jwt: string;
  filename: string;
  bytes: Uint8Array;
  mimeType: string;
}): Promise<{ cid: string; ipfsUri: string; gatewayUrl: string }> {
  const form = new FormData();
  const normalizedBytes = new Uint8Array(params.bytes);
  const blob = new Blob([normalizedBytes], { type: params.mimeType });
  form.append('file', blob, params.filename);

  const metadata = {
    name: params.filename,
  };
  form.append('pinataMetadata', JSON.stringify(metadata));

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.jwt}`,
    },
    body: form,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.IpfsHash) {
    const details = payload?.error?.details ?? payload?.message ?? 'Pinata file upload failed';
    throw new Error(`Falha no upload da imagem para IPFS: ${details}`);
  }

  const cid = String(payload.IpfsHash);
  return {
    cid,
    ipfsUri: `ipfs://${cid}`,
    gatewayUrl: ipfsGatewayUrl(cid, 0),
  };
}

export async function pinJsonToIpfs(params: {
  jwt: string;
  name: string;
  content: unknown;
}): Promise<{ cid: string; ipfsUri: string; gatewayUrl: string }> {
  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pinataMetadata: {
        name: params.name,
      },
      pinataContent: params.content,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.IpfsHash) {
    const details = payload?.error?.details ?? payload?.message ?? 'Pinata JSON upload failed';
    throw new Error(`Falha no upload da metadata para IPFS: ${details}`);
  }

  const cid = String(payload.IpfsHash);
  return {
    cid,
    ipfsUri: `ipfs://${cid}`,
    gatewayUrl: ipfsGatewayUrl(cid, 0),
  };
}
