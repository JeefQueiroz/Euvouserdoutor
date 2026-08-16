import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const sources = [
  { name: 'Metrópoles Saúde', url: 'https://www.metropoles.com/saude', category: 'Saúde & Ciência' },
  { name: 'CNN Brasil Saúde', url: 'https://www.cnnbrasil.com.br/saude/', category: 'Saúde Pública' },
  { name: 'Só Notícia Boa Educação', url: 'https://www.sonoticiaboa.com.br/educacao', category: 'Educação' },
  { name: 'Só Notícia Boa Tecnologia', url: 'https://www.sonoticiaboa.com.br/tecnologia', category: 'Tecnologia Médica' },
];
const queuePath = 'src/editorialQueue.json';
const reportPath = 'reports/editorial-queue-latest.md';

function normalize(value = '') {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 120);
}

function dateFromUrl(url) {
  const match = url.match(/\/(20\d{2})\/(\d{2})\/(\d{2})\//);
  return match ? new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00Z`) : null;
}

function extract(html, base, source) {
  const items = [];
  const pageDate = html.match(/(?:article:published_time|datePublished|pubdate)[^>]*content=["']([^"']+)["']/i)?.[1] ?? html.match(/<time[^>]+datetime=["']([^"']+)["']/i)?.[1] ?? null;
  const fallbackDate = pageDate ? new Date(pageDate) : null;
  for (const match of html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const title = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (title.length < 45 || title.length > 220 || /inscreva-se|newsletter|whatsapp|métrópólestv|metrópolestv|receba no seu email/i.test(title)) continue;
    try {
      const url = new URL(match[1], base).toString();
      if (/youtube\.com|whatsapp\.com|facebook\.com|instagram\.com|\/newsletter|\/tag\//i.test(url)) continue;
      const itemDate = dateFromUrl(url) ?? fallbackDate;
      if (!itemDate || Number.isNaN(itemDate.valueOf())) continue;
      const ageDays = (Date.now() - itemDate.valueOf()) / 86400000;
      if (ageDays < -1 || ageDays > 7 || items.some(item => item.url === url)) continue;
      items.push({ title, url, source: source.name, category: source.category, publishedAt: itemDate.toISOString(), status: 'Pendente de apuração primária' });
    } catch {}
    if (items.length >= 20) break;
  }
  return items;
}

async function fetchCandidates() {
  const found = [];
  for (const source of sources) {
    try {
      const response = await fetch(source.url, { headers: { 'user-agent': 'EuvouserDoutorEditorialQueue/1.0' } });
      if (!response.ok) continue;
      found.push(...extract(await response.text(), source.url, source));
    } catch (error) {
      console.warn(`Fonte indisponível: ${source.name} (${error.message})`);
    }
  }
  return found;
}

const current = JSON.parse(await fs.readFile(queuePath, 'utf8').catch(() => '[]'));
const seen = new Set(current.flatMap(item => [item.url, normalize(item.title)]));
const candidates = (await fetchCandidates())
  .filter(item => !seen.has(item.url) && !seen.has(normalize(item.title)))
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

const additions = candidates.slice(0, 20).map(item => ({
  ...item,
  id: `queue_${normalize(item.title)}_${crypto.createHash('sha1').update(item.url).digest('hex').slice(0, 8)}`,
  discoveredAt: new Date().toISOString(),
  requiredChecks: ['fonte primária', 'data', 'autoria', 'amostra ou estágio', 'revisão por pares', 'limitações', 'imagem e direitos'],
}));

const next = [...current, ...additions].slice(-200);
await fs.writeFile(queuePath, `${JSON.stringify(next, null, 2)}\n`);
const report = `# Fila editorial automática\n\nAtualizada em ${new Date().toISOString()} pelo GitHub Actions.\n\nA rotina coleta pautas recentes de fontes de descoberta e não publica textos automaticamente. Cada item deve passar por apuração primária antes de virar notícia.\n\n## Novas pautas\n\n${additions.length ? additions.map((item, index) => `${index + 1}. **${item.title}** — ${item.source} — [fonte de descoberta](${item.url}) — ${item.status}`).join('\n') : 'Nenhuma pauta nova encontrada nas fontes monitoradas.'}\n\n## Critérios obrigatórios\n\nFonte original, data, autoria, estudo ou documento primário, amostra ou estágio, revisão por pares, limitações, conflitos de interesse, imagem autorizada e ausência de duplicidade.\n`;
await fs.writeFile(reportPath, report);
console.log(`Fila atualizada: ${additions.length} novas pautas; ${next.length} itens armazenados.`);
