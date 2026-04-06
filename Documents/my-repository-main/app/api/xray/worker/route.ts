import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { Errors, createClient } from '@farcaster/quick-auth';
import { XRAY_PROMPT } from '@/src/xray/prompt';
import { createGenAIClient } from '@/src/server/genai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const GEMINI_TIMEOUT = 55_000;
const quickAuthClient = createClient();

const GEMINI_MODELS_API_KEY = [
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp',
];

const GEMINI_MODELS_VERTEX = [
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp',
];

function resolveDomain(request: Request): string {
  const envDomain = process.env.QUICK_AUTH_DOMAIN?.trim();
  if (envDomain) return envDomain;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) throw new Error('Cannot resolve domain.');
  return host;
}

async function requireAuth(request: Request): Promise<number> {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    const error = new Error('Missing token.');
    (error as Error & { status?: number }).status = 401;
    throw error;
  }
  try {
    const token = authorization.split(' ')[1];
    const payload = await quickAuthClient.verifyJwt({ token, domain: resolveDomain(request) });
    const fid = Number(payload.sub);
    if (!Number.isFinite(fid) || fid <= 0) {
      const error = new Error('Invalid FID in token.');
      (error as Error & { status?: number }).status = 400;
      throw error;
    }
    return fid;
  } catch (error) {
    if (error instanceof Errors.InvalidTokenError) {
      const invalid = new Error('Invalid token.');
      (invalid as Error & { status?: number }).status = 401;
      throw invalid;
    }
    throw error;
  }
}

async function checkGenerationRateLimit(fid: number): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    const hour = new Date().toISOString().slice(0, 13);
    const key = `xray:gen:rl:${fid}:${hour}`;
    const count = await kv.incr(key);
    if (count === 1) {
      try {
        await kv.expire(key, 3600);
      } catch (expireError) {
        console.warn('[worker] Failed to set expiration on rate limit key:', expireError);
      }
    }
    if (count > 3) {
      const error = new Error('Generation rate limit: max 3 per hour.');
      (error as Error & { status?: number }).status = 429;
      throw error;
    }
  } catch (error) {
    if ((error as Error & { status?: number }).status === 429) throw error;
    console.warn('[worker] rate limit check failed, allowing request.');
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
    promise
      .then((value) => { clearTimeout(timer); resolve(value); })
      .catch((err)  => { clearTimeout(timer); reject(err); });
  });
}

function generatedImageToDataUrl(response: unknown): string {
  const candidate = (response as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          inlineData?: { mimeType?: string; data?: string };
          text?: string;
        }>;
      };
      finishReason?: string;
      safetyRatings?: Array<{ category: string; probability: string }>;
    }>;
  }).candidates?.[0];

  if (candidate?.finishReason === 'SAFETY') {
    const blocked = candidate.safetyRatings
      ?.filter((r) => r.probability !== 'NEGLIGIBLE')
      .map((r) => `${r.category}: ${r.probability}`)
      .join(', ');
    throw new Error(`Gemini blocked by safety filter: ${blocked || 'unknown'}`);
  }

  const parts = candidate?.content?.parts;
  const textPart = parts?.find((p) => typeof p.text === 'string');
  if (textPart?.text) {
    console.warn('[worker] Gemini returned text instead of image:', textPart.text.slice(0, 300));
  }

  const imagePart = parts?.find((p) => typeof p.inlineData?.data === 'string');
  const base64 = imagePart?.inlineData?.data;

  if (!base64) {
    throw new Error(
      `No image returned. FinishReason: ${candidate?.finishReason ?? 'unknown'}. ` +
      `TextContent: ${textPart?.text?.slice(0, 150) ?? 'none'}`
    );
  }

  const mimeType = imagePart?.inlineData?.mimeType || 'image/png';
  return `data:${mimeType};base64,${base64}`;
}

function isVertexEnabled(): boolean {
  const value = process.env.GOOGLE_GENAI_USE_VERTEX?.trim().toLowerCase();
  return value === 'true' || value === '1' || value === 'yes';
}

function getModelCandidates(): string[] {
  const envModel = process.env.GEMINI_IMAGE_MODEL?.trim();

  if (isVertexEnabled()) {
    const models = [...GEMINI_MODELS_VERTEX];
    if (envModel && !models.includes(envModel)) models.unshift(envModel);
    return [...new Set(models)];
  }

  const models = [...GEMINI_MODELS_API_KEY];
  if (envModel && !models.includes(envModel)) models.unshift(envModel);
  return [...new Set(models)];
}

async function fetchImageBuffer(url: string): Promise<Buffer> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Invalid pfpUrl: not a valid URL.');
  }
  if (parsed.protocol !== 'https:') {
    throw new Error('Invalid pfpUrl: only https:// allowed.');
  }

  const hostname = parsed.hostname.toLowerCase();
  const blockedPatterns = [
    /^localhost$/,
    /^127\.\d+\.\d+\.\d+$/,
    /^10\.\d+\.\d+\.\d+$/,
    /^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/,
    /^192\.168\.\d+\.\d+$/,
    /^169\.254\.\d+\.\d+$/,
    /^::1$/,
    /^0\.0\.0\.0$/,
    /^metadata\.google\.internal$/,
    /\.internal$/,
    /\.local$/,
  ];
  if (blockedPatterns.some((pattern) => pattern.test(hostname))) {
    throw new Error('Invalid pfpUrl: private/internal hosts not allowed.');
  }

  let resolvedUrl = url;
  if (hostname.includes('imagedelivery.net')) {
    resolvedUrl = url.replace(/\/[^/]+$/, '/original');
  } else if (hostname.includes('cloudinary.com') && url.includes('/upload/')) {
    resolvedUrl = url.replace(/\/upload\/[^/]+\//, '/upload/w_1024,c_limit,f_png/');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(resolvedUrl, {
      signal: controller.signal,
      headers: { Accept: 'image/*' },
      cache: 'no-store',
    }).catch(() =>
      fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'image/*' },
        cache: 'no-store',
      })
    );

    if (!response.ok) throw new Error(`Image fetch failed (${response.status}).`);

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) throw new Error('Fetched content is not an image.');

    const contentLength = Number(response.headers.get('content-length') || 0);
    if (contentLength > 10 * 1024 * 1024) {
      throw new Error('Image too large (max 10MB).');
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length > 10 * 1024 * 1024) {
      throw new Error('Image too large after download (max 10MB).');
    }
    return buffer;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateWithPrompt(
  ai: ReturnType<typeof createGenAIClient>,
  imageBase64: string,
  userSubject: string,
  model: string,
): Promise<string> {
  const fullPrompt = `${XRAY_PROMPT}\n\nSubject instruction: ${userSubject}`;

  const response = await withTimeout(
    ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/png', data: imageBase64 } },
            { text: fullPrompt },
          ],
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    }),
    GEMINI_TIMEOUT,
  );

  return generatedImageToDataUrl(response);
}

async function generateWithModelFallback(
  ai: ReturnType<typeof createGenAIClient>,
  imageBase64: string,
  userSubject: string,
): Promise<string> {
  const candidateModels = getModelCandidates();
  const errors: string[] = [];

  for (const model of candidateModels) {
    try {
      console.log(`[worker] Trying model: ${model}`);
      return await generateWithPrompt(ai, imageBase64, userSubject, model);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${model}: ${message}`);
      console.warn(`[worker/${model}] falhou:`, message);
    }
  }

  throw new Error(`All models failed:\n${errors.join('\n')}`);
}

export async function POST(req: Request) {
  try {
    let fid: number;
    try {
      fid = await requireAuth(req);
    } catch (error) {
      const err = error as Error & { status?: number };
      return NextResponse.json({ error: err.message }, { status: err.status ?? 401 });
    }

    try {
      await checkGenerationRateLimit(fid);
    } catch (error) {
      const err = error as Error & { status?: number };
      return NextResponse.json({ error: err.message }, { status: err.status ?? 429 });
    }

    const body = (await req.json().catch(() => ({}))) as { pfpUrl?: string; prompt?: string };
    if (!body.pfpUrl) {
      return NextResponse.json({ error: 'pfpUrl is required.' }, { status: 400 });
    }

    console.log(`[worker] fid=${fid} starting generation`);
    const ai = createGenAIClient(false);
    const buffer = await fetchImageBuffer(body.pfpUrl);

    const normalized = await sharp(buffer)
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      })
      .png({ quality: 100, compressionLevel: 1 })
      .toBuffer();

    const imageBase64 = normalized.toString('base64');
    const userSubject = body.prompt?.trim() || 'Apply the X-RAY transformation to this profile picture.';
    const imageDataUrl = await generateWithModelFallback(ai, imageBase64, userSubject);
    return NextResponse.json({ imageDataUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Worker failure';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
