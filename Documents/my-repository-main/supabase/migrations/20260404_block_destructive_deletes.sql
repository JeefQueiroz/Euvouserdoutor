-- Safety lock: block destructive deletes/truncates on critical tables.
-- Escape hatch for maintenance:
--   set local app.allow_destructive_writes = 'on';

create or replace function public.block_destructive_changes()
returns trigger
language plpgsql
as $$
begin
  if current_setting('app.allow_destructive_writes', true) = 'on' then
    if tg_op = 'DELETE' then
      return old;
    end if;
    return null;
  end if;

  raise exception
    'Destructive operation "%" blocked on table "%".',
    tg_op, tg_table_name;
end;
$$;

do $$
declare
  table_name text;
  protected_tables text[] := array[
    'profiles',
    'users',
    'leaderboard',
    'nft_ownership',
    'checkins',
    'spin_logs',
    'notification_subscribers'
  ];
  delete_trigger_name text;
  truncate_trigger_name text;
begin
  foreach table_name in array protected_tables loop
    if to_regclass(format('public.%I', table_name)) is null then
      continue;
    end if;

    delete_trigger_name := format('trg_block_%s_delete', table_name);
    truncate_trigger_name := format('trg_block_%s_truncate', table_name);

    if not exists (
      select 1 from pg_trigger where tgname = delete_trigger_name
    ) then
      execute format(
        'create trigger %I before delete on public.%I for each row execute function public.block_destructive_changes()',
        delete_trigger_name,
        table_name
      );
    end if;

    if not exists (
      select 1 from pg_trigger where tgname = truncate_trigger_name
    ) then
      execute format(
        'create trigger %I before truncate on public.%I for each statement execute function public.block_destructive_changes()',
        truncate_trigger_name,
        table_name
      );
    end if;
  end loop;
end $$;
