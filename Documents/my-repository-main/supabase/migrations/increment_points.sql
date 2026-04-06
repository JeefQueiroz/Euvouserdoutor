-- Garante que o incremento de pontos é atômico (evita race conditions)
CREATE OR REPLACE FUNCTION increment_points(p_fid bigint, p_points int)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO profiles (fid, points, total_points, created_at, updated_at)
  VALUES (p_fid, p_points, p_points, now(), now())
  ON CONFLICT (fid)
  DO UPDATE SET
    points       = profiles.points + EXCLUDED.points,
    total_points = profiles.total_points + EXCLUDED.total_points,
    updated_at   = now();
END;
$$;