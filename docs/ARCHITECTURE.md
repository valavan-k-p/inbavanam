# Architecture

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4,
shadcn/ui on Base UI (used selectively), Motion for React, Lucide, Zod 4,
Supabase (PostgreSQL, Auth, Storage), Vitest with Testing Library. Target
host: Vercel.

## Layout

```text
src/
  app/
    layout.tsx                 root: fonts, metadata, viewport
    (marketing)/               public site, shares header and footer
      page.tsx                 homepage (ISR, revalidate 300s)
      about/ stay/ experiences/ our-work/ community/ events/ gallery/ contact/
      contact/actions.ts       enquiry server action
    admin/
      (auth)/login/            staff sign-in
      (dashboard)/             protected: dashboard, [resource] CRUD, enquiries, settings
    sitemap.ts robots.ts not-found.tsx
  proxy.ts                     session refresh + optimistic admin redirect
  components/
    navigation/                SiteHeader, SiteMenu (radial), Footer
    hero/ sections/ gallery/ events/ forms/ illustrations/ brand/ ui/ admin/
  data/                        typed local content
  lib/
    supabase/                  config + server client
    db/                        content repository, enquiry storage
    admin/resources.ts         admin content-type config and schemas
    validations/               Zod schemas
    seo/ dates.ts rate-limit.ts auth.ts utils.ts
  types/content.ts
supabase/migrations/ seed.sql
```

## Rendering

- Server Components by default. Client Components are limited to: the header
  (scroll state), radial menu, hero video, kolam drawing and media reveal
  (Motion), gallery grid and lightbox, event calendar, and forms.
- Public pages that read collections use a session-less Supabase client and
  `revalidate = 300`, so they render statically and refresh every five
  minutes. Admin changes also call `revalidatePath` for immediate updates.
- Pages that read `searchParams` (events filter, gallery filter, contact
  prefill) render per request.

## Security

- Only the publishable (anon) key is used by the app. The service-role key is
  never needed and must never be added.
- Row-level security on every table. The public role can read published
  content and insert enquiries; it cannot read enquiries.
- Admin protection has three layers: `proxy.ts` (optimistic redirect),
  `requireStaff()` in the admin layout and pages, and `requireStaff()` again at
  the top of every server action. Role comes from `profiles.role`, which only
  admins can change.
- No public registration. Staff accounts are created in the Supabase dashboard.
- Server-side Zod validation on every mutation; the same schema runs in the
  browser for instant feedback.
- Enquiry form: honeypot field plus a per-IP rate limit. The limiter is
  in-memory, so on serverless hosting each instance counts separately. If spam
  becomes a problem, move it to a shared store (for example Upstash Redis or a
  Supabase table with a time-window query).
- Login redirects are restricted to `/admin` paths (`safeAdminPath`).
- JSON-LD is serialised with `<` escaped; no other raw HTML is rendered.
- Security headers are set in `next.config.ts`.

## Media

- Images go through `next/image` (AVIF and WebP, qualities 60, 75 and 90).
  Supabase Storage is allowed as a remote source once configured.
- Every media box reserves its aspect ratio, so nothing shifts on load.
- The hero video autoplays muted and inline, does not autoplay under reduced
  motion, is not downloaded on Save-Data or 2G connections, and has a
  pause control. In-page videos use native controls with `preload="none"`.
- Large videos belong in Supabase Storage or a video CDN, not in the
  repository.

## Future booking

`bookings` exists with statuses and date constraints but no public access or
inventory logic. V1 uses enquiries. Availability, payments and cancellation
policy can be added on top without schema changes to other tables.
