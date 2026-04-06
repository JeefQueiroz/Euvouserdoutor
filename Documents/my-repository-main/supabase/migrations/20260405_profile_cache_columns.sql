-- =============================================================================
-- XRAY - Profile cache/state columns persisted from mini app local cache
-- =============================================================================

BEGIN;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cache_updated_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tasks_cache JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS share_cache JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS follow_x_cache JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS checkin_cache JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS state_blob JSONB DEFAULT '{}'::jsonb;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS task_follow_fc BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS task_follow_x BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS task_mint_nft BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS task_share_xray BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS task_notif BOOLEAN DEFAULT FALSE;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS share_last_date DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS follow_x_last_date DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS follow_x_status TEXT;

CREATE INDEX IF NOT EXISTS idx_profiles_cache_updated_at ON public.profiles(cache_updated_at DESC);

COMMIT;

