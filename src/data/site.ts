import type { NavItem } from "@/types/content";

/**
 * The single placeholder string for any fact not yet confirmed by the
 * client. Search the codebase for TBC to find every open item; each one is
 * also recorded in docs/CONTENT_GAPS.md.
 */
export const TBC = "Information to be confirmed";

export const site = {
  name: "Inbavanam",
  proposition: "A place to stay. A space to connect. A community with purpose.",
  heroEyebrow: ["Rooted in people", "Nurturing tomorrow"],
  heroHeadline: ["A place to stay.", "A space to connect.", "A community with purpose."],
  tagline: "People · Place · Purpose",
  locationShort: "Karamadai · Coimbatore",
  /** Source: stakeholder audio. Exact street address is not yet supplied. */
  locationLong: "Near Karamadai, in the Mettupalayam and Coimbatore region of Tamil Nadu",
  /** Source: stakeholder audio ("approximately 5.5 acres"). */
  landArea: "approximately 5.5 acres",
  founders: ["Gladston Xavier", "Florina Xavier"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: {
    src: "/brand/logo.png",
    alt: "Inbavanam logo",
  },
} as const;

/**
 * Contact details are read from the environment so no invented value is ever
 * shipped. Until the client supplies them, the UI shows TBC.
 */
export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || null,
  mapUrl: process.env.NEXT_PUBLIC_MAP_URL || null,
  /** External donation page, once one exists. */
  supportUrl: process.env.NEXT_PUBLIC_SUPPORT_URL || null,
} as const;

export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    description: "Our story and the people behind it",
    art: "people",
  },
  { label: "Stay", href: "/stay", description: "Accommodation and spaces", art: "home" },
  {
    label: "Experiences",
    href: "/experiences",
    description: "Retreats, camps and gatherings",
    art: "sun",
  },
  {
    label: "Our Work",
    href: "/our-work",
    description: "Programs with surrounding communities",
    art: "sprout",
  },
  {
    label: "Community",
    href: "/community",
    description: "Volunteer, support, get involved",
    art: "gathering",
  },
  {
    label: "Events",
    href: "/events",
    description: "Calendar and how the space is used",
    art: "lamp",
  },
  {
    label: "Gallery",
    href: "/gallery",
    description: "Architecture, land and people",
    art: "frame",
  },
  { label: "Contact", href: "/contact", description: "Enquiries and directions", art: "path" },
];

export const supportLink = { label: "Support Inbavanam", href: "/community#support" } as const;
export const enquireLink = { label: "Book / Enquire", href: "/contact?type=stay" } as const;
