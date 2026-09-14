# Content model

Types are defined once in `src/types/content.ts`. Two sources feed them:

1. **Local typed data** in `src/data/` for editorial copy and for collections
   until the database has content.
2. **Supabase** (`supabase/migrations/`) for collections managed in the admin.

`src/lib/db/content.ts` reads published rows from Supabase when it is
configured and otherwise returns the local data, so components never need to
know where content came from.

## Where each kind of content lives

| Content                                            | Source                                                | Edited in                                               |
| -------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| Brand name, proposition, location line, navigation | `src/data/site.ts`                                    | Code                                                    |
| Homepage and About copy                            | `src/data/story.ts`                                   | Code                                                    |
| Program areas and program names                    | `src/data/programs.ts`                                | Code (the `programs` table is ready for longer stories) |
| Experiences                                        | `src/data/experiences.ts`                             | Code (the `experiences` table is ready)                 |
| Accommodations                                     | `accommodations` + `accommodation_images`             | Admin                                                   |
| Events                                             | `events`                                              | Admin                                                   |
| Gallery                                            | `gallery_items`                                       | Admin                                                   |
| Founders, team, volunteer roles                    | `founders`, `team_members`, `volunteer_opportunities` | Admin                                                   |
| Contact details                                    | Environment variables                                 | Hosting dashboard                                       |
| Enquiries                                          | `enquiries` (written by the public, read by staff)    | Admin inbox                                             |

## Media

- `MediaAsset.src = null` means "not supplied yet". `MediaFrame` then shows a
  labelled placeholder with a brief describing the photograph needed.
- In Supabase, media is stored in the public `media` bucket; rows hold the
  storage path (for example `architecture/stone-wall.jpg`). `mediaUrl()`
  converts paths to public URLs.
- Every photograph needs `alt` text. Program and event photographs should also
  have a caption saying what, where and when, as the review document asks.

## Placeholders

Use the `TBC` constant ("Information to be confirmed") for any missing fact,
and record it in `docs/CONTENT_GAPS.md`. Never substitute plausible-sounding
values.

## Adding Tamil

Copy is concentrated in `src/data/` and `SectionHeading` or page components.
To add Tamil, move those strings into per-locale dictionaries, add a
`[locale]` segment above `(marketing)`, and load Noto Serif Tamil and Noto
Sans Tamil through `next/font` (the font stacks already reference them).
Layouts avoid fixed-width text boxes, so longer Tamil strings wrap naturally.

## Adding an admin content type

Add an entry to `adminResources` in `src/lib/admin/resources.ts` (table,
fields, list columns) and a matching table with RLS policies in a new
migration. The list, create, edit, publish and delete screens are generated
from that config.
