# Design system

Tokens live in `src/app/globals.css`. Components use semantic tokens
(`bg-background`, `text-muted-foreground`, `border-rule`) rather than raw hex
values, so a section's surface class decides every colour inside it.

## Principles

- The real place, people and footage are the heroes; the interface frames them.
- Editorial and architectural: square corners (2px radius), hairline rules
  instead of card shadows, asymmetric grids, generous space.
- Culturally rooted through restraint: one kolam motif per view at most.
- No emoji anywhere. Icons are Lucide (UI only) or the custom line-art set.

## Colour

| Token         | Hex       | Role                                                  |
| ------------- | --------- | ----------------------------------------------------- |
| `maroon`      | `#3C1D1D` | Primary dark surface, primary buttons, menu, founders |
| `maroon-deep` | `#2B1515` | Scrims and dark cards                                 |
| `olive`       | `#534C2F` | Nature and community surfaces, line-art               |
| `walnut`      | `#523320` | Architecture surface, footer, secondary text on light |
| `cream`       | `#D6C6B8` | Principal light canvas                                |
| `ivory`       | `#E8DED4` | Alternate light surface, text on dark                 |
| `stone`       | `#B8A99D` | Secondary text on dark surfaces only                  |
| `terracotta`  | `#A94732` | Accent: kolam lines, markers, focus ring on light     |
| `indigo`      | `#252852` | Accent surface, used once (final call to action)      |
| `ink`         | `#1F1411` | Body text on light                                    |

### Surfaces

Apply one class per section: default (cream), `surface-ivory`,
`surface-maroon`, `surface-walnut`, `surface-olive`, `surface-indigo`. Each
remaps foreground, secondary text, rules and focus colour. Use `on-dark` for UI
laid over video without a solid background.

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
