#!/usr/bin/env node

import { kv } from '@vercel/kv';

const TOKEN_INDEX_PREFIX = 'notifications:token:';

async function run() {
  const members = await kv.smembers('fids');
  const fids = (members || []).map(Number).filter((fid) => Number.isFinite(fid) && fid > 0);

  let backfilled = 0;
  let skipped = 0;
  let missing = 0;

  for (const fid of fids) {
    const entry = await kv.get(`notifications:${fid}`);
    const token = typeof entry?.token === 'string' ? entry.token : '';
    if (!token) {
      missing += 1;
      continue;
    }

    const key = `${TOKEN_INDEX_PREFIX}${token}`;
    const existing = await kv.get(key);
    if (existing) {
      skipped += 1;
      continue;
    }

    await kv.set(key, fid);
    backfilled += 1;
  }

  console.log('[migrate_token_index] done', {
    totalFids: fids.length,
    backfilled,
    skipped,
    missing,
  });
}

run().catch((error) => {
  console.error('[migrate_token_index] failed', error);
  process.exit(1);
});
