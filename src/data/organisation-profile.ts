import type { IllustrationName, MediaAsset } from "@/types/content";

export interface CommunityProfile {
  name: string;
  tag: string;
  location: string;
  scale: string;
  context: string;
  challenges: string[];
  initiatives: string[];
}

export interface ProgrammePillar {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  art: IllustrationName;
  highlights: string[];
  keyFacts?: { label: string; value: string }[];
}

export interface ResourceCentreFeature {
  title: string;
  description: string;
  icon: IllustrationName;
}

export interface CoreApproachPrinciple {
  title: string;
  summary: string;
  art: IllustrationName;
}

export const profileOverview = {
  eyebrow: "Organisation profile",
  heading: "Rooted in community and land",
  tagline: "Happy Forest",
  lede: "Inbavanam works with two villages near Karamadai: Kandiyur and Bagavathi Amman Koil, in Coimbatore district, Tamil Nadu. The families there have little land and low incomes. The work is about changing that, with them.",
  foundingPriorities: [
    {
      title: "School and reading",
      description:
        "Helping children stay in school, learn well, and go on to college, often as the first in their family to do so.",
    },
    {
      title: "Farming and earning",
      description:
        "Farming together, growing food without chemicals, and finding steady ways for families to earn.",
    },
  ],
};

/**
 * One photograph per profile section. Real Inbavanam photographs only; the
 * alt text describes what is in the frame, not what the section claims.
 */
export const profileMedia = {
  communities: {
    kind: "image",
    src: "/community/community-group-portrait.webp",
    alt: "A large group of children and adults gathered on open ground at Inbavanam, with the hills behind them",
    caption: "Everyone together at the end of a children's programme.",
    width: 1448,
    height: 1086,
  } satisfies MediaAsset,
  programmes: {
    kind: "image",
    src: "/community/drawing-workshop.webp",
    alt: "Children drawing on the floor of the open-sided hall while a facilitator works at a whiteboard",
    caption: "A learning session in the open hall.",
    width: 1448,
    height: 1086,
  } satisfies MediaAsset,
  centre: {
    kind: "image",
    src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (25).jpeg",
    alt: "The sunlit hall at the resource centre, open on one side to the valley",
    caption: "The hall used for workshops, trainings and community meetings.",
    width: 1600,
    height: 1066,
  } satisfies MediaAsset,
};

export const communitiesServed: CommunityProfile[] = [
  {
    name: "Kandiyur AD Colony",
    tag: "Village",
    location: "Mettupalayam Taluk, Coimbatore district",
    scale: "About 75 families",
    context:
      "For generations, the men and women here have worked on other people's farms for a daily wage. Most families own no land, the work is not steady, and it is hard to save.",
    challenges: [
      "Generational dependence on daily-wage agricultural labor",
      "High rates of school dropout and limited formal adult schooling",
      "Landlessness and irregular seasonal employment",
      "Indebtedness and lack of institutional financial safety nets",
    ],
    initiatives: [
      "Classes and coaching so children keep going to school",
      "Farming together on land the community can use",
      "Help with identity cards and government welfare papers",
      "Talking things through with families and deciding together",
    ],
  },
  {
    name: "Bagavathi Amman Koil",
    tag: "Irular community",
    location: "Near Kandiyur, foothills of the Western Ghats",
    scale: "About 18 families",
    context:
      "An Irular settlement. The families once lived from the forest, with their own knowledge of medicine and of catching snakes. After moving to the plains they took daily-wage work. The children were not in school.",
    challenges: [
      "Children historically un-enrolled in formal government schooling",
      "Transition from traditional forest life to daily-wage uncertainty",
      "Distance from local administrative offices and civic entitlements",
      "Limited representation in village governance structures",
    ],
    initiatives: [
      "Reading classes, health and hygiene, and trips to the library",
      "Getting children admitted to the government school",
      "Introducing people to the Panchayat office",
      "Help with tribal cards, Aadhaar cards and welfare schemes",
    ],
  },
];

export const programmePillars: ProgrammePillar[] = [
  {
    id: "education",
    title: "School and learning",
    subtitle: "The village learning centres",
    summary:
      "Learning centres inside the villages, so children can get help with their studies close to home.",
    art: "book",
    highlights: [
      "Over 40 children participate in daily learning and mentorship in each village center",
      "Supported 9 first-generation girl learners with college admissions, mentorship, and scholarships",
      "Deployment of 6 volunteer-sourced computers to introduce children to digital literacy tools",
      "Parent counselling, literacy encouragement, and regular visits to local libraries",
    ],
    keyFacts: [
      { label: "Community Centres", value: "2 Villages" },
      { label: "Children Enrolled", value: "80+ Learners" },
      { label: "Girl Scholars", value: "9 in College" },
      { label: "Digital Tools", value: "6 Computers" },
    ],
  },
  {
    id: "agriculture",
    title: "Farming together",
    subtitle: "Community farming model",
    summary:
      "About five acres farmed as a group. Families who own no land plan, grow and harvest together, and share what the farm earns.",
    art: "sprout",
    highlights: [
      "Access to land, shared irrigation, and organic soil enrichment techniques",
      "Crop experimentation with nutrient-rich millets and successful banana cultivation",
      "Livelihood diversification: poultry, country-bred chickens, goat rearing, and fish culture",
      "On-site tree nursery producing native saplings for homes, streets, and community spaces",
    ],
    keyFacts: [
      { label: "Collective Land", value: "~5 Acres" },
      { label: "Farming Method", value: "100% Organic" },
      { label: "Key Harvests", value: "Bananas & Millets" },
      { label: "Diversification", value: "Livestock & Fish" },
    ],
  },
  {
    id: "justice",
    title: "Rights and entitlements",
    subtitle: "Rights and papers",
    summary:
      "Helping people get the papers they need, and showing them how to deal with government offices.",
    art: "hands",
    highlights: [
      "Facilitating applications for essential tribal community certificates and identity cards",
      "Enabling access to Aadhaar cards, ration cards, and PAN cards required for welfare programs",
      "Rights-awareness workshops, field visits, and legal entitlement literacy",
      "Support for navigating administrative, banking, and government welfare portals",
    ],
    keyFacts: [
      { label: "Key Focus", value: "Tribal Certificates" },
      { label: "Civic Access", value: "Welfare & Banking" },
      { label: "Approach", value: "Rights Education" },
    ],
  },
  {
    id: "leadership",
    title: "Tribal leadership",
    subtitle: "A voice in the Panchayat",
    summary:
      "Training tribal Panchayat leaders to speak for their communities, and bringing different communities closer.",
    art: "gathering",
    highlights: [
      "Leadership training and rights-awareness sessions for elected tribal representatives",
      "Regular hamlet visits by field workers and volunteers to facilitate community dialogue",
      "Promoting interfaith dialogue, reconciliation initiatives, and shared cultural events",
      "Bridging historic social divides and nurturing an inclusive sense of collective belonging",
    ],
    keyFacts: [
      { label: "Focus", value: "Panchayat Leaders" },
      { label: "Methods", value: "Dialogue & Training" },
      { label: "Outcome", value: "Inclusive Governance" },
    ],
  },
  {
    id: "peacebuilding",
    title: "Peacebuilding and conflict transformation",
    subtitle: "Workshops on conflict",
    summary:
      "Three-day workshops for social workers, colleges and community workers. They cover handling conflict and repairing relationships.",
    art: "stone",
    highlights: [
      "In-depth analysis of structural conflict, relationship mapping, and mediation tools",
      "Explores core themes of Truth, Mercy, Justice, Peace, Nonviolence, and Reconciliation",
      "Participatory exercises, real-life case studies, and practical personal reflection",
      "Equipping participants to act as active peace ambassadors across civil society",
    ],
    keyFacts: [
      { label: "Format", value: "3-Day Workshop" },
      { label: "Participants", value: "NGOs & Colleges" },
      { label: "Core Focus", value: "Dialogue & Mediation" },
    ],
  },
  {
    id: "capacity-building",
    title: "Organisational capacity building",
    subtitle: "Help for other organisations",
    summary:
      "Helping charities and colleges look again at what they do, why they do it, and how to keep it going.",
    art: "sun",
    highlights: [
      "Interactive workshops on strategic planning, mission relevance, and impact assessment",
      "Assisting organisations in evaluating past achievements and mapping future capacity",
      "Collaborations with institutions including OfERR, NDWT, VTMS, and Nirmala College",
      "Grounded in decades of international and grassroots social work experience",
    ],
    keyFacts: [
      { label: "Partners", value: "OfERR, NDWT, VTMS..." },
      { label: "Outcome", value: "Strategic Direction" },
      { label: "Approach", value: "Collective Analysis" },
    ],
  },
];

export const resourceCentreProfile = {
  eyebrow: "Living demonstration site",
  heading: "The Inbavanam Resource Centre",
  summary:
    "A place to stay and learn, in the foothills of the Western Ghats. It is also an example: a building and a farm that run gently on the land.",
  capacity: [
    { label: "Training hall", value: "Up to 60 people" },
    { label: "Rooms", value: "Up to 30 guests" },
    { label: "Land", value: "5.5 acre farm" },
    { label: "Power", value: "Solar" },
  ],
  features: [
    {
      title: "Water used twice",
      description:
        "Water from the fish tanks feeds the crops, and water from the bio-toilets is cleaned and used on the gardens.",
      icon: "sprout" as IllustrationName,
    },
    {
      title: "Sun for power and cooking",
      description:
        "Solar panels make the electricity, sun ovens do some of the cooking, and the rooms are built for daylight and a through breeze.",
      icon: "sun" as IllustrationName,
    },
    {
      title: "Stone and reused materials",
      description:
        "Thick stone walls keep the rooms cool. Old timber and other salvaged materials were used again rather than thrown away.",
      icon: "stone" as IllustrationName,
    },
    {
      title: "Room for wildlife",
      description:
        "Peacocks, bulbuls, owls, rabbits and deer live here too, alongside everything else that happens on the land.",
      icon: "leaf" as IllustrationName,
    },
  ],
  groupsServed: [
    "Sri Lankan Tamil refugee community members",
    "Indigenous tribal children and elected representatives",
    "Rural women's self-help group federations",
    "College students, university researchers, and faculty",
    "Civil society organisations, activists, and volunteers",
    "Institutions seeking restorative outbound retreats",
  ],
};

export const corePrinciples: CoreApproachPrinciple[] = [
  {
    title: "Working together",
    summary: "We work with people, not for them. The village decides what happens.",
    art: "gathering",
  },
  {
    title: "Education first",
    summary: "Reading and schooling come first. Everything else gets easier after that.",
    art: "book",
  },
  {
    title: "Strength in numbers",
    summary:
      "Groups get further than individuals, so we help form farming groups, women's groups and youth groups.",
    art: "hands",
  },
  {
    title: "Showing, not telling",
    summary:
      "People believe what they can see. The farm, the solar power and the water system are all open to visitors.",
    art: "sprout",
  },
  {
    title: "Caring for the land",
    summary: "Farming, power and building are all done with the next generation in mind.",
    art: "sun",
  },
  {
    title: "Rights and dignity",
    summary:
      "People should be able to get their papers, claim what is theirs by right, and have a say in local government.",
    art: "people",
  },
];
