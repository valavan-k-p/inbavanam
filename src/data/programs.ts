import type { IllustrationName, ProgramArea } from "@/types/content";

/**
 * Program areas. Program names come verbatim from the existing-site review
 * document; the grouping follows the master brief (section 15). Detailed
 * descriptions, results and photographs are not yet supplied, so summaries
 * stay general and make no outcome claims.
 */
export const programAreas: ProgramArea[] = [
  {
    slug: "education-and-training",
    title: "Education and Training",
    summary: "Learning programs, workshops and trainings for individuals and organisations.",
    programs: [
      "Education",
      "WISDOM Workshops",
      "Outbound Trainings",
      "Organizational Capacity Building",
    ],
    illustration: "book",
    media: {
      kind: "image",
      src: null,
      alt: "A workshop in progress",
      brief: "Photograph from a workshop or training session, with a caption naming the program.",
    },
  },
  {
    slug: "empowerment",
    title: "Empowerment",
    summary: "Work with children, women and local elected leaders.",
    programs: [
      "Children's Empowerment Programs",
      "Gender Empowerment",
      "Tribal Panchayat Leaders Empowerment",
    ],
    illustration: "hands",
    media: {
      kind: "image",
      src: null,
      alt: "Participants in an empowerment program",
      brief: "Program photograph with consent and caption.",
    },
  },
  {
    slug: "peacebuilding",
    title: "Peacebuilding",
    summary: "Bringing people together across differences.",
    programs: ["Peacebuilding", "Social Cohesion", "Secular Celebrations"],
    illustration: "dove",
    media: {
      kind: "image",
      src: null,
      alt: "A shared celebration",
      brief: "Photograph from a peacebuilding activity or secular celebration, with caption.",
    },
  },
  {
    slug: "natural-farming",
    title: "Natural Farming",
    summary:
      "Sesame has been grown on the land with the aim of pressing it for oil, and vegetables and herbs are dried on site into nutritional powders.",
    programs: ["Natural Farming"],
    illustration: "sesame",
    media: {
      kind: "image",
      src: null,
      alt: "Crops growing at Inbavanam",
      brief: "Current farming photograph, dated, with caption stating the crop and season.",
    },
  },
  {
    slug: "community-engagement",
    title: "Community Engagement",
    summary: "Sport and shared activity as a way of building community.",
    programs: ["Community Sports and Engagement"],
    illustration: "ball",
    media: {
      kind: "image",
      src: null,
      alt: "A community sports session",
      brief:
        "Photograph of a community sports activity, with information on how people can take part.",
    },
  },
  {
    slug: "advocacy",
    title: "Advocacy",
    summary: "Helping people reach the rights and services they are entitled to.",
    programs: ["Access to Justice"],
    illustration: "scales",
    media: {
      kind: "image",
      src: null,
      alt: "An advocacy session",
      brief: "Photograph illustrating advocacy work, with caption.",
    },
  },
  {
    slug: "sustainable-development",
    title: "Sustainable Development",
    summary: "Long-term work on livelihoods, land and local wellbeing.",
    programs: ["Sustainable Development"],
    illustration: "leaf",
    media: {
      kind: "image",
      src: null,
      alt: "Sustainable development work",
      brief: "Photograph with caption describing the activity.",
    },
  },
  {
    slug: "volunteer",
    title: "Volunteer",
    summary: "Ways to give time and skills to the work at and around Inbavanam.",
    programs: ["Volunteer Opportunities"],
    illustration: "sprout",
    media: {
      kind: "image",
      src: null,
      alt: "Volunteers at work",
      brief: "Photograph of volunteers, with caption.",
    },
  },
];

/** Program icon grid: individual programs linked to their area. */
export const programIndex: { name: string; area: string; art: IllustrationName }[] = [
  { name: "Peacebuilding", area: "peacebuilding", art: "dove" },
  { name: "Organizational Capacity Building", area: "education-and-training", art: "stone" },
  { name: "Children's Empowerment", area: "empowerment", art: "sprout" },
  { name: "Outbound Trainings", area: "education-and-training", art: "path" },
  { name: "WISDOM Workshops", area: "education-and-training", art: "lamp" },
  { name: "Education", area: "education-and-training", art: "book" },
  { name: "Gender Empowerment", area: "empowerment", art: "people" },
  { name: "Natural Farming", area: "natural-farming", art: "sesame" },
  { name: "Community Sports and Engagement", area: "community-engagement", art: "ball" },
  { name: "Access to Justice", area: "advocacy", art: "scales" },
  { name: "Tribal Panchayat Leaders Empowerment", area: "empowerment", art: "gathering" },
  { name: "Sustainable Development", area: "sustainable-development", art: "leaf" },
];

export function getProgramArea(slug: string) {
  return programAreas.find((area) => area.slug === slug);
}
