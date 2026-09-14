-- Seed data for local development.
--
-- Deliberately contains no rooms, events, prices, testimonials or other
-- business facts: those must come from the client (see docs/CONTENT_GAPS.md).

insert into public.site_settings (key, value) values
  ('contact', '{"email": null, "phone": null, "address": null, "map_url": null}'),
  ('support', '{"url": null}')
on conflict (key) do nothing;

-- Granting the first administrator:
-- 1. Create the user in Supabase Dashboard > Authentication > Users (no public sign-up).
-- 2. Then run, replacing the email:
--    update public.profiles set role = 'admin'
--    where id = (select id from auth.users where email = 'staff@example.org');
