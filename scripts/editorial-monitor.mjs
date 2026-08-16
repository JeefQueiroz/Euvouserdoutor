import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const sources = [
  { name: 'Metrópoles Saúde', url: 'https://www.metropoles.com/saude', category: 'Saúde & Ciência' },
  { name: 'CNN Brasil Saúde', url: 'https://www.cnnbrasil.com.br/saude/', category: 'Saúde Pública' },
  { name: 'Só Notícia Boa Educação', url: 'https://www.sonoticiaboa.com.br/educacao', category: 'Educação' },
  { name: 'Só Notícia Boa Tecnologia', url: 'https://www.sonoticiaboa.com.br/tecnologia', category: 'Tecnologia Médica' },
];
const sourceCode = await fs.readFile('src/pages/News.jsx', 'utf8');
const blogCode = await fs.readFile('src/pages/BlogPost.jsx', 'utf8');
const existingKeys = new Set([...sourceCode.matchAll(/id:\s*["']([^"']+)["']/g), ...blogCode.matchAll(/([a-z0-9_]+):\s*\{/g)].map(match => normalize(match[1])));
const current = await import('../src/autoPosts.jsx').catch(() => ({ autoPosts: [] }));
for (const post of current.autoPosts ?? []) existingKeys.add(normalize(post.id));

function normalize(value) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100); }
function extract(html, base) {
  const items = [];
  const publishedAt = html.match(/(?:article:published_time|datePublished|pubdate)[^>]*content=["']([^"']+)["']/i)?.[1] ?? html.match(/<time[^>]+datetime=["']([^"']+)["']/i)?.[1] ?? html.match(/20\d{2}-\d{2}-\d{2}/)?.[0] ?? null;
  const publishedDate = publishedAt ? new Date(publishedAt) : null;
  const isRecent = publishedDate && !Number.isNaN(publishedDate.valueOf()) && (Date.now() - publishedDate.valueOf()) <= 7 * 24 * 60 * 60 * 1000;
  for (const match of html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const title = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (title.length < 45 || title.length > 220 || /inscreva-se|newsletter|whatsapp|métrópólestv|metrópolestv|receba no seu email/i.test(title)) continue;
    try {
      const url = new URL(match[1], base).toString();
      if (/youtube\.com|whatsapp\.com|facebook\.com|instagram\.com|\/newsletter|\/tag\//i.test(url)) continue;
      const urlDateParts = url.match(/\/(20\d{2})\/(\d{2})\/(\d{2})\//);
      const itemDate = urlDateParts ? new Date(`${urlDateParts[1]}-${urlDateParts[2]}-${urlDateParts[3]}T00:00:00Z`) : publishedDate;
      const itemIsRecent = itemDate && !Number.isNaN(itemDate.valueOf()) && (Date.now() - itemDate.valueOf()) <= 7 * 24 * 60 * 60 * 1000;
      if (itemIsRecent && !items.some(item => item.url === url)) items.push({ title, url, publishedAt: itemDate.toISOString() });
    } catch {}
    if (items.length >= 10) break;
  }
  return items;
}
async function fetchCandidates() {
  const found = [];
  for (const source of sources) {
    const response = await fetch(source.url, { headers: { 'user-agent': 'EuvouserDoutorEditorialBot/1.0' } });
    if (!response.ok) continue;
    const html = await response.text();
    for (const item of extract(html, source.url)) found.push({ ...item, source: source.name, category: source.category });
  }
  return found;
}
async function generateDraft(candidate) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY não configurada');
  const prompt = `Você é o editor científico do EuvouserDoutor. Crie uma matéria original em português brasileiro a partir desta pauta de descoberta. Não copie título, frases ou estrutura da fonte. Não invente dados. Se a fonte primária, DOI, amostra ou estágio não estiverem disponíveis, escreva claramente "Pendente de verificação" e não trate a pauta como fato estabelecido. Retorne JSON com title, subtitle, body, category, image, imageCaption, imageCredit, sourceUrl, primarySourceUrl, editorialScore. O body deve conter introdução, subtítulos, "Por que isso importa?", "Atenção: o que o estudo não mostra", limitações, "O que vem agora" e "Sobre o estudo". Assine a matéria como EuvouserDoutor - Jeff Queiroz.\n\nPauta: ${candidate.title}\nFonte: ${candidate.url}\nCategoria: ${candidate.category}`;
  const response = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' }, body: JSON.stringify({ model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini', temperature: 0.2, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: 'Produza jornalismo factual, acessível, sem clickbait e sem aconselhamento médico individual.' }, { role: 'user', content: prompt }] }) });
  if (!response.ok) throw new Error(`Falha no provedor de IA: ${response.status}`);
  const json = await response.json();
  return JSON.parse(json.choices?.[0]?.message?.content ?? '{}');
}
const candidates = (await fetchCandidates()).filter(item => !existingKeys.has(normalize(item.title))).sort((a, b) => b.title.length - a.title.length);
const selected = candidates[0];
if (!selected) { console.log('Nenhuma pauta nova encontrada.'); process.exit(0); }
if (process.env.DRY_RUN === '1') { console.log(JSON.stringify({ selected, candidateCount: candidates.length }, null, 2)); process.exit(0); }
const draft = await generateDraft(selected);
if (!draft.primarySourceUrl || draft.primarySourceUrl === 'Pendente de verificação' || Number(draft.editorialScore ?? 0) < 70) { console.log('Pauta retida: fonte primária ou qualidade insuficiente.'); process.exit(0); }
const id = `auto_${normalize(draft.title ?? selected.title)}_${crypto.createHash('sha1').update(selected.url).digest('hex').slice(0, 8)}`;
const post = { id, title: draft.title, subtitle: draft.subtitle, cat: draft.category ?? selected.category, date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(new Date()), readTime: '8 min', img: draft.image ?? '/jeff-queiroz-eu-vou-ser-doutor.png', target: id, featured: true, body: draft.body, imgCaption: draft.imageCaption ?? 'Imagem editorial do EuvouserDoutor.', imgCredit: draft.imageCredit ?? 'Crédito pendente de confirmação', sourceUrl: draft.sourceUrl ?? selected.url, primarySourceUrl: draft.primarySourceUrl };
const next = [...(current.autoPosts ?? []), post].slice(-80);
const output = `import React from 'react';\n\nexport const AutoPostContent = ({ markdown }) => (\n  <div className="space-y-5">\n    {markdown.split(/\\n{2,}/).map((block, index) => {\n      const text = block.trim();\n      if (!text) return null;\n      if (text.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold text-white mt-10 mb-4">{text.slice(3)}</h2>;\n      if (text.startsWith('> ')) return <blockquote key={index} className="border-l-4 border-[#4F8CFF] pl-5 text-[#CBD5E1] italic">{text.slice(2)}</blockquote>;\n      return <p key={index}>{text}</p>;\n    })}\n  </div>\n);\n\nexport const autoPosts = ${JSON.stringify(next, null, 2)};\n`;
await fs.writeFile('src/autoPosts.jsx', output);
console.log(`Nova matéria automática preparada: ${post.id}`);
