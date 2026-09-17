import type { IllustrationName } from "@/types/content";

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
  eyebrow: "Organisation Profile",
  heading: "Inbavanam: Rooted in Community & Land",
  tagline: "Happy Forest",
  lede: "A community-development initiative focused on the sustainable development and empowerment of economically and socially marginalised communities in and around Kandiyur and Bagavathi Amman Koil villages in the Coimbatore district of Tamil Nadu.",
  foundingPriorities: [
    {
      title: "Education & Literacy",
      description: "Preventing school dropouts, nurturing foundational learning, and opening pathways to higher education for first-generation learners.",
    },
    {
      title: "Collective & Sustainable Livelihoods",
      description: "Cultivating shared agriculture, natural farming, and diversified local livelihoods that offer dignity, economic security, and land access.",
    },
  ],
};

export const communitiesServed: CommunityProfile[] = [
  {
    name: "Kandiyur AD Colony",
    tag: "Settlement",
    location: "Mettupalayam Taluk, Coimbatore District",
    scale: "Approximately 75 families",
    context:
      "A historically marginalised community where generations of men and women have worked as agricultural labourers on landlords' farms, facing daily-wage precarity, landlessness, and limited opportunities to build financial security.",
    challenges: [
      "Generational dependence on daily-wage agricultural labor",
      "High rates of school dropout and limited formal adult schooling",
      "Landlessness and irregular seasonal employment",
      "Indebtedness and lack of institutional financial safety nets",
    ],
    initiatives: [
      "Community student coaching and educational retention support",
      "Collective farming model on community-accessed agricultural land",
      "Documentation support for government welfare and identity cards",
      "Counselling, family dialogue, and collective decision-making",
    ],
  },
  {
    name: "Bagavathi Amman Koil",
    tag: "Indigenous Community",
    location: "Near Kandiyur, foothills of the Western Ghats",
    scale: "Approximately 18 families (Irular community)",
    context:
      "An Irular tribal settlement whose people historically practiced forest-based livelihoods, including traditional medicinal knowledge and snake catching. Transitioning to the plains, families became dependent on daily-wage labor, and children were outside the formal schooling system.",
    challenges: [
      "Children historically un-enrolled in formal government schooling",
      "Transition from traditional forest life to daily-wage uncertainty",
      "Distance from local administrative offices and civic entitlements",
      "Limited representation in village governance structures",
    ],
    initiatives: [
      "Literacy classes, hygiene awareness, and public library visits",
      "Advocacy for government-school admissions and enrollment",
      "Connecting community members with the local Panchayat office",
      "Facilitating tribal cards, Aadhaar cards, and social welfare access",
    ],
  },
];

export const programmePillars: ProgrammePillar[] = [
  {
    id: "education",
    title: "Education & Foundational Learning",
    subtitle: "Will Power Coaching Centres",
    summary:
      "Community-based activity centres established right inside the villages so children receive warm, accessible educational support close to home.",
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
    title: "Collective Agriculture & Livelihoods",
    subtitle: "Community Farming Model",
    summary:
      "A ~5-acre farming collective enabling landless agricultural labourers to plan, cultivate, and harvest together with shared responsibility and profit distribution.",
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
    title: "Access to Justice & Entitlements",
    subtitle: "Legal Literacy & Public Documentation",
    summary:
      "Bridging the gap between marginalised communities and the public institutions that serve them by securing essential constitutional documentation.",
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
    title: "Tribal Leadership & Social Cohesion",
    subtitle: "Participatory Local Governance",
    summary:
      "Strengthening formal and informal tribal Panchayat leaders to represent their communities effectively while fostering inter-community respect and harmony.",
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
    title: "Peacebuilding & Conflict Transformation",
    subtitle: "Three-Day Experiential Workshops",
    summary:
      "Intensive training for social workers, academic institutions, and community workers, moving beyond simple dispute resolution toward systemic transformation.",
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
    title: "Organisational Capacity Building",
    subtitle: "Strengthening Civil Society",
    summary:
      "Facilitating strategic reviews, mission alignment, and operational sustainability assessments for non-profits and educational institutions.",
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
  eyebrow: "Living Demonstration Site",
  heading: "The Inbavanam Resource Centre",
  summary:
    "Positioned as both a residential learning venue and a living demonstration of sustainable architecture and environmental stewardship in the foothills of the Western Ghats.",
  capacity: [
    { label: "Workshop Training Hall", value: "Up to 60 Participants" },
    { label: "Residential Lodging", value: "Up to 30 Guests" },
    { label: "Land Area", value: "5.5 Acres Demonstration Farm" },
    { label: "Campus Energy", value: "Solar Powered & Efficient" },
  ],
  features: [
    {
      title: "Closed-Loop Water Recycling",
      description:
        "Nutrient-rich effluent from freshwater fish culture is circulated for crop irrigation, and treated water from bio-toilets nourishes landscaping and plants.",
      icon: "sprout" as IllustrationName,
    },
    {
      title: "Renewable Energy & Solar",
      description:
        "Harnessing abundant Tamil Nadu sunlight through photovoltaic electricity, sun ovens for cooking, and natural daylit architectural cross-ventilation.",
      icon: "sun" as IllustrationName,
    },
    {
      title: "Natural Stone & Upcycling",
      description:
        "Constructed with thick thermal stone walls, reclaimed antique timber, and repurposed materials that honor traditional heritage and climate resilience.",
      icon: "stone" as IllustrationName,
    },
    {
      title: "Thriving Native Biodiversity",
      description:
        "A protected habitat shared with resident peacocks, bulbuls, owls, rabbits, and wandering deer, proving that human activity and wildlife can coexist.",
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
    title: "Community Participation",
    summary: "Working with people rather than simply delivering services to them, ensuring every initiative is locally owned.",
    art: "gathering",
  },
  {
    title: "Education & Empowerment",
    summary: "Treating foundational learning and literacy as the bedrock for generational confidence, dignity, and rights.",
    art: "book",
  },
  {
    title: "Collective Action",
    summary: "Organising community cooperatives, women's groups, and youth circles rather than isolated individual interventions.",
    art: "hands",
  },
  {
    title: "Practical Demonstration",
    summary: "Showing how sustainable agriculture, renewable energy, and water recycling function in daily real-world practice.",
    art: "sprout",
  },
  {
    title: "Ecological Sustainability",
    summary: "Approaching agriculture, energy, and infrastructure with deep long-term responsibility for the land and soil.",
    art: "sun",
  },
  {
    title: "Rights & Human Dignity",
    summary: "Supporting marginalised communities to secure constitutional documentation, claim entitlements, and participate in governance.",
    art: "people",
  },
];
