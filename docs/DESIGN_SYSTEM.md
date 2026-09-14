# Design system

Tokens live in `src/app/globals.css`. Components use semantic tokens
(`bg-background`, `text-muted-foreground`, `border-rule`) rather than raw hex
values, so a section's surface class decides every colour inside it.

## Theme v2

Theme v2 follows the client's visual mockup: a light parchment canvas, a
maroon header, circular photo medallions in the radial menu, pill filters,
photo cards, an olive values band, a program icon grid and a light footer.
Content from the mockup that is not confirmed by a source was not adopted
(see `CONTENT_GAPS.md`).

## Principles

- The real place, people and footage are the heroes; the interface frames them.
- Editorial and warm: 4px radius on cards and fields, pill-shaped filters,
  hairline rules, asymmetric grids, generous space.
- Culturally rooted through restraint: kolam in the menu corners, dividers and
  placeholders; thin line-art for programs and values.
- No emoji anywhere. Icons are Lucide (UI only) or the custom line-art set.

## Colour

| Token         | Hex       | Role                                                        |
| ------------- | --------- | ----------------------------------------------------------- |
| `paper`       | `#F3EBDF` | Principal light canvas (v2)                                 |
| `card`        | `#FAF5EE` | Cards, form panel, footer, alternate light sections         |
| `cream`       | `#D6C6B8` | Warm light band (Stay feature)                              |
| `ivory`       | `#E8DED4` | Text on dark, light buttons on dark                         |
| `maroon`      | `#3C1D1D` | Header, menu, primary buttons, founders                     |
| `maroon-deep` | `#2B1515` | Scrims under photography and video                          |
| `olive`       | `#534C2F` | Values band                                                 |
| `olive-deep`  | `#3B3A24` | Olive buttons ("Explore our work", "Support Inbavanam")     |
| `khaki`       | `#A39A6A` | Outline buttons on dark ("Support Inbavanam", "Book / Enquire") |
| `walnut`      | `#523320` | Architecture band, Plan-your-stay strip, secondary text     |
| `stone`       | `#B8A99D` | Secondary text on dark surfaces only                        |
| `terracotta`  | `#A94732` | Accent markers, focus ring on light                         |
| `indigo`      | `#252852` | Reserved accent                                             |
| `ink`         | `#2A1A15` | Body text on light                                          |

### Surfaces

Apply one class per section: default (paper), `surface-card`, `surface-ivory`,
`surface-cream`, `surface-maroon`, `surface-walnut`, `surface-olive`,
`surface-olive-deep`, `surface-indigo`. Each remaps foreground, secondary
text, rules and focus colour. Use `on-dark` for UI laid over photography or
video without a solid background.

### Theme v2 contrast (WCAG 2.2)

| Pair                   | Ratio | Allowed use                    |
| ---------------------- | ----- | ------------------------------ |
| ink on paper           | 14.13 | All text                       |
| ink on card            | 15.40 | All text                       |
| walnut on paper        | 9.58  | Secondary text                 |
| terracotta on paper    | 4.89  | Text, markers, focus ring      |
| terracotta on card     | 5.33  | Text, markers                  |
| khaki on maroon        | 5.33  | Button borders (non-text)      |
| ivory on olive-deep    | 8.71  | All text                       |
| stone on olive-deep    | 5.06  | Secondary text                 |

## Animation

Motion is richer in v2 but always switches off under `prefers-reduced-motion`.

| Where | What | How |
| --- | --- | --- |
| Every section | Headings, text and cards rise and fade in; images wipe open from the top with a slow zoom-out | `data-reveal` (`up`, `fade`, `left`, `right`, `scale`, `clip`, `rise`) plus `RevealObserver`. CSS only; hidden states apply only after an inline script adds `js` to `<html>`, so nothing is hidden without JavaScript |
| Page changes | Content fades and rises on client navigation | `app/(marketing)/template.tsx` (not on first load) |
| Header | Transparent over the hero, maroon after scrolling; hides while scrolling down, returns on scroll up or keyboard focus | `SiteHeader` |
| Hero | Three-slide crossfade with a slow zoom, progress bar, pause control; headline lines rise in from a mask | `HeroSlideshow`, `data-reveal="rise"` |
| Watch our story | Pulsing ring on the play button; video opens in a dialog | `StoryButton` |
| Radial menu | Ring draws, medallions spring out from the centre along the circle, centre text changes on hover or focus | Motion springs in `SiteMenu` |
| Filters | Active pill highlight glides between options; gallery tiles animate their layout when filtered | `PillGroup` (`layoutId`), Motion `layout` |
| Gallery wall | Photographs on the face of a sphere: tiles fly in from depth, the wall is dragged with momentum and wraps endlessly, tiles are greyscale until pointed at, and an opened tile zooms out of the wall into the lightbox. Arrow keys move the wall, Enter opens the centred photograph, and a Grid view is always one click away | `GalleryWall` (CSS 3D, one animation loop that runs only while moving); grid by default under reduced motion |
| Hover | Card lift, image zoom, arrow nudge, underline draw, icon lift | CSS transitions |
| Kolam | Border strands draw themselves on scroll | `KolamDivider` |

### Measured contrast (WCAG 2.2)

| Pair                | Ratio | Allowed use                                                                |
| ------------------- | ----- | -------------------------------------------------------------------------- |
| ink on cream        | 10.83 | All text                                                                   |
| ink on ivory        | 13.57 | All text                                                                   |
| walnut on cream     | 6.81  | Secondary text                                                             |
| olive on cream      | 5.17  | Text                                                                       |
| ivory on maroon     | 11.42 | All text                                                                   |
| stone on maroon     | 6.64  | Secondary text                                                             |
| stone on walnut     | 4.96  | Secondary text                                                             |
| stone on olive      | 3.77  | **Large text only.** `surface-olive` uses cream for secondary text (5.17). |
| ivory on indigo     | 10.53 | All text                                                                   |
| terracotta on cream | 3.47  | **Large text and non-text only** (markers, focus ring)                     |
| terracotta on ivory | 4.36  | Large text and non-text only                                               |
| stone on cream      | 1.37  | **Never**                                                                  |

The focus ring is terracotta on light surfaces (3.47:1 against cream, above the
3:1 non-text minimum) and cream on dark surfaces.

## Typography

| Role                 | Face                                          | Notes                                       |
| -------------------- | --------------------------------------------- | ------------------------------------------- |
| Display and headings | Cormorant Garamond 400 to 600, with italic    | Only at 24px and above; never for body copy |
| Body and UI          | Manrope (variable)                            | 16px base, 1.65 line height                 |
| Labels               | Manrope 600, uppercase, 0.22em tracking, 12px | The `label` utility                         |

Both load through `next/font` (self-hosted, `display: swap`). The stacks fall
back to Noto Serif Tamil and Noto Sans Tamil so Tamil text renders naturally;
load those faces through `next/font` when Tamil content is added.

Fluid scale (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lede`)
uses `clamp()`. Headings use `text-wrap: balance`, paragraphs `pretty`.

The UI UX Pro Max first pass suggested Playfair Display with Karla or Inter.
Cormorant Garamond with Manrope was kept because the brief names both, the
pairing reads as editorial without Playfair's fashion-magazine associations,
and Manrope stays legible at small UI sizes.

## Space and layout

- `container-page`: max width 90rem with a fluid gutter (`--gutter`, 20 to 48px).
- `section-y`: fluid vertical rhythm (72 to 144px).
- 12-column grids on large screens; content usually spans 5 to 7 columns,
  offset for asymmetry.
- `prose-measure`: 38rem maximum line length.
- Minimum touch target 44px (`min-h-11`), buttons 48px.

## Motion

| Token                                   | Value                            |
| --------------------------------------- | -------------------------------- |
| `--ease-out-soft`                       | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--dur-fast` / `base` / `slow` / `draw` | 180 / 320 / 640 / 1100 ms        |

Uses: kolam line drawing, media rise-and-fade (images only, so text never
depends on JavaScript), radial menu reveal. Everything respects
`prefers-reduced-motion`: Motion components render the final state, CSS
transitions collapse to near zero, and the hero video does not autoplay.

## Texture and pattern

- `grain`: a low-opacity SVG noise layer for dark and olive surfaces. Never
  under long body text on light surfaces.
- Kolam: `KolamDivider` (a two-strand pulli border generated in
  `kolam-paths.ts`) and `KolamKnot` (3 x 3 pulli knot for the menu centre and
  media placeholders).
- Line-art: `LineArt` in `src/components/illustrations/line-art.tsx`. One
  stroke weight (1.25 on a 64-unit grid), round caps. People are drawn
  abstractly (the "gathering" motif) and never as caricature.

## Logo

`public/brand/logo.png` is black ink on a transparent ground. It is never
recoloured or redrawn. On dark surfaces it sits on an ivory disc (the `onDark`
prop of `Logo`).

## Agent-tool conflicts

UI UX Pro Max's generated system recommended Liquid Glass styling, a navy and
blue palette, a testimonial carousel and GSAP. All four conflict with the brief
(no glassmorphism, fixed palette, no testimonials, Motion for React) and were
not adopted. Its accessibility, touch-target and reduced-motion guidance was
adopted.
