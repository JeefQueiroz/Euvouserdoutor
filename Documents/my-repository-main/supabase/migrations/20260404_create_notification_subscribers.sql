create table if not exists public.notification_subscribers (
  fid bigint primary key,
  token text not null,
  url text not null,
  username text,
  pfp_url text,
  updated_at timestamptz default now()
);

create index if not exists idx_notification_subscribers_token
  on public.notification_subscribers (token);

create index if not exists idx_notification_subscribers_updated_at
  on public.notification_subscribers (updated_at desc);

create or replace view public.subscribers_stats as
select
  count(*) as total,
  count(*) filter (where updated_at > now() - interval '7 days') as active_7d,
  count(*) filter (where updated_at > now() - interval '30 days') as active_30d,
  max(updated_at) as last_registered
from public.notification_subscribers;
