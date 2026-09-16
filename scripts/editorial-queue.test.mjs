import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  canonicalizeUrl,
  runEditorialQueue,
  selectUniqueCandidates,
  validateCandidate,
} from './editorial-queue-lib.mjs';

const now = new Date('2026-09-15T12:00:00.000Z');

function response(body, status = 200) {
  return new Response(body, { status, headers: { 'content-type': 'text/html' } });
}

test('canonicaliza URLs e remove parâmetros de rastreamento', () => {
  assert.equal(
    canonicalizeUrl('https://example.com/noticia/?utm_source=x&b=2&a=1#trecho'),
    'https://example.com/noticia?a=1&b=2',
  );
});

test('deduplica URL e título entre fontes no mesmo lote', () => {
  const candidates = [
    { title: 'Uma pauta editorial suficientemente longa para validação', url: 'https://example.com/a?utm_source=x', source: 'Fonte A', publishedAt: '2026-09-15T00:00:00.000Z' },
    { title: 'Uma pauta editorial suficientemente longa para validação', url: 'https://example.com/a', source: 'Fonte B', publishedAt: '2026-09-15T00:00:00.000Z' },
  ];
  assert.equal(selectUniqueCandidates([], candidates).length, 1);
});

test('rejeita categoria não sustentada pela página do artigo', async () => {
  const source = {
    name: 'Fonte Tecnologia',
    category: 'Tecnologia Médica',
    allowedSections: ['saúde'],
    allowedPathPrefixes: ['/saude/'],
  };
  const candidate = { title: 'Uma pauta editorial suficientemente longa para validação', url: 'https://example.com/entretenimento/noticia', source };
  const fetchImpl = async () => response('<link rel="canonical" href="https://example.com/entretenimento/noticia"><meta property="article:section" content="Entretenimento"><meta property="article:published_time" content="2026-09-15T00:00:00Z">');
  assert.equal(await validateCandidate(candidate, fetchImpl, now), null);
});

test('não regrava fila nem relatório quando não existem adições', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'evd-editorial-test-'));
  const queuePath = path.join(directory, 'queue.json');
  const reportPath = path.join(directory, 'report.md');
  const title = 'Uma pauta editorial suficientemente longa para validação';
  const url = 'https://example.com/educacao/2026/09/15/pauta';
  const initialQueue = `${JSON.stringify([{ title, url }], null, 2)}\n`;
  const initialReport = 'relatório preservado\n';
  await fs.writeFile(queuePath, initialQueue);
  await fs.writeFile(reportPath, initialReport);

  const source = {
    name: 'Fonte Educação',
    url: 'https://example.com/educacao',
    category: 'Educação',
    allowedSections: ['educação'],
    allowedPathPrefixes: ['/educacao/'],
  };
  const pages = new Map([
    [source.url, `<a href="${url}?utm_source=feed">${title}</a>`],
    [url, '<link rel="canonical" href="https://example.com/educacao/2026/09/15/pauta"><meta property="article:section" content="Educação"><meta property="article:published_time" content="2026-09-15T00:00:00Z">'],
  ]);
  const fetchImpl = async requested => {
    const requestedUrl = canonicalizeUrl(requested);
    return response(pages.get(requestedUrl) ?? '', pages.has(requestedUrl) ? 200 : 404);
  };
  const result = await runEditorialQueue({ queuePath, reportPath, sources: [source], fetchImpl, now });

  assert.equal(result.changed, false);
  assert.equal(await fs.readFile(queuePath, 'utf8'), initialQueue);
  assert.equal(await fs.readFile(reportPath, 'utf8'), initialReport);
});

test('referência da home e conteúdo React permanecem renderizáveis', async () => {
  const home = await fs.readFile('src/pages/Home.jsx', 'utf8');
  const blog = await fs.readFile('src/pages/BlogPost.jsx', 'utf8');
  const institutional = await fs.readFile('src/institutional.js', 'utf8');
  const latestStoriesBlock = home.match(/const latestStories = \[([\s\S]*?)\n\];/)?.[1] ?? '';
  const storyIds = [...latestStoriesBlock.matchAll(/\bid:\s*['"]([^'"]+)['"]/g)].map(match => match[1]);

  assert.ok(storyIds.length > 0);
  for (const storyId of storyIds) assert.match(institutional, new RegExp(`\\b${storyId}:\\s*{`));
  assert.match(home, /post_plcg2_alzheimer_synapses_2026/);
  assert.match(blog, /\bplcg2_alzheimer_synapses_2026:\s*{/);
  assert.doesNotMatch(home, /post_plcg2_alzheimer_2026['"]/);
  assert.doesNotMatch(blog, /content:\s*\(\)\s*=>/);
});
