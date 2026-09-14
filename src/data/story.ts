import type { Fact, Founder, MediaAsset } from "@/types/content";
import { site } from "./site";

/**
 * Editorial copy for the homepage and About page. Every statement here is
 * traceable to docs/SOURCE_NOTES.md. Keep claims precise; do not add
 * superlatives or facts that are not in the source material.
 */

export const heroMedia: MediaAsset = {
  kind: "video",
  src: null,
  poster: null,
  alt: "Slow gimbal footage moving through the grounds and stone buildings of Inbavanam",
  brief:
    "Hero video: gimbal footage of the grounds and buildings. Supply MP4 (H.264) and WebM, plus a poster frame.",
};

export const intro = {
  eyebrow: "What is Inbavanam",
  heading: "A space shaped around rest, connection and a larger community purpose.",
  body: [
    `Inbavanam is a retreat space of ${site.landArea} near Karamadai, in the Mettupalayam and Coimbatore region of Tamil Nadu.`,
    "It is run by Gladston Xavier and Florina Xavier, social workers whose work with the surrounding communities is part of the same story. People come here to stay, to gather and to take part.",
  ],
};

export const place = {
  eyebrow: "The land",
  heading: "Land that is worked as well as lived on.",
  body: [
    "Crops have been grown on the land, and vegetables and herbs are dried on site and prepared into powders for additional nutrition.",
    "A list of the birds seen here and a short album of the plants on the site are being prepared.",
  ],
  media: {
    kind: "image",
    src: null,
    alt: "Open land and trees at Inbavanam",
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
    kind: "video",
    src: null,
    poster: null,
    alt: "The founders walking through a stone building at Inbavanam, explaining how it was built",
    brief: "Founder architecture walkthrough video, with captions (VTT).",
  } satisfies MediaAsset,
  facts: [
    {
      label: "Natural cooling",
      body: "Spaces designed to stay cool without relying on conventional air conditioning.",
      verified: false,
    },
    {
      label: "Heavy stone",
      body: "Walls built from stone the founders describe as extremely heavy.",
      verified: false,
    },
    {
      label: "Climate-responsive design",
      body: "Construction that works with the local climate rather than against it.",
      verified: false,
    },
  ] satisfies Fact[],
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
    src: null,
    alt: "A community gathering near Inbavanam",
    brief:
      "Documentary photograph of a community program, with written consent from the people shown and a caption naming the activity.",
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
    kind: "video",
    src: null,
    poster: null,
    alt: "Gladston Xavier and Florina Xavier talking about why they started Inbavanam",
    brief: "Founder interview video (both founders together), with captions.",
  } satisfies MediaAsset,
};

export const founders: Founder[] = [
  {
    name: "Gladston Xavier",
    role: "Co-founder, social worker",
    bio: null,
    portrait: {
      kind: "image",
      src: null,
      alt: "Portrait of Gladston Xavier",
      brief: "Portrait of Gladston Xavier, natural light.",
    },
  },
  {
    name: "Florina Xavier",
    role: "Co-founder, social worker",
    bio: null,
    portrait: {
      kind: "image",
      src: null,
      alt: "Portrait of Florina Xavier",
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
