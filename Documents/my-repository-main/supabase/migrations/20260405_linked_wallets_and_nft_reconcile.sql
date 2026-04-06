-- =============================================================================
-- XRAY - Linked wallets (Farcaster + Base) and NFT reconciliation
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1) Wallet links per FID
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fid_wallets (
  fid BIGINT NOT NULL,
  wallet_address TEXT NOT NULL,
  source TEXT DEFAULT 'users',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (fid, wallet_address)
);

CREATE INDEX IF NOT EXISTS idx_fid_wallets_wallet_address ON public.fid_wallets(wallet_address);
CREATE INDEX IF NOT EXISTS idx_fid_wallets_fid ON public.fid_wallets(fid);

ALTER TABLE public.fid_wallets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir tudo para a API" ON public.fid_wallets;
CREATE POLICY "Permitir tudo para a API" ON public.fid_wallets
  FOR ALL USING (true) WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- 2) Helpers
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_valid_eth_address(addr TEXT)
RETURNS BOOLEAN
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT addr ~* '^0x[0-9a-f]{40}$';
$$;

CREATE OR REPLACE FUNCTION public.refresh_fid_wallets_for_user(p_fid BIGINT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_fid IS NULL OR p_fid <= 0 THEN
    RETURN;
  END IF;

  WITH wallet_candidates AS (
    SELECT LOWER(TRIM(w)) AS wallet_address, 'users.verified_wallets'::TEXT AS source
    FROM public.users u,
         LATERAL unnest(COALESCE(u.verified_wallets, ARRAY[]::TEXT[])) AS w
    WHERE u.fid = p_fid

    UNION ALL

    SELECT LOWER(TRIM(u.primary_wallet)) AS wallet_address, 'users.primary_wallet'::TEXT AS source
    FROM public.users u
    WHERE u.fid = p_fid
      AND u.primary_wallet IS NOT NULL

    UNION ALL

    SELECT LOWER(TRIM(p.wallet_address)) AS wallet_address, 'profiles.wallet_address'::TEXT AS source
    FROM public.profiles p
    WHERE p.fid = p_fid
      AND p.wallet_address IS NOT NULL
  )
  INSERT INTO public.fid_wallets (fid, wallet_address, source, updated_at)
  SELECT p_fid, wc.wallet_address, wc.source, NOW()
  FROM wallet_candidates wc
  WHERE wc.wallet_address IS NOT NULL
    AND public.is_valid_eth_address(wc.wallet_address)
  ON CONFLICT (fid, wallet_address) DO UPDATE
    SET source = EXCLUDED.source,
        updated_at = NOW();
END;
$$;

-- ---------------------------------------------------------------------------
-- 3) Auto-sync wallet links from users/profiles updates
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.trg_refresh_fid_wallets_from_users()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM public.refresh_fid_wallets_for_user(NEW.fid);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_refresh_fid_wallets_from_users ON public.users;
CREATE TRIGGER trg_refresh_fid_wallets_from_users
AFTER INSERT OR UPDATE OF verified_wallets, primary_wallet ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.trg_refresh_fid_wallets_from_users();

CREATE OR REPLACE FUNCTION public.trg_refresh_fid_wallets_from_profiles()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM public.refresh_fid_wallets_for_user(NEW.fid);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_refresh_fid_wallets_from_profiles ON public.profiles;
CREATE TRIGGER trg_refresh_fid_wallets_from_profiles
AFTER INSERT OR UPDATE OF wallet_address ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.trg_refresh_fid_wallets_from_profiles();

-- ---------------------------------------------------------------------------
-- 4) Backfill wallet links from existing rows
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN
    SELECT fid FROM public.users
    UNION
    SELECT fid FROM public.profiles
  LOOP
    PERFORM public.refresh_fid_wallets_for_user(rec.fid);
  END LOOP;
END $$;

-- ---------------------------------------------------------------------------
-- 5) NFT + points reconciliation from nft_ownership
--    Rule: nft_score = GREATEST(nft_count - 1, 0) * 100
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.reconcile_nft_points(p_fid BIGINT DEFAULT NULL)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  affected_rows INTEGER := 0;
BEGIN
  WITH nft_by_fid AS (
    SELECT
      n.fid,
      COUNT(*)::INT AS nft_count
    FROM public.nft_ownership n
    WHERE p_fid IS NULL OR n.fid = p_fid
    GROUP BY n.fid
  ),
  base AS (
    SELECT
      l.fid,
      COALESCE(l.base_points, l.points, p.points, 0)::BIGINT AS base_points,
      COALESCE(nb.nft_count, 0)::INT AS nft_count
    FROM public.leaderboard l
    LEFT JOIN public.profiles p ON p.fid = l.fid
    LEFT JOIN nft_by_fid nb ON nb.fid = l.fid
    WHERE p_fid IS NULL OR l.fid = p_fid
  ),
  upd_leaderboard AS (
    UPDATE public.leaderboard l
    SET
      nft_count = b.nft_count,
      "nftCount" = b.nft_count,
      has_nft = (b.nft_count > 0),
      "hasNft" = (b.nft_count > 0),
      nft_score = GREATEST(b.nft_count - 1, 0) * 100,
      total_points = b.base_points + (GREATEST(b.nft_count - 1, 0) * 100),
      updated_at = NOW()
    FROM base b
    WHERE b.fid = l.fid
    RETURNING l.fid
  ),
  upd_profiles AS (
    UPDATE public.profiles p
    SET
      genesis_nft = (COALESCE(b.nft_count, 0) > 0),
      secondary_nfts = GREATEST(COALESCE(b.nft_count, 0) - 1, 0),
      nft_score = GREATEST(COALESCE(b.nft_count, 0) - 1, 0) * 100,
      total_points = COALESCE(b.base_points, p.points, 0) + (GREATEST(COALESCE(b.nft_count, 0) - 1, 0) * 100),
      xp = COALESCE(b.base_points, p.points, 0) + (GREATEST(COALESCE(b.nft_count, 0) - 1, 0) * 100),
      updated_at = NOW()
    FROM base b
    WHERE b.fid = p.fid
    RETURNING p.fid
  )
  SELECT
    (SELECT COUNT(*) FROM upd_leaderboard) + (SELECT COUNT(*) FROM upd_profiles)
  INTO affected_rows;

  RETURN COALESCE(affected_rows, 0);
END;
$$;

COMMIT;

