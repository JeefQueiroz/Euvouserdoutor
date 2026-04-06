-- =============================================
-- SCHEMA COMPLETO X-RAY PROTOCOL
-- =============================================

create table if not exists public.users (
  fid               bigint primary key,
  username          text,
  pfp_url           text,
  follower_count    int default 0,
  following_count   int default 0,
  neynar_score      float default 0,
  verified_wallets  text[] default '{}',
  primary_wallet    text,
  synced_at         timestamptz default now()
);

create table if not exists public.leaderboard (
  fid           bigint primary key references public.users(fid) on delete cascade,
  base_points   int default 0,
  nft_count     int default 0,
  nft_score     int default 0,
  total_points  int default 0,
  rank          int,
  updated_at    timestamptz default now()
);

create table if not exists public.nft_ownership (
  id              bigserial primary key,
  fid             bigint references public.users(fid) on delete cascade,
  token_id        text not null,
  wallet_address  text not null,
  image_url       text,
  metadata_url    text,
  synced_at       timestamptz default now(),
  unique(fid, token_id)
);

create table if not exists public.checkins (
  fid         bigint primary key references public.users(fid) on delete cascade,
  streak      int default 0,
  best_streak int default 0,
  last_date   text,
  history     text[] default '{}',
  updated_at  timestamptz default now()
);

create table if not exists public.spin_logs (
  id              bigserial primary key,
  fid             bigint references public.users(fid) on delete cascade,
  date            text not null,
  spins_used      int default 0,
  last_risk_level text,
  last_reward     int,
  updated_at      timestamptz default now(),
  unique(fid, date)
);

create table if not exists public.notification_subscribers (
  fid         bigint primary key,
  token       text not null,
  url         text not null,
  username    text,
  pfp_url     text,
  updated_at  timestamptz default now()
);

create index if not exists idx_leaderboard_total_points
  on public.leaderboard(total_points desc);

create index if not exists idx_leaderboard_nft_count
  on public.leaderboard(nft_count desc, fid);

create index if not exists idx_nft_ownership_fid
  on public.nft_ownership(fid);

create index if not exists idx_nft_ownership_wallet
  on public.nft_ownership(wallet_address);

create index if not exists idx_spin_logs_fid_date
  on public.spin_logs(fid, date);

create index if not exists idx_subscribers_updated
  on public.notification_subscribers(updated_at desc);

create or replace view public.user_profile_complete as
select
  u.fid,
  u.username,
  u.pfp_url,
  u.follower_count,
  u.following_count,
  u.neynar_score,
  u.verified_wallets,
  u.primary_wallet,
  u.synced_at,
  coalesce(l.base_points, 0)  as base_points,
  coalesce(l.nft_count, 0)    as nft_count,
  coalesce(l.nft_score, 0)    as nft_score,
  coalesce(l.total_points, 0) as total_points,
  l.rank,
  coalesce(c.streak, 0)       as streak,
  coalesce(c.best_streak, 0)  as best_streak,
  c.last_date                 as last_checkin,
  c.history                   as checkin_history,
  u.synced_at                 as profile_synced_at
from public.users u
left join public.leaderboard l on l.fid = u.fid
left join public.checkins c    on c.fid = u.fid;

create or replace function public.recalculate_ranks()
returns void language sql as $$
  update public.leaderboard l
  set rank = sub.new_rank
  from (
    select fid,
           row_number() over (order by total_points desc, nft_count desc, fid asc) as new_rank
    from public.leaderboard
  ) sub
  where l.fid = sub.fid;
$$;

create or replace function public.calc_nft_score(count int)
returns int language sql immutable as $$
  select case
    when count <= 0 then 0
    else 50 + (count - 1) * 100
  end;
$$;

create or replace function public.sync_nft_score()
returns trigger language plpgsql as $$
begin
  new.nft_score    := public.calc_nft_score(new.nft_count);
  new.total_points := new.base_points + new.nft_score;
  new.updated_at   := now();
  return new;
end;
$$;

do $$
begin
  if exists (select 1 from pg_trigger where tgname = 'trg_sync_nft_score') then
    drop trigger trg_sync_nft_score on public.leaderboard;
  end if;

  create trigger trg_sync_nft_score
    before insert or update of nft_count, base_points
    on public.leaderboard
    for each row execute function public.sync_nft_score();
end $$;

create or replace view public.subscribers_stats as
select
  count(*)                                                         as total,
  count(*) filter (where updated_at > now() - interval '7 days')  as active_7d,
  count(*) filter (where updated_at > now() - interval '30 days') as active_30d,
  max(updated_at)                                                  as last_registered
from public.notification_subscribers;

create or replace function public.increment_base_points(p_fid bigint, p_points int)
returns int language plpgsql as $$
declare
  new_points int;
begin
  insert into public.leaderboard (fid, base_points, nft_count)
  values (p_fid, p_points, 0)
  on conflict (fid) do update
    set base_points = public.leaderboard.base_points + p_points
  returning base_points into new_points;

  return new_points;
end;
$$;
