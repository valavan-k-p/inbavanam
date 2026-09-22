import type { Fact, Founder, IllustrationName, MediaAsset } from "@/types/content";
import { site } from "./site";

/**
 * Editorial copy for the public pages. Every factual statement here is
 * traceable to docs/SOURCE_NOTES.md. Headlines are brand copy, not claims.
 * Do not add superlatives, testimonials or facts that are not in the sources.
 */

export const heroMedia: MediaAsset = {
  kind: "image",
  src: "/images/hero image.png",
  alt: "Inbavanam",
  brief: "Centerpiece Inbavanam artwork",
};

/** Hero slideshow, used until the hero video is supplied. */
export const heroSlides: MediaAsset[] = [
  {
    kind: "image",
    src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM.jpeg",
    alt: "The main two-storey brick building at Inbavanam at dusk, standing above the slope",
    brief: "Wide photograph of the buildings and grounds in warm evening light.",
  },
  {
    kind: "image",
    src: "/inbavanam cover/top view inbavanam.png",
    alt: "Aerial view of Inbavanam, its gardens and the cultivated land around it",
    brief: "Landscape of the land around Inbavanam in early morning light.",
  },
  {
    kind: "image",
    src: "/community/community-group-portrait.webp",
    alt: "A large group of children and adults gathered on the open ground at Inbavanam",
    brief: "A gathering on site, photographed with the consent of those shown.",
  },
];

export const intro = {
  eyebrow: "What is Inbavanam",
  heading: "A space shaped around rest, connection and a larger community purpose.",
  body: [
    `Inbavanam is a retreat space of ${site.landArea} near Karamadai, in the Mettupalayam and Coimbatore region of Tamil Nadu.`,
    "It is run by Gladston Xavier and Florina Xavier, social workers whose work with the surrounding communities is part of the same story. People come here to stay, to gather and to take part.",
  ],
};

export const aboutIntro = {
  heading: "A home grown from lived values",
  media: {
    kind: "image",
    src: "/about us image/ab image nbg.png",
    alt: "Gladston Xavier and Florina Xavier with Inbavanam retreat sanctuary and Western Ghats landscape",
    brief: "The founders together on the grounds, natural light.",
  } satisfies MediaAsset,
};

/** Values band. Each pillar maps to a strand of the work in the source material. */
export const pillars: { label: string; body: string; art: IllustrationName }[] = [
  { label: "People", body: "Stronger communities", art: "people" },
  { label: "Nature", body: "A healthier tomorrow", art: "leaf" },
  { label: "Learning", body: "Lifelong growth", art: "book" },
  { label: "Justice", body: "A fairer society", art: "scales" },
];

/** Brand line used as a pull quote. Not attributed to any person. */
export const pullQuote = "A place to pause. A space to connect.";

export const place = {
  media: {
    kind: "image",
    src: "/inbavanam cover/farm.png",
    alt: "Farmland at Inbavanam with cattle grazing against the backdrop of the Western Ghats",
    brief:
      "Wide landscape photograph of the grounds, ideally early morning or late afternoon light.",
  } satisfies MediaAsset,
};

export const architecture = {
  eyebrow: "Architecture",
  heading: "Built with the land in mind.",
  body: [
    "The buildings at Inbavanam are made with unusually heavy stone and are designed to stay cool naturally.",
    "In recorded walkthroughs, the founders explain the materials and the thinking behind the construction.",
  ],
  media: {
    kind: "image",
    src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (13).jpeg",
    width: 1600,
    height: 1066,
    alt: "Elevation of the two-storey brick and stone building at Inbavanam, with arched openings on both floors",
    caption: "The main building: brick, stone and deep shaded openings.",
    brief: "Standing in for the architecture walkthrough video, which is still to be supplied.",
  } satisfies MediaAsset,
  facts: [
    {
      label: "Natural cooling",
      body: "Spaces designed to stay cool without relying on conventional air conditioning.",
      verified: false,
      art: "sun",
    },
    {
      label: "Heavy stone",
      body: "Walls built from stone the founders describe as extremely heavy.",
      verified: false,
      art: "stone",
    },
    {
      label: "Climate-responsive design",
      body: "Construction that works with the local climate rather than against it.",
      verified: false,
      art: "leaf",
    },
  ] satisfies Fact[],
};

export const stayIntro = {
  heading: "Rest well. Feel at home.",
  body: "Spaces for rest, reflection and time together, in buildings shaped by thoughtful, climate-responsive architecture.",
  media: {
    kind: "image",
    src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (21).jpeg",
    alt: "A guest room at Inbavanam with twin beds and handmade yellow Athangudi floor tiles",
    caption: "A guest room with handmade Athangudi tiles.",
    width: 1600,
    height: 1066,
    brief: "Interior of a room with natural light, showing the stone walls.",
  } satisfies MediaAsset,
};

export const experiencesIntro = {
  heading: "Gather. Learn. Rejuvenate.",
  body: "Inbavanam hosts individuals, families, groups and organisations who come to rest, to learn and to celebrate together.",
};

export const workIntro = {
  heading: "People. Programs. Possibilities.",
  body: "Inbavanam supports a range of programs with the communities around it, from education and empowerment to natural farming and access to justice.",
};

export const community = {
  eyebrow: "Community",
  heading: "Rooted in community.",
  body: [
    "Gladston and Florina work alongside the communities around Inbavanam, including tribal and Scheduled Caste communities, on education, health, economic wellbeing and agriculture.",
    "Agricultural support has included teaching farming and making land available for people to use.",
  ],
  media: {
    kind: "image",
    src: "/community/courtyard-session.webp",
    alt: "Children seated on the ground in the brick courtyard at Inbavanam while adults speak to them",
    caption: "A session in the courtyard at Inbavanam.",
    width: 1447,
    height: 1087,
    brief:
      "Documentary photograph of a community program, with written consent from the people shown and a caption naming the activity.",
  } satisfies MediaAsset,
};

export const communityBand = {
  quote: "Stronger communities, a brighter tomorrow.",
  media: {
    kind: "image",
    src: "/community/craft-display.webp",
    alt: "Children holding paper flowers they have made, beneath the Inbavanam sign",
    width: 1411,
    height: 1114,
    brief: "Community program photograph, with consent. Shown with a warm sepia tone.",
  } satisfies MediaAsset,
};

export const galleryIntro = {
  heading: "Moments from Inbavanam",
  body: "Every photograph here will carry a caption saying what it shows, where and when.",
};

export const contactIntro = {
  heading: "Get in touch",
  body: "We are happy to hear from you, whether you would like to stay, attend a program, work together or support what happens here.",
};

export const findUs = {
  media: {
    kind: "image",
    src: "/inbavanam cover/top view inbavanam.png",
    alt: "Aerial view of the buildings at Inbavanam surrounded by gardens, coconut palms and cultivated fields",
    width: 1672,
    height: 941,
    brief: "Wide landscape view of the surroundings, for the Find us band.",
  } satisfies MediaAsset,
};

export const foundersIntro = {
  eyebrow: "Founders",
  heading: "The people behind Inbavanam",
  body: [
    "Gladston Xavier and Florina Xavier are social workers. They created Inbavanam, continue to run it, and describe the organisation as self-funded.",
    "Their story, why Inbavanam began and how they approach community work will be told here in their own words, drawn from the interviews they have recorded.",
  ],
  media: {
    kind: "image",
    src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (4).jpeg",
    width: 1600,
    height: 1066,
    alt: "Gladston Xavier and Florina Xavier seated together outdoors at Inbavanam",
    caption: "Gladston and Florina Xavier at Inbavanam.",
    brief: "Standing in for the founder interview video, which is still to be supplied.",
  } satisfies MediaAsset,
};

export const founders: Founder[] = [
  {
    name: "Gladston Xavier",
    role: "Co-founder, social worker",
    bio: null,
    portrait: {
      kind: "image",
      src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (7).jpeg",
      alt: "Portrait of Gladston Xavier",
      caption: "Portrait of Gladston Xavier, natural light.",
      brief: "Portrait of Gladston Xavier, natural light.",
    },
  },
  {
    name: "Florina Xavier",
    role: "Co-founder, social worker",
    bio: null,
    portrait: {
      kind: "image",
      src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (6).jpeg",
      alt: "Portrait of Florina Xavier",
      caption: "Portrait of Florina Xavier, natural light.",
      brief: "Portrait of Florina Xavier, natural light.",
    },
  },
];

/** Stakeholder statements that need founder sign-off before wider use. */
export const aboutNotes = {
  concept: "The founders describe the idea behind the space as inspired by Auroville.",
};

export const finalCta = {
  heading: "Come and stay, or come and take part.",
  body: "Tell us what you have in mind: a quiet stay, a group gathering, or time given to the work around Inbavanam.",
};
