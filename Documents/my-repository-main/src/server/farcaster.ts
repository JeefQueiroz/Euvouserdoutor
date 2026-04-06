
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

type RawNeynarUser = {
  fid?: number | string;
  username?: string;
  display_name?: string;
  pfp_url?: string;
  pfp?: { url?: string };
  follower_count?: number;
  following_count?: number;
  score?: number;
  custody_address?: string;
  custodyAddress?: string;
  eth_address?: string;
  ethereum_address?: string;
  verified_addresses?: {
    eth_addresses?: string[];
    primary?: {
      eth_address?: string;
      address?: string;
    };
  };
  verified_accounts?: Array<{ address?: string }>;
};

type CachedNeynarUser = {
  user: RawNeynarUser;
  cachedAt: string;
  scoreCycleKey: string;
};

export type ResolvedFarcasterIdentity = {
  fid: number;
  username: string;
  pfp: string | null;
  score: number | null;
  followerCount: number | null;
  following_count?: number | null; // Adicionado para compatibilidade
  followingCount: number | null;
  verifiedWallet: string | null;
  verifiedWallets: string[];
  secondaryWallets: string[];
  allKnownWallets: string[];
};

function normalizeAddress(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!ETH_ADDRESS_REGEX.test(trimmed)) return null;
  return trimmed.toLowerCase();
}

function buildAddressSet(values: unknown[]): string[] {
  const set = new Set<string>();
  for (const value of values) {
    const normalized = normalizeAddress(value);
    if (normalized) set.add(normalized);
  }
  return Array.from(set);
}

function parseIdentityFromUser(fid: number, user?: RawNeynarUser): ResolvedFarcasterIdentity {
  const verifiedFromArray = Array.isArray(user?.verified_addresses?.eth_addresses)
    ? user?.verified_addresses?.eth_addresses
    : [];

  const verifiedFromAccounts = Array.isArray(user?.verified_accounts)
    ? user?.verified_accounts.map((account) => account?.address)
    : [];

  const verifiedWallets = buildAddressSet([
    ...verifiedFromArray,
    ...verifiedFromAccounts,
    user?.verified_addresses?.primary?.eth_address,
    user?.verified_addresses?.primary?.address,
  ]);

  const secondaryWallets = buildAddressSet([
    user?.custody_address,
    user?.custodyAddress,
    user?.eth_address,
    user?.ethereum_address,
  ]).filter((address) => !verifiedWallets.includes(address));

  const allKnownWallets = Array.from(new Set([...verifiedWallets, ...secondaryWallets]));

  const rawFollower = Number(user?.follower_count);
  const rawFollowing = Number(user?.following_count);
  const rawScore = Number(user?.score);

  return {
    fid,
    username: user?.username || `fid_${fid}`,
    pfp: user?.pfp_url || user?.pfp?.url || null,
    score: Number.isFinite(rawScore) ? rawScore : null,
    followerCount: Number.isFinite(rawFollower) ? rawFollower : null,
    following_count: Number.isFinite(rawFollowing) ? rawFollowing : null,
    followingCount: Number.isFinite(rawFollowing) ? rawFollowing : null,
    verifiedWallet: verifiedWallets[0] || null,
    verifiedWallets,
    secondaryWallets,
    allKnownWallets,
  };
}

function getUtcDayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Retorna a chave do ciclo atual (terça-feira).
 * O Neynar deve atualizar apenas na terça-feira.
 * De quarta (00:01) até segunda (23:59), os dados devem ficar fixos.
 */
function getMostRecentTuesdayKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay(); // 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab
  
  // Se for terça (2), o ciclo é hoje.
  // Se for qualquer outro dia, o ciclo é a terça-feira anterior.
  const distanceToTuesday = (day + 7 - 2) % 7;
  d.setUTCDate(d.getUTCDate() - distanceToTuesday);
  return getUtcDayKey(d);
}

function parseCachedNeynarEntry(raw: unknown): CachedNeynarUser | null {
  if (!raw || typeof raw !== 'object') return null;
  const candidate = raw as { user?: RawNeynarUser; cachedAt?: string; scoreCycleKey?: string };

  if (typeof candidate.cachedAt !== 'string' || !candidate.user) {
    return {
      user: raw as RawNeynarUser,
      cachedAt: new Date(0).toISOString(),
      scoreCycleKey: '',
    };
  }

  return {
    user: candidate.user,
    cachedAt: candidate.cachedAt,
    scoreCycleKey: typeof candidate.scoreCycleKey === 'string' ? candidate.scoreCycleKey : '',
  };
}

/**
 * Implementa a trava: Quarta a Segunda = SEM ATUALIZAÇÃO.
 * Terça = ATUALIZAÇÃO PERMITIDA.
 */
function shouldRefreshCachedUser(entry: CachedNeynarUser): boolean {
  const now = new Date();
  const day = now.getUTCDay(); // 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab
  
  // Se NÃO for terça-feira, permite atualização se o cache tiver mais de 24h.
  // Isso garante que o score não fique estagnado por quase uma semana se o cache for antigo.
  if (day !== 2) {
    const cachedDate = new Date(entry.cachedAt);
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return cachedDate < twentyFourHoursAgo;
  }

  // Se FOR terça-feira, atualiza se o cache for de um ciclo anterior
  const currentCycle = getMostRecentTuesdayKey(now);
  const cachedCycle = entry.scoreCycleKey || '';
  return cachedCycle !== currentCycle;
}

async function getHistoricalWalletsForFid(fid: number): Promise<string[]> {
  try {
    const { kv } = await import('@vercel/kv');
    const wallets = (await kv.smembers(`fid:wallets:${fid}`)) as string[];
    return buildAddressSet(Array.isArray(wallets) ? wallets : []);
  } catch {
    return [];
  }
}

async function rememberWalletsForFid(fid: number, wallets: string[]): Promise<void> {
  if (!wallets.length) return;
  try {
    const { kv } = await import('@vercel/kv');
    await Promise.all(wallets.map((wallet) => kv.sadd(`fid:wallets:${fid}`, wallet)));
  } catch {
    // Best effort history only.
  }
}

async function attachHistoricalWallets(identity: ResolvedFarcasterIdentity): Promise<ResolvedFarcasterIdentity> {
  const historical = await getHistoricalWalletsForFid(identity.fid);
  const merged = Array.from(new Set([...identity.allKnownWallets, ...historical]));

  await rememberWalletsForFid(identity.fid, merged);

  return {
    ...identity,
    allKnownWallets: merged,
  };
}

async function getCachedUser(fid: number): Promise<CachedNeynarUser | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const cached = await kv.get(`cache:neynar:user:${fid}`);
    return parseCachedNeynarEntry(cached);
  } catch {
    return null;
  }
}

async function setCachedUser(fid: number, user: RawNeynarUser): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    
    // O cache deve expirar na próxima terça-feira
    const now = new Date();
    const nextTuesday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const daysUntilNextTuesday = ((2 - nextTuesday.getUTCDay()) + 7) % 7 || 7;
    nextTuesday.setUTCDate(nextTuesday.getUTCDate() + daysUntilNextTuesday);
    nextTuesday.setUTCHours(0, 0, 0, 0); 
    
    const secondsUntilNextTuesday = Math.max(
      3600, // Mínimo 1 hora
      Math.floor((nextTuesday.getTime() - now.getTime()) / 1000),
    );

    const payload: CachedNeynarUser = {
      user,
      cachedAt: new Date().toISOString(),
      scoreCycleKey: getMostRecentTuesdayKey(),
    };
    await kv.set(`cache:neynar:user:${fid}`, payload, { ex: secondsUntilNextTuesday });
  } catch {
    // Best effort cache only.
  }
}

function resolveNeynarApiKey(): string | null {
  const apiKey = process.env.NEYNAR_API_KEY?.trim();
  if (!apiKey) return null;
  return apiKey;
}

export async function resolveIdentityByFid(fid: number): Promise<ResolvedFarcasterIdentity> {
  if (!Number.isFinite(fid) || fid <= 0) {
    throw new Error('Invalid FID');
  }

  const cached = await getCachedUser(fid);
  // Se tiver cache e ele não precisar ser atualizado, usa o cache.
  // A lógica de shouldRefreshCachedUser agora permite atualizações fora de terça se o cache for muito antigo.
  if (cached && !shouldRefreshCachedUser(cached)) {
    const identity = parseIdentityFromUser(fid, cached.user);
    return attachHistoricalWallets(identity);
  }

  const apiKey = resolveNeynarApiKey();
  if (!apiKey) {
    console.warn('[farcaster] NEYNAR_API_KEY not configured. Returning fallback identity.');
    const identity = parseIdentityFromUser(fid, cached?.user);
    return attachHistoricalWallets(identity);
  }
  
  // Chama a API se não houver cache, se o cache estiver desatualizado, ou se for terça-feira (para o ciclo de score oficial).
  const response = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
    headers: { accept: 'application/json', api_key: apiKey },
    next: { revalidate: 60 * 60 * 12 },
  });

  if (!response.ok) {
    console.warn(`[farcaster] Neynar error ${response.status} for fid=${fid}. Returning fallback identity.`);
    const identity = parseIdentityFromUser(fid, cached?.user);
    return attachHistoricalWallets(identity);
  }

  const data = await response.json();
  const user = Array.isArray(data?.users) ? data.users[0] : undefined;
  if (user) await setCachedUser(fid, user);
  const identity = parseIdentityFromUser(fid, user);
  return attachHistoricalWallets(identity);
}

export async function resolveIdentitiesByFids(fids: number[]): Promise<Map<number, ResolvedFarcasterIdentity>> {
  const normalizedFids = Array.from(
    new Set(fids.filter((fid) => Number.isFinite(fid) && fid > 0).map((fid) => Math.floor(fid)))
  );
  const result = new Map<number, ResolvedFarcasterIdentity>();
  if (!normalizedFids.length) return result;

  const unresolved = new Set<number>(normalizedFids);
  const staleCacheByFid = new Map<number, CachedNeynarUser>();
  await Promise.all(
    normalizedFids.map(async (fid) => {
      const cached = await getCachedUser(fid);
      if (!cached) return;
      if (shouldRefreshCachedUser(cached)) {
        staleCacheByFid.set(fid, cached);
        return;
      }
      const identity = parseIdentityFromUser(fid, cached.user);
      result.set(fid, await attachHistoricalWallets(identity));
      unresolved.delete(fid);
    })
  );

  if (unresolved.size === 0) return result;

  const apiKey = resolveNeynarApiKey();
  if (!apiKey) {
    console.warn('[farcaster] NEYNAR_API_KEY not configured. Returning fallback identities.');
    for (const fid of unresolved) {
      const identity = parseIdentityFromUser(fid, staleCacheByFid.get(fid)?.user);
      result.set(fid, await attachHistoricalWallets(identity));
    }
    return result;
  }
  const requested = Array.from(unresolved);
  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${requested.join(',')}`,
    {
      headers: { accept: 'application/json', api_key: apiKey },
      next: { revalidate: 60 * 60 * 12 },
    }
  );

  if (!response.ok) {
    console.warn(
      `[farcaster] Neynar bulk error ${response.status} for ${requested.length} fids. Returning fallback identities.`
    );
    for (const fid of unresolved) {
      const identity = parseIdentityFromUser(fid, staleCacheByFid.get(fid)?.user);
      result.set(fid, await attachHistoricalWallets(identity));
    }
    return result;
  }

  const data = await response.json();
  const users = Array.isArray(data?.users) ? (data.users as RawNeynarUser[]) : [];

  for (const user of users) {
    const userFid = Number(user?.fid);
    if (!Number.isFinite(userFid) || userFid <= 0) continue;
    const identity = parseIdentityFromUser(userFid, user);
    result.set(userFid, await attachHistoricalWallets(identity));
    await setCachedUser(userFid, user);
    unresolved.delete(userFid);
  }

  for (const fid of unresolved) {
    const identity = parseIdentityFromUser(fid);
    result.set(fid, await attachHistoricalWallets(identity));
  }

  return result;
}
