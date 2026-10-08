-- Tighten public read access to site_settings.
--
-- The previous policy let anyone read every row. The public site only needs
-- four keys; the rest of the table holds editing history written by the admin
-- (site_content_previous, contact_previous) and anything added later, none of
-- which belongs to visitors.
--
-- Staff keep full read access, so the admin's restore feature still works.

drop policy if exists "site_settings: public read" on public.site_settings;

create policy "site_settings: public reads published keys" on public.site_settings
  for select to anon, authenticated
  using (
    key in ('contact', 'organisation_profile', 'programs', 'site_content')
    or public.is_staff()
  );
