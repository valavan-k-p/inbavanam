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

| Item                                                                                                | Status                             |
| --------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Description, photographs and captions for each program                                              | Needed                             |
| Current natural farming status (the sesame and dried-powder notes are historical source statements) | Needed                             |
| Bird list and plant album (described as "being prepared")                                           | Later                              |
| Community sports participation details                                                              | Later                              |
| Volunteer roles, commitment and dates                                                               | Needed                             |
| Donation or payment method for "Support Inbavanam"                                                  | Needed (`NEXT_PUBLIC_SUPPORT_URL`) |
| Consent for any identifiable person in community photographs                                        | **Blocking** for those photographs |

## Events

No dated events have been supplied. The calendar shows an empty state until
events are added in the admin.

## Media

| Asset                                                      | Where                                              |
| ---------------------------------------------------------- | -------------------------------------------------- |
| Hero video (MP4 H.264 + WebM) and poster frame             | `public/videos/hero/` or Supabase Storage          |
| Founder interview video(s), with captions (WebVTT)         | About, homepage Founders section                   |
| Architecture walkthrough video, with captions              | Architecture section                               |
| Gimbal footage of the grounds                              | Hero, gallery                                      |
| Landscape, architecture, farming and community photographs | Throughout; see each placeholder's on-screen brief |

The source notes mention about five recorded videos. None have been supplied yet.

## External channels

LinkedIn, Canva and Substack were mentioned as future channels. No accounts
are linked because none have been confirmed.
