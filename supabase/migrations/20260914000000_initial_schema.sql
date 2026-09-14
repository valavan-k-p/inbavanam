-- Inbavanam initial schema.
-- Public visitors can read published content and submit enquiries.
-- Staff (profiles.role = admin | editor) manage everything else.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Staff profiles and role helpers
-- ---------------------------------------------------------------------------

create type public.staff_role as enum ('admin', 'editor');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role public.staff_role,
  created_at timestamptz not null default now()
);

-- New auth users get a profile with no role; an admin grants the role.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Security definer so policies can check roles without recursive RLS.
create function public.is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role is not null);
$$;

create function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin');
$$;

create function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Content
-- ---------------------------------------------------------------------------

create table public.accommodations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  summary text,
  capacity text,
  amenities text[] not null default '{}',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.accommodation_images (
  id uuid primary key default gen_random_uuid(),
  accommodation_id uuid not null references public.accommodations (id) on delete cascade,
  storage_path text not null,
  alt text not null,
  caption text,
  width integer,
  height integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index accommodation_images_parent_idx on public.accommodation_images (accommodation_id, sort_order);

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  summary text,
  body text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  area text not null,
  title text not null,
  summary text,
  body text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  category text not null check (category in ('Program', 'Training', 'Community', 'Celebration', 'Retreat', 'Private booking')),
  start_date date not null,
  end_date date check (end_date is null or end_date >= start_date),
  time_label text,
  location text not null default 'Inbavanam',
  summary text,
  image_path text,
  program_id uuid references public.programs (id) on delete set null,
  registration_url text check (registration_url is null or registration_url ~ '^https?://'),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index events_calendar_idx on public.events (published, start_date);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'image' check (kind in ('image', 'video')),
  storage_path text not null,
  poster_path text,
  alt text not null,
  caption text,
  category text not null check (category in ('Architecture', 'Nature', 'Stay', 'People', 'Community', 'Farming', 'Experiences')),
  span text not null default 'regular' check (span in ('regular', 'tall', 'wide')),
  program_id uuid references public.programs (id) on delete set null,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index gallery_items_listing_idx on public.gallery_items (published, category, sort_order);

create table public.founders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  bio text,
  portrait_path text,
  video_path text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  bio text,
  portrait_path text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.volunteer_opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  commitment text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Operations
-- ---------------------------------------------------------------------------

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('general', 'stay', 'event', 'volunteer', 'support')),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 200),
  phone text check (char_length(phone) <= 30),
  arrival_date date,
  departure_date date check (departure_date is null or arrival_date is null or departure_date >= arrival_date),
  group_size integer check (group_size is null or group_size between 1 and 1000),
  message text not null check (char_length(message) between 10 and 4000),
  context text check (char_length(context) <= 200),
  accommodation_id uuid references public.accommodations (id) on delete set null,
  experience_id uuid references public.experiences (id) on delete set null,
  event_id uuid references public.events (id) on delete set null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);
create index enquiries_inbox_idx on public.enquiries (status, created_at desc);

-- Future-ready: no public access, no inventory logic yet.
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  accommodation_id uuid not null references public.accommodations (id) on delete restrict,
  enquiry_id uuid references public.enquiries (id) on delete set null,
  guest_name text not null,
  guest_email text not null,
  arrival_date date not null,
  departure_date date not null check (departure_date >= arrival_date),
  guests integer check (guests is null or guests > 0),
  status text not null default 'provisional' check (status in ('provisional', 'confirmed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index bookings_accommodation_idx on public.bookings (accommodation_id, arrival_date);

-- updated_at triggers
do $$
declare t text;
begin
  foreach t in array array['accommodations', 'experiences', 'programs', 'events', 'gallery_items', 'founders',
                           'team_members', 'volunteer_opportunities', 'bookings', 'site_settings'] loop
    execute format('create trigger %I_updated_at before update on public.%I for each row execute function public.set_updated_at()', t, t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
create policy "profiles: read own or staff" on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_staff());
create policy "profiles: admins manage" on public.profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Published content: anyone reads published rows; staff manage all rows.
do $$
declare t text;
begin
  foreach t in array array['accommodations', 'experiences', 'programs', 'events', 'gallery_items', 'founders',
                           'team_members', 'volunteer_opportunities'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "%s: public reads published" on public.%I for select to anon, authenticated using (published or public.is_staff())', t, t);
    execute format('create policy "%s: staff insert" on public.%I for insert to authenticated with check (public.is_staff())', t, t);
    execute format('create policy "%s: staff update" on public.%I for update to authenticated using (public.is_staff()) with check (public.is_staff())', t, t);
    execute format('create policy "%s: staff delete" on public.%I for delete to authenticated using (public.is_staff())', t, t);
    execute format('grant select on public.%I to anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

alter table public.accommodation_images enable row level security;
create policy "accommodation_images: public reads published" on public.accommodation_images for select to anon, authenticated
  using (public.is_staff() or exists (
    select 1 from public.accommodations a where a.id = accommodation_id and a.published
  ));
create policy "accommodation_images: staff manage" on public.accommodation_images for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
grant select on public.accommodation_images to anon;
grant select, insert, update, delete on public.accommodation_images to authenticated;

alter table public.site_settings enable row level security;
create policy "site_settings: public read" on public.site_settings for select to anon, authenticated using (true);
create policy "site_settings: admins manage" on public.site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
grant select on public.site_settings to anon;
grant select, insert, update, delete on public.site_settings to authenticated;

-- Enquiries: the public may only create new ones and can never read them back.
alter table public.enquiries enable row level security;
create policy "enquiries: public submits" on public.enquiries for insert to anon, authenticated
  with check (status = 'new');
create policy "enquiries: staff read" on public.enquiries for select to authenticated using (public.is_staff());
create policy "enquiries: staff update" on public.enquiries for update to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "enquiries: admins delete" on public.enquiries for delete to authenticated using (public.is_admin());
grant insert on public.enquiries to anon;
grant select, insert, update, delete on public.enquiries to authenticated;

alter table public.bookings enable row level security;
create policy "bookings: staff manage" on public.bookings for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
grant select, insert, update, delete on public.bookings to authenticated;

-- ---------------------------------------------------------------------------
-- Storage: one public-read bucket for site media
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media: public read" on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');
create policy "media: staff upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_staff());
create policy "media: staff update" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_staff());
create policy "media: staff delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_staff());
