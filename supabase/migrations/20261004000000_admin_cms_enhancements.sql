-- Inbavanam Admin CMS Enhancements
-- Adds extended fields for verified programmes, event times, and content structures.

-- 1. Extend programs table
alter table public.programs add column if not exists subtitle text;
alter table public.programs add column if not exists lead text;
alter table public.programs add column if not exists highlights text[] not null default '{}';
alter table public.programs add column if not exists key_fact_label text;
alter table public.programs add column if not exists key_fact_value text;
alter table public.programs add column if not exists source_ref text;
alter table public.programs add column if not exists image_path text;
alter table public.programs add column if not exists tag text;

-- 2. Extend events table with explicit time fields
alter table public.events add column if not exists start_time text;
alter table public.events add column if not exists end_time text;

-- 3. Ensure site_settings table exists and is secured
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Public can read site settings
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'site_settings' and policyname = 'site_settings: public read'
  ) then
    create policy "site_settings: public read" on public.site_settings for select to anon, authenticated using (true);
  end if;
end $$;

-- Admin can manage site settings
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'site_settings' and policyname = 'site_settings: admins manage'
  ) then
    create policy "site_settings: admins manage" on public.site_settings for all to authenticated
      using (public.is_admin()) with check (public.is_admin());
  end if;
end $$;

grant select on public.site_settings to anon;
grant select, insert, update, delete on public.site_settings to authenticated;

-- 4. Ensure media storage bucket exists and policies permit staff uploads
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
