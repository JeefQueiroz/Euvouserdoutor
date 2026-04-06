import { NextResponse } from 'next/server';
import { buildXrayPrompt } from '@/src/xray/prompt';
import { computeDeterministicRarity } from '@/src/xray/rarity';
import { buildCollectionTokenName, XRAY_COLLECTION } from '@/src/xray/collection';
import type { XrayRequestBody, SubjectNature, SubjectNatureInput } from '@/src/xray/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt';
const GENERATION_TIMEOUT_MS = 180_000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveSubjectNature(
  input: SubjectNatureInput | undefined,
  pfpUrl?: string
): SubjectNature {
  if (input && input !== 'auto') return input;

  // Heurística simples baseada na URL da imagem
  if (pfpUrl) {
    const lower = pfpUrl.toLowerCase();
    if (lower.includes('robot') || lower.includes('mech') || lower.includes('cyber'))
      return 'mechanical';
    if (lower.includes('hybrid') || lower.includes('cyborg')) return 'hybrid';
  }

  return 'biological'; // fallback padrão
}

function buildPollinationsUrl(prompt: string, seed: number, width = 1024, height = 1024): string {
  const encoded = encodeURIComponent(prompt);
  return `${POLLINATIONS_BASE}/${encoded}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;
}

async function fetchImageAsDataUrl(
  url: string,
  timeoutMs: number
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'image/*' },
    });

    if (!res.ok) {
      throw new Error(`Image generation failed (${res.status})`);
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/')) {
      throw new Error(`Unexpected content type: ${contentType}`);
    }

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${base64}`;
  } finally {
    clearTimeout(timer);
  }
}

function buildMetadata(
  fid: number,
  rarityTier: string,
  rarityScore: number,
  imageDataUrl: string,
  externalReference?: string
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://x-rayv2.vercel.app';

  return {
    name: buildCollectionTokenName(fid, rarityTier),
    description: `Radiographic identity for FID ${fid} — ${XRAY_COLLECTION.name}. Rarity: ${rarityTier}.`,
    image: imageDataUrl,
    external_url: externalReference || appUrl,
    attributes: [
      { trait_type: 'FID',        value: fid },
      { trait_type: 'Class',      value: rarityTier },
      { trait_type: 'Rarity',     value: rarityTier },
      { trait_type: 'Score',      value: rarityScore },
      { trait_type: 'Collection', value: XRAY_COLLECTION.name },
      { trait_type: 'Network',    value: XRAY_COLLECTION.network },
      { trait_type: 'Generator',  value: 'pollinations-free-tier' },
    ],
  };
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(
  request: Request,
  { params }: { params: { fid: string } }
) {
  try {
    const fid = Number(params.fid);
    if (!fid || !Number.isFinite(fid) || fid <= 0) {
      return NextResponse.json({ error: 'Invalid FID.' }, { status: 400 });
    }

    const body = (await request.json().catch(() => ({}))) as XrayRequestBody;

    const subjectImageUrl = body.pfpUrl || body.subjectImageUrl;
    const subjectNatureInput: SubjectNatureInput = body.subjectNature || 'auto';
    const externalReference = body.externalReference;

    if (!subjectImageUrl && !body.subjectImageBase64) {
      return NextResponse.json(
        { error: 'pfpUrl or subjectImageBase64 is required.' },
        { status: 400 }
      );
    }

    // 1. Resolve subject nature
    const resolvedNature = resolveSubjectNature(subjectNatureInput, subjectImageUrl);

    // 2. Build source hint from URL
    const sourceHint = subjectImageUrl
      ? `Source image URL: ${subjectImageUrl}`
      : 'Source: base64 image provided';

    // 3. Compute deterministic rarity
    const reference = subjectImageUrl || `base64:${fid}`;
    const rarity = computeDeterministicRarity(fid, reference);

    // 4. Build prompt
    const prompt = buildXrayPrompt(resolvedNature, sourceHint, 'medium');

    // 5. Generate image via Pollinations (free tier)
    const pollinationsUrl = buildPollinationsUrl(
      `[XRAY of: ${subjectImageUrl || 'subject'}] ${prompt}`,
      rarity.seed
    );

    const imageDataUrl = await fetchImageAsDataUrl(pollinationsUrl, GENERATION_TIMEOUT_MS);

    // 6. Build metadata
    const metadata = buildMetadata(
      fid,
      rarity.tier,
      rarity.score,
      imageDataUrl,
      externalReference
    );

    // 7. Analysis result
    const analysis = {
      resolvedNature,
      confidence: subjectNatureInput === 'auto' ? 'low' : 'high',
      reason:
        subjectNatureInput === 'auto'
          ? 'Nature inferred from URL heuristics'
          : `Nature explicitly set to ${resolvedNature}`,
    };

    return NextResponse.json({
      success: true,
      fid,
      image: imageDataUrl,
      metadata,
      analysis,
      rarity,
      capabilities: {
        provider: 'pollinations-free-tier',
        model: 'flux',
        cost: 'USD 0',
        morphologyFidelity: 'partial (prompt-guided)',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Generation failed.';
    console.error('[xray/fid] error:', message);

    const isTimeout = message.toLowerCase().includes('abort') || message.toLowerCase().includes('timeout');
    return NextResponse.json(
      { error: isTimeout ? 'Generation timed out. Try again.' : message },
      { status: isTimeout ? 504 : 500 }
    );
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { fid: string } }
) {
  const fid = Number(params.fid);
  if (!fid || !Number.isFinite(fid)) {
    return NextResponse.json({ error: 'Invalid FID.' }, { status: 400 });
  }

  const reference = `fid:${fid}`;
  const rarity = computeDeterministicRarity(fid, reference);

  return NextResponse.json({
    fid,
    rarity,
    collection: XRAY_COLLECTION,
    tokenName: buildCollectionTokenName(fid, rarity.tier),
    note: 'Use POST with pfpUrl to generate the X-RAY image.',
  });
}
