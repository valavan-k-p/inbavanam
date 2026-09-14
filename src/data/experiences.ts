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
      src: null,
      alt: "A quiet corner of Inbavanam",
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
      src: null,
      alt: "A group sharing a meal",
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
      src: null,
      alt: "A camp at Inbavanam",
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
      src: null,
      alt: "A celebration at Inbavanam",
      brief: "Photograph from a celebration held on site.",
    },
  },
  {
    slug: "corporate",
    title: "Corporate gatherings",
    summary: "Outings, offsites and trainings for teams and organisations.",
    illustration: "book",
    media: {
      kind: "image",
      src: null,
      alt: "A team gathering outdoors",
      brief: "Photograph from a corporate outing or training.",
    },
  },
];
