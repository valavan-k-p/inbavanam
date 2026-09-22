# Content gaps

Everything the site needs from the client before launch. Nothing below has
been invented: the site shows "Information to be confirmed" (the `TBC`
constant in `src/data/site.ts`) or a labelled media placeholder until each
item is supplied.

Status key: **Blocking** means launch should wait for it. **Needed** means
the page works without it but reads as unfinished. **Later** can follow launch.

## Brand

| Item                                                             | Status       | Where it is used                                                                                                                                                                 |
| ---------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Official logo file at `public/brand/logo.png`                    | **Blocking** | Radial menu centre, mobile menu, footer, favicon, admin sign-in. The file was present at the start of the build session and then went missing from disk; it must be copied back. |
| Favicon and app-icon derivatives of the logo (square PNG, 512px) | Needed       | `src/app/layout.tsx` metadata currently points at the full logo.                                                                                                                 |
| Open Graph share image (1200 x 630)                              | Needed       | Add as `src/app/opengraph-image.png`.                                                                                                                                            |

## Contact and location

| Item                                  | Status       | Where                                                                   |
| ------------------------------------- | ------------ | ----------------------------------------------------------------------- |
| Contact email                         | **Blocking** | Footer, Contact page (`NEXT_PUBLIC_CONTACT_EMAIL`)                      |
| Phone number                          | Needed       | Footer, Contact page (`NEXT_PUBLIC_CONTACT_PHONE`)                      |
| Street address                        | Needed       | Contact page, Location section, structured data                         |
| Map link or directions                | Needed       | Location section (`NEXT_PUBLIC_MAP_URL`)                                |
| Where enquiry notifications should go | **Blocking** | Enquiries are stored in Supabase; email notification needs a recipient. |

## Stay

| Item                                                           | Status                         |
| -------------------------------------------------------------- | ------------------------------ |
| Number of rooms or spaces, and their names                     | **Blocking** for the Stay page |
| Capacity per room                                              | Needed                         |
| Amenities per room                                             | Needed                         |
| Photographs of each room                                       | Needed                         |
| Check-in and check-out times, house rules, cancellation policy | Needed before any booking flow |
| Prices (only if the client wants them published)               | Later                          |

## Experiences

The celebrations and corporate cards currently show photographs of the
spaces themselves (the round pavilion and the library) as stand-ins: no
photograph of an actual celebration or corporate gathering has been
supplied. Their alt text describes the space, not an event.

Packages, capacities, facilities and pricing for retreats, group stays,
camps, weddings and celebrations, and corporate gatherings.

## Architecture

| Item                                                                                               | Status                                                                     |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Exact name of the stone used in construction (uncertain in the audio)                              | Needed. The site currently says "unusually heavy stone" without naming it. |
| Confirmation that the "no conventional air conditioning" statement applies, and to which buildings | Needed. Marked `verified: false` in `src/data/story.ts`.                   |
| Any further green-infrastructure details                                                           | Later                                                                      |

## Founders and team

| Item                                                        | Status                        |
| ----------------------------------------------------------- | ----------------------------- |
| Founder biographies approved by Gladston and Florina Xavier | Needed                        |
| Founder portraits                                           | Needed                        |
| Confirmation of the Auroville-inspired concept wording      | Needed (`aboutNotes.concept`) |
| Confirmation of "self-funded" wording                       | Needed                        |
| Staff introductions and bios                                | Later                         |
| Timeline of the past five years and more                    | Needed (About page)           |

## Our Work and community

| Item                                                                                                | Status                                                         |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Description, photographs and captions for each program                                              | Needed                                                         |
| Current natural farming status (the sesame and dried-powder notes are historical source statements) | Needed                                                         |
| Bird list and plant album (described as "being prepared")                                           | Later                                                          |
| Community sports participation details                                                              | Later                                                          |
| Volunteer roles, commitment and dates                                                               | Needed                                                         |
| Donation or payment method for "Support Inbavanam"                                                  | Needed (`NEXT_PUBLIC_SUPPORT_URL`)                             |
| Consent for any identifiable person in community photographs                                        | **Blocking**. See "Community photographs now published" below. |

## Community photographs now published

Eleven photographs supplied by the client (originally `public/old images/`,
now `public/community/`) are in use on the site. Every one of them shows
identifiable people, and most show children. The consent row above is still
**Blocking**: written consent is needed for each of these before launch, and
any photograph without it must be removed.

| File in `public/community/`     | Where it is used                                      | Shows                                                          |
| ------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| `courtyard-session.webp`        | Community section (`community.media`), Community page | Children seated in the courtyard, adults speaking              |
| `drawing-workshop.webp`         | Our Work: Education and Training                      | Children drawing in the open hall, facilitator at a whiteboard |
| `craft-display.webp`            | Our Work: Empowerment                                 | Children holding paper flowers under the Inbavanam sign        |
| `community-group-portrait.webp` | Our Work: Peacebuilding                               | Large group of children and adults on open ground              |
| `circle-game.webp`              | Our Work: Community Engagement                        | Children playing a circle game in the hall                     |
| `pavilion-session.webp`         | Gallery (Community)                                   | Children seated in the round pavilion                          |
| `group-game.webp`               | Gallery (Community)                                   | Children holding hands in a circle                             |
| `drawing-book.webp`             | Gallery (Community)                                   | An open drawing book held up                                   |
| `nature-drawing-sheet.webp`     | Gallery (Community)                                   | A drawing of an apple and birds                                |
| `child-drawing.webp`            | Gallery (People)                                      | A child drawing on the floor                                   |
| `child-flower-drawing.webp`     | Gallery (People)                                      | A boy holding up his drawing                                   |

Stand-ins, as with Experiences: the Peacebuilding, Empowerment and Community
Engagement cards carry photographs of children's programs rather than of
those specific activities. The captions describe what each photograph
actually shows and name no program. Replace them when program-specific
photographs are supplied.

## No empty frames anywhere

At the client's instruction, every media slot on the site now carries a real
Inbavanam photograph; no labelled placeholder is left on any page. Several of
those photographs are stand-ins, so the underlying gap is still open even
though nothing looks unfinished:

| Slot                                      | What it shows now                             | What is still wanted                                     |
| ----------------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| Architecture section (home, Stay)         | Elevation of the two-storey building          | The architecture walkthrough video, with captions        |
| Founders section (home)                   | Gladston and Florina Xavier seated outdoors   | The founder interview video, with captions               |
| Stay intro                                | A guest room with yellow Athangudi tiles      | Photographs of the actual rooms once rooms are confirmed |
| Accommodation template (development only) | A bedroom with blue Athangudi tiles           | Real room photographs                                    |
| Our Work: Natural Farming                 | The tractor beside the farm cottage           | A dated photograph of the crops, naming crop and season  |
| Our Work: Advocacy                        | The community hall                            | A photograph of advocacy work, with caption              |
| Our Work: Sustainable Development         | The aerial view of the land                   | A photograph of the activity itself                      |
| Our Work: Volunteer                       | A drawing session in the open hall            | Volunteers at work, once roles are confirmed             |
| Hero slideshow (not currently rendered)   | Building at dusk, aerial view, group portrait | The hero video and gimbal footage                        |

The alt text and captions on these describe what is actually in each
photograph, so nothing on the page claims to show an activity it does not.

`public/about us image/ab image.png` is the same composite as the
`ab image nbg.png` file already in use, with a cream background instead of a
transparent one. It is unused; delete it unless a solid-background version
is wanted somewhere.

## Events

No dated events have been supplied. The calendar shows an empty state until
events are added in the admin.

## Media

| Asset                                                      | Where                                                                                                                                         |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero video (MP4 H.264 + WebM) and poster frame             | `public/videos/hero/` or Supabase Storage                                                                                                     |
| Founder interview video(s), with captions (WebVTT)         | About, homepage Founders section                                                                                                              |
| Architecture walkthrough video, with captions              | Architecture section                                                                                                                          |
| Gimbal footage of the grounds                              | Hero, gallery                                                                                                                                 |
| Landscape, architecture, farming and community photographs | Throughout; see each placeholder's on-screen brief. The Find us band now uses the aerial photograph `inbavanam cover/top view inbavanam.png`. |

The source notes mention about five recorded videos. None have been supplied yet.

## External channels

LinkedIn, Canva and Substack were mentioned as future channels. No accounts
are linked because none have been confirmed.

## From the theme mockup (not used)

The visual mockup supplied for theme v2 contained sample content. The layout
and styling were adopted; the following content was not, because it is not
confirmed by any source:

| Mockup content                                                                                                    | What the site does instead                                                              |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Phone "+91 98765 43210" and email "hello@inbavanam.org"                                                           | Shows "Information to be confirmed" until real values are set                           |
| Room names (Heritage Room, Garden Cottage, Family Stay) and room-type tabs (Cottages, Family spaces, Group stays) | No rooms listed until supplied; tabs return when rooms have categories                  |
| Quote "A meaningful life is a shared life" attributed to the founders                                             | Unattributed brand line "A place to pause. A space to connect."                         |
| Instagram, Facebook and YouTube icons                                                                             | Omitted until accounts are confirmed                                                    |
| Privacy and Terms links                                                                                           | Omitted; a privacy notice is **Needed** because the enquiry form collects personal data |
| Photographs of the property, founders and community                                                               | Labelled placeholders; real photographs are needed                                      |
| A different logo mark (sprout)                                                                                    | The supplied logo is used                                                               |
