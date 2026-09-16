import crypto from 'node:crypto';
import fs from 'node:fs/promises';

export const defaultSources = [
  {
    name: 'Metrópoles Saúde',
    url: 'https://www.metropoles.com/saude',
    category: 'Saúde & Ciência',
    allowedSections: ['saúde', 'ciência'],
    allowedPathPrefixes: ['/saude/'],
  },
  {
    name: 'CNN Brasil Saúde',
    url: 'https://www.cnnbrasil.com.br/saude/',
    category: 'Saúde Pública',
    allowedSections: ['saúde'],
    allowedPathPrefixes: ['/saude/'],
  },
  {
    name: 'Só Notícia Boa Educação',
    url: 'https://www.sonoticiaboa.com.br/educacao',
    category: 'Educação',
    allowedSections: ['educação'],
    allowedPathPrefixes: ['/educacao/'],
  },
];

const trackingParameters = new Set(['fbclid', 'gclid', 'mc_cid', 'mc_eid', 'ref']);

export function normalize(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
}

export function canonicalizeUrl(value, base) {
  const url = new URL(value, base);
  url.hash = '';
  for (const key of [...url.searchParams.keys()]) {
    if (key.toLowerCase().startsWith('utm_') || trackingParameters.has(key.toLowerCase())) {
      url.searchParams.delete(key);
    }
  }
  url.pathname = url.pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
  url.searchParams.sort();
  return url.toString();
}

export function dateFromUrl(url) {
  const match = url.match(/\/(20\d{2})\/(\d{2})\/(\d{2})\//);
  return match ? new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00Z`) : null;
}

function decodeHtml(value = '') {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1] ?? null;
}

function metadataFromJsonLd(html) {
  const values = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      for (const node of nodes) {
        values.push(node);
        if (Array.isArray(node?.['@graph'])) values.push(...node['@graph']);
      }
    } catch {}
  }
  return values.find(node => node?.articleSection || node?.datePublished || node?.mainEntityOfPage) ?? {};
}

export function parseArticleMetadata(html, requestedUrl) {
  let canonical = null;
  let section = '';
  let publishedAt = null;

  for (const tag of html.matchAll(/<(?:meta|link)\b[^>]*>/gi)) {
    const markup = tag[0];
    const rel = attribute(markup, 'rel')?.toLowerCase();
    const property = (attribute(markup, 'property') ?? attribute(markup, 'name'))?.toLowerCase();
    const content = attribute(markup, 'content');
    if (rel === 'canonical' && attribute(markup, 'href')) canonical = attribute(markup, 'href');
    if (property === 'article:section' && content) section = content;
    if (['article:published_time', 'datepublished', 'pubdate'].includes(property) && content) publishedAt = content;
  }

  const jsonLd = metadataFromJsonLd(html);
  const jsonLdCanonical = typeof jsonLd.mainEntityOfPage === 'string'
    ? jsonLd.mainEntityOfPage
    : jsonLd.mainEntityOfPage?.['@id'];
  canonical ||= jsonLd.url ?? jsonLdCanonical ?? null;
  section ||= Array.isArray(jsonLd.articleSection) ? jsonLd.articleSection.join(' ') : jsonLd.articleSection ?? '';
  publishedAt ||= jsonLd.datePublished ?? null;

  return {
    canonicalUrl: canonical ? canonicalizeUrl(canonical, requestedUrl) : null,
    section: decodeHtml(section),
    publishedAt: publishedAt ? new Date(publishedAt) : null,
  };
}

export function extractListingCandidates(html, base, source, limit = 12) {
  const items = [];
  const seen = new Set();
  for (const match of html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const title = decodeHtml(match[2]);
    if (title.length < 45 || title.length > 220 || /inscreva-se|newsletter|whatsapp|metrópolestv|receba no seu email/i.test(title)) continue;
    try {
      const url = canonicalizeUrl(match[1], base);
      if (/youtube\.com|whatsapp\.com|facebook\.com|instagram\.com|\/newsletter|\/tag\//i.test(url)) continue;
      const key = `${url}|${normalize(title)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({ title, url, source });
    } catch {}
    if (items.length >= limit) break;
  }
  return items;
}

function categoryIsSupported(metadata, source) {
  if (!metadata.section || !metadata.canonicalUrl) return false;
  const section = normalize(metadata.section);
  const sectionMatches = source.allowedSections.some(value => section.includes(normalize(value)));
  const path = new URL(metadata.canonicalUrl).pathname.toLowerCase();
  const pathMatches = source.allowedPathPrefixes.some(prefix => path.startsWith(prefix.toLowerCase()));
  return sectionMatches && pathMatches;
}

export async function validateCandidate(candidate, fetchImpl = fetch, now = new Date()) {
  const response = await fetchImpl(candidate.url, { headers: { 'user-agent': 'EuvouserDoutorEditorialQueue/2.0' } });
  if (!response.ok) return null;
  const metadata = parseArticleMetadata(await response.text(), candidate.url);
  if (!categoryIsSupported(metadata, candidate.source)) return null;
  if (!metadata.publishedAt || Number.isNaN(metadata.publishedAt.valueOf())) return null;
  const ageDays = (now.valueOf() - metadata.publishedAt.valueOf()) / 86400000;
  if (ageDays < -1 || ageDays > 7) return null;
  return {
    title: candidate.title,
    url: metadata.canonicalUrl,
    source: candidate.source.name,
    category: candidate.source.category,
    publishedAt: metadata.publishedAt.toISOString(),
    status: 'Pendente de apuração primária',
  };
}

export async function fetchCandidates({ sources = defaultSources, fetchImpl = fetch, now = new Date() } = {}) {
  const found = [];
  const seen = new Set();
  for (const source of sources) {
    try {
      const response = await fetchImpl(source.url, { headers: { 'user-agent': 'EuvouserDoutorEditorialQueue/2.0' } });
      if (!response.ok) continue;
      const listing = extractListingCandidates(await response.text(), source.url, source);
      for (const candidate of listing) {
        const preliminaryKey = `${candidate.url}|${normalize(candidate.title)}`;
        if (seen.has(preliminaryKey)) continue;
        const validated = await validateCandidate(candidate, fetchImpl, now);
        if (!validated) continue;
        const key = `${canonicalizeUrl(validated.url)}|${normalize(validated.title)}`;
        if (seen.has(key)) continue;
        seen.add(preliminaryKey);
        seen.add(key);
        found.push(validated);
      }
    } catch (error) {
      console.warn(`Fonte indisponível: ${source.name} (${error.message})`);
    }
  }
  return found;
}

export function selectUniqueCandidates(current, candidates) {
  const seenUrls = new Set(current.map(item => canonicalizeUrl(item.url)));
  const seenTitles = new Set(current.map(item => normalize(item.title)));
  const unique = [];
  for (const item of candidates.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))) {
    const url = canonicalizeUrl(item.url);
    const title = normalize(item.title);
    if (seenUrls.has(url) || seenTitles.has(title)) continue;
    seenUrls.add(url);
    seenTitles.add(title);
    unique.push({ ...item, url });
  }
  return unique;
}

export async function runEditorialQueue({
  queuePath = 'src/editorialQueue.json',
  reportPath = 'reports/editorial-queue-latest.md',
  sources = defaultSources,
  fetchImpl = fetch,
  now = new Date(),
} = {}) {
  const current = JSON.parse(await fs.readFile(queuePath, 'utf8').catch(() => '[]'));
  const candidates = await fetchCandidates({ sources, fetchImpl, now });
  const additions = selectUniqueCandidates(current, candidates).slice(0, 20).map(item => ({
    ...item,
    id: `queue_${normalize(item.title)}_${crypto.createHash('sha1').update(item.url).digest('hex').slice(0, 8)}`,
    discoveredAt: now.toISOString(),
    requiredChecks: ['fonte primária', 'data', 'autoria', 'amostra ou estágio', 'revisão por pares', 'limitações', 'imagem e direitos'],
  }));

  if (additions.length === 0) return { changed: false, additions, total: current.length };

  const next = [...current, ...additions].slice(-200);
  const report = `# Fila editorial automática\n\nAtualizada em ${now.toISOString()} pelo GitHub Actions.\n\nA rotina coleta pautas recentes de fontes de descoberta e não publica textos automaticamente. Cada item deve passar por apuração primária antes de virar notícia.\n\n## Novas pautas\n\n${additions.map((item, index) => `${index + 1}. **${item.title}** - ${item.source} - [fonte de descoberta](${item.url}) - ${item.status}`).join('\n')}\n\n## Critérios obrigatórios\n\nFonte original, data, autoria, estudo ou documento primário, amostra ou estágio, revisão por pares, limitações, conflitos de interesse, imagem autorizada e ausência de duplicidade.\n`;
  await fs.writeFile(queuePath, `${JSON.stringify(next, null, 2)}\n`);
  await fs.writeFile(reportPath, report);
  return { changed: true, additions, total: next.length };
}
