@AGENTS.md

# Inbavanam

Website for Inbavanam (retreat space and community work near Karamadai,
Coimbatore). The client brief is `prompt/INBAVANAM_MASTER_WEBSITE_PROMPT.md`
(local only, not committed).

## Non-negotiables

- Never invent business facts (rooms, prices, dates, contacts, bios, claims).
  Use `TBC` from `src/data/site.ts` and log the gap in `docs/CONTENT_GAPS.md`.
  Every fact must be traceable in `docs/SOURCE_NOTES.md`.
- No emoji anywhere: UI, copy, metadata, docs, comments.
- Never redraw or recolour `public/brand/logo.png`. On dark surfaces use `<Logo onDark />`.
- No stock imagery of the property. Missing media stays a labelled `MediaFrame` placeholder.

## Conventions

- Copy lives in `src/data/`; components hold layout. Types in `src/types/content.ts`.
- Colour via surface classes (`surface-maroon`, etc.) and semantic tokens; see `docs/DESIGN_SYSTEM.md`
  for contrast rules (stone text never on light surfaces; terracotta text only at large sizes).
- Server Components by default; client only for interaction or Motion.
- Scroll animation uses `Reveal` / `data-reveal` (CSS plus `RevealObserver`), which is safe for text:
  hidden states apply only after the inline `js` script runs. Put `data-reveal="rise"` on the clipping
  wrapper, not the moving child.
- Zod schemas in `src/lib/validations/` run on both client and server.
- Admin content types are config in `src/lib/admin/resources.ts`; every admin action calls `requireStaff()`.

## Commands

`npm run dev`, `npm run check` (typecheck + lint + test), `npm run build`.
