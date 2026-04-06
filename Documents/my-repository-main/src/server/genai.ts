import { GoogleGenAI } from '@google/genai';

function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY (or GOOGLE_API_KEY) is not configured.');
  }
  return apiKey;
}

function isVertexEnabled(): boolean {
  const value = process.env.GOOGLE_GENAI_USE_VERTEX?.trim().toLowerCase();
  return value === 'true' || value === '1' || value === 'yes';
}

function parseServiceAccountJson(raw: string): { client_email?: string; private_key?: string } {
  const trimmed = raw.trim();
  const unwrapped =
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
      ? trimmed.slice(1, -1).trim()
      : trimmed;

  const candidates: string[] = [unwrapped];
  const looksLikeBase64 = !unwrapped.startsWith('{') && /^[A-Za-z0-9+/=\r\n]+$/.test(unwrapped);
  if (looksLikeBase64) {
    try {
      const decoded = Buffer.from(unwrapped, 'base64').toString('utf8').trim();
      candidates.push(decoded);
    } catch {
      // ignore
    }
  }

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as { client_email?: string; private_key?: string };
    } catch {
      // try next
    }
  }

  throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is invalid JSON.');
}

export function createGenAIClient(requireVertex: boolean): GoogleGenAI {
  const vertexEnabled = isVertexEnabled();

  if (requireVertex && !vertexEnabled) {
    throw new Error('Vertex AI is required for this operation (set GOOGLE_GENAI_USE_VERTEX=true).');
  }

  if (vertexEnabled) {
    const project = process.env.VERTEX_PROJECT_ID?.trim();
    // CORREÇÃO: Mudado padrão de 'us-central1' para 'global'
    // Isso permite usar modelos preview como gemini-3.1-flash-image-preview
    const location = process.env.VERTEX_LOCATION?.trim() || 'global';

    if (!project) {
      throw new Error('VERTEX_PROJECT_ID is required when GOOGLE_GENAI_USE_VERTEX=true.');
    }

    const serviceAccountRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
    if (serviceAccountRaw) {
      const parsed = parseServiceAccountJson(serviceAccountRaw);
      if (!parsed.client_email || !parsed.private_key) {
        throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON must include client_email and private_key.');
      }

      return new GoogleGenAI({
        vertexai: true,
        project,
        location,
        googleAuthOptions: {
          credentials: {
            client_email: parsed.client_email,
            private_key: parsed.private_key.replace(/\\n/g, '\n'),
          },
        },
      });
    }

    return new GoogleGenAI({
      vertexai: true,
      project,
      location,
    });
  }

  return new GoogleGenAI({ apiKey: getGeminiApiKey() });
}
