import type { Experience } from "@/types/content";

/**
 * Ways people use the space, as described in the stakeholder audio.
 * Packages, pricing, capacities and facilities are not yet confirmed.
 */
export const experiences: Experience[] = [
  {
    slug: "retreats",
    title: "Retreats and rest",
    summary: "Time away to slow down, for individuals or small groups.",
    illustration: "sun",
    media: {
      kind: "image",
      src: "/experiences/retreats.jpg",
      alt: "A guest cottage with a tiled roof and open verandah, looking out over coconut groves to the Western Ghats",
      brief: "Calm photograph of a sitting or resting space.",
    },
  },
  {
    slug: "group-stays",
    title: "Group stays",
    summary: "Stays for families, friends and organised groups.",
    illustration: "gathering",
    media: {
      kind: "image",
      src: "/experiences/group-stays.jpg",
      alt: "The two-storey residence at Inbavanam, with brick arches, jaali screens and a round corner pavilion",
      brief: "Photograph of a group stay, with consent.",
    },
  },
  {
    slug: "camps",
    title: "Camps",
    summary: "Residential camps that use the land and shared spaces.",
    illustration: "path",
    media: {
      kind: "image",
      src: "/experiences/camps.jpg",
      alt: "The large hall at Inbavanam, with a high trussed roof, ceiling fans and chairs stacked along one wall",
      brief: "Photograph from a camp.",
    },
  },
  {
    slug: "celebrations",
    title: "Weddings and celebrations",
    summary: "Space for weddings, family occasions and private events.",
    illustration: "lamp",
    media: {
      kind: "image",
      src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (4).jpeg",
      alt: "The round brick pavilion at Inbavanam, open through arches to the trees outside",
      brief: "Photograph from a celebration held on site, to replace this view of the pavilion.",
    },
  },
  {
    slug: "corporate",
    title: "Corporate gatherings",
    summary: "Outings, offsites and trainings for teams and organisations.",
    illustration: "book",
    media: {
      kind: "image",
      src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (5).jpeg",
      alt: "The library at Inbavanam, with brick arches, bookshelves and a ceiling set with blue glass discs",
      brief: "Photograph from a corporate outing or training, to replace this view of the hall.",
    },
  },
];
