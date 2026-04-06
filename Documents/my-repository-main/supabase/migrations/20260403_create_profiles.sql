create table if not exists public.profiles (
  fid bigint primary key,
  username text,
  points integer default 0,
  streak integer default 0,
  best_streak integer default 0,
  last_checkin date,
  created_at timestamptz default now(),
  streak_count integer default 0,
  weekly_count integer default 0,
  notification_token text,
  notification_url text
);

create index if not exists idx_profiles_username on public.profiles (username);
create index if not exists idx_profiles_points on public.profiles (points desc);
