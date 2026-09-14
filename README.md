# Inbavanam

Website for Inbavanam, a retreat space of about 5.5 acres near Karamadai in
the Coimbatore region of Tamil Nadu, run by Gladston and Florina Xavier
alongside their community work.

A place to stay. A space to connect. A community with purpose.

## Requirements

- Node.js 20.9 or later (developed on Node 24)
- npm

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The site runs without Supabase: collections fall
back to the typed data in `src/data/`, and enquiries are logged to the dev
server console.

Before launch, copy the official logo to `public/brand/logo.png`. See
`docs/CONTENT_GAPS.md` for everything else that is still needed.

## Scripts

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Development server                |
| `npm run build`     | Production build                  |
| `npm run start`     | Serve the production build        |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | TypeScript                        |
| `npm run test`      | Vitest (unit and component tests) |
| `npm run check`     | Typecheck, lint and test together |
| `npm run format`    | Prettier                          |

## Environment variables

See `.env.example`. All are optional in development.

| Variable                                                                 | Purpose                |
| ------------------------------------------------------------------------ | ---------------------- |
| `NEXT_PUBLIC_SITE_URL`                                                   | Canonical base URL     |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`       | Supabase project       |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `_PHONE`, `_ADDRESS`, `NEXT_PUBLIC_MAP_URL` | Contact details        |
| `NEXT_PUBLIC_SUPPORT_URL`                                                | External donation page |

## Supabase

1. Create a project at supabase.com.
2. Apply `supabase/migrations/` (Supabase CLI: `supabase db push`, or paste
   the SQL into the SQL editor), then `supabase/seed.sql`.
3. In Authentication > Providers, keep Email enabled and **turn off public
   sign-ups**.
4. Create a staff user in Authentication > Users, then grant a role:

   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'staff@example.org');
   ```

5. Add the URL and publishable key to `.env.local` (and to Vercel).
6. Sign in at `/admin/login`.

## Content conventions

- Copy lives in `src/data/`; components hold layout only.
- Never invent facts. Use the `TBC` constant and add the item to
  `docs/CONTENT_GAPS.md`.
- Every factual statement must appear in `docs/SOURCE_NOTES.md`.
- No emoji, anywhere.

## Media conventions

- Development media: `public/images/<area>/` and `public/videos/<area>/`.
- Production media: the Supabase `media` bucket, referenced by path in the admin.
- Photographs: at least 2400px on the long edge, JPEG or WebP; `next/image`
  generates the responsive sizes. Always add alt text, and a caption for
  program and event photographs.
- Video: H.264 MP4 plus WebM, 1080p, a poster frame, and WebVTT captions for
  anything with speech.

## Deployment (Vercel)

1. Import the repository in Vercel. The framework is detected automatically.
2. Add the environment variables for Production and Preview.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## Documentation

- `docs/ARCHITECTURE.md`: structure, rendering and security
- `docs/DESIGN_SYSTEM.md`: tokens, contrast, typography and motion
- `docs/CONTENT_MODEL.md`: content sources and how to extend them
- `docs/CONTENT_GAPS.md`: what the client still needs to supply
- `docs/SOURCE_NOTES.md`: where each fact comes from
- `docs/QA_CHECKLIST.md`: pre-launch checks and their results
