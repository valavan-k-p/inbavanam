# QA checklist

Results from the build session on 14 September 2026. "Pass" means checked and
passing; "Open" means not yet possible or not yet done.

## Automated

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run test` (7 files, 34 tests) | Pass |
| `npm run build` (17 routes) | Pass |
| Browser console errors on load | None |
| Dev server errors during the session | None |

Tests cover the radial menu (dialog semantics, Escape, focus return, arrow-key
ring navigation, `aria-current`, accessible descriptions), radial geometry,
date utilities and calendar grid, enquiry validation, rate limiting, admin
resource schemas and the admin redirect guard.

## Responsive (in-browser)

| Width | Pages | Result |
| --- | --- | --- |
| 375 | Home, Contact, mobile menu | Pass: no horizontal overflow; stacked mobile menu renders |
| 768 | Home, Gallery | Pass: no overflow; gallery uses two columns |
| 1024 | Events | Pass: no overflow; calendar renders, today marked |
| 1440 | Home, radial menu | Pass: no overflow; radial layout renders |
| 1920 | Home | Pass: no overflow; content capped at 1440px |

## Accessibility

| Check | Result |
| --- | --- |
| One `h1` per page, no skipped heading levels (home) | Pass |
| Every link and button has an accessible name (home) | Pass |
| Skip link to `#main` | Present |
| Radial menu keyboard use, Escape, focus trap and return | Pass (tests and browser) |
| Form: error summary receives focus, links to fields; `aria-invalid` and `aria-describedby` wired | Pass (browser) |
| Touch targets of at least 24px | Pass after fixing the events empty-state link, event "Enquire" link and footer links |
| Colour contrast | Pass by design; ratios in `DESIGN_SYSTEM.md` |
| Reduced motion | Implemented (Motion `useReducedMotion`, CSS media query, no hero autoplay). Open: not yet checked with the OS setting switched on. |
| Screen reader pass (NVDA or VoiceOver) | Open |

## Brand and content integrity

| Check | Result |
| --- | --- |
| No emoji in UI, copy, metadata or docs | Pass |
| Palette matches the supplied reference | Pass |
| No invented facts; gaps use `TBC` and are listed | Pass (see `CONTENT_GAPS.md`, `SOURCE_NOTES.md`) |
| No stock imagery; missing media is labelled | Pass |
| Official logo renders | **Open: `public/brand/logo.png` is missing from disk.** Logo slots show a broken image until it is restored. |

## Theme v2 (mockup redesign)

| Check | Result |
| --- | --- |
| Typecheck, lint, tests (8 files, 35 tests), production build | Pass |
| Hero headline, eyebrow and bottom bar reveal on first load | Pass after fixing two reveal bugs: clipped "rise" lines never intersected, and elements in the bottom 8% of the first screen never triggered |
| Radial menu opens with 8 medallion links, current page marked | Pass (browser DOM) |
| Menu Escape, focus move and focus return | Pass in unit tests. Not confirmed in the in-app browser: its window was hidden and rendered 0 animation frames, which stalls every transition |
| No horizontal overflow at 375px (home, contact, gallery) and 1440px (home, about) | Pass |
| No tap targets under 24px at 375px (home) | Pass |
| Contact form uses a labelled enquiry-type select | Pass |
| Gallery: 8 filter pills, 10 tiles | Pass |
| Visual review of every page in a visible browser | **Open**: screenshots were unreliable in this session |

## Not yet verifiable

- Supabase flows (sign-in, admin CRUD, enquiry storage, RLS) need a Supabase
  project. The SQL has not been run against a live database yet.
- Real media: hero video behaviour, image quality, captions.
- Lighthouse and Core Web Vitals on a deployed build.
- Tamil content.
