-- =============================================================================
-- XRAY - Safe NFT reconcile with fallback sources
-- Prevents accidental nft_count/nft_score reset when nft_ownership is sparse.
-- =============================================================================

BEGIN;

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
      COUNT(*)::INT AS ownership_nft_count
    FROM public.nft_ownership n
    WHERE p_fid IS NULL OR n.fid = p_fid
    GROUP BY n.fid
  ),
  base AS (
    SELECT
      l.fid,
      COALESCE(l.base_points, l.points, p.points, 0)::BIGINT AS base_points,
      GREATEST(
        COALESCE(nb.ownership_nft_count, 0),
        COALESCE(l.nft_count, 0),
        CASE
          WHEN COALESCE(p.genesis_nft, FALSE)
            THEN 1 + COALESCE(p.secondary_nfts, 0)
          ELSE 0
        END
      )::INT AS resolved_nft_count
    FROM public.leaderboard l
    LEFT JOIN public.profiles p ON p.fid = l.fid
    LEFT JOIN nft_by_fid nb ON nb.fid = l.fid
    WHERE p_fid IS NULL OR l.fid = p_fid
  ),
  upd_leaderboard AS (
    UPDATE public.leaderboard l
    SET
      nft_count = b.resolved_nft_count,
      "nftCount" = b.resolved_nft_count,
      has_nft = (b.resolved_nft_count > 0),
      "hasNft" = (b.resolved_nft_count > 0),
      nft_score = GREATEST(b.resolved_nft_count - 1, 0) * 100,
      total_points = b.base_points + (GREATEST(b.resolved_nft_count - 1, 0) * 100),
      updated_at = NOW()
    FROM base b
    WHERE b.fid = l.fid
    RETURNING l.fid
  ),
  upd_profiles AS (
    UPDATE public.profiles p
    SET
      genesis_nft = (COALESCE(b.resolved_nft_count, 0) > 0),
      secondary_nfts = GREATEST(COALESCE(b.resolved_nft_count, 0) - 1, 0),
      nft_score = GREATEST(COALESCE(b.resolved_nft_count, 0) - 1, 0) * 100,
      total_points = COALESCE(b.base_points, p.points, 0) + (GREATEST(COALESCE(b.resolved_nft_count, 0) - 1, 0) * 100),
      xp = COALESCE(b.base_points, p.points, 0) + (GREATEST(COALESCE(b.resolved_nft_count, 0) - 1, 0) * 100),
      neynar_score = GREATEST(
        COALESCE(p.neynar_score, 0),
        COALESCE((SELECT u.neynar_score FROM public.users u WHERE u.fid = p.fid), 0),
        COALESCE((SELECT l2.neynar_score FROM public.leaderboard l2 WHERE l2.fid = p.fid), 0)
      ),
      updated_at = NOW()
    FROM base b
    WHERE b.fid = p.fid
    RETURNING p.fid
  )
  SELECT
    (SELECT COUNT(*) FROM upd_leaderboard) + (SELECT COUNT(*) FROM upd_profiles)
  INTO affected_rows;

  -- Keep rank in sync as part of reconcile.
  PERFORM public.recalculate_ranks();

  RETURN COALESCE(affected_rows, 0);
END;
$$;

COMMIT;

