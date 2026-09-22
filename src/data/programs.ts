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
      src: "/community/drawing-workshop.webp",
      alt: "Children drawing on the floor of the open-sided hall at Inbavanam while a facilitator works at a whiteboard",
      caption: "A drawing session in the open hall at Inbavanam.",
      width: 1448,
      height: 1086,
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
      src: "/community/craft-display.webp",
      alt: "Children holding paper flowers they have made, standing beneath the Inbavanam sign on a brick wall",
      caption: "Children with the paper flowers they made at a children's program.",
      width: 1411,
      height: 1114,
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
      src: "/community/community-group-portrait.webp",
      alt: "A large group of children and adults with paper flowers, gathered on open ground with the hills behind them",
      caption: "Everyone together at the end of a children's program.",
      width: 1448,
      height: 1086,
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
      src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (1).jpeg",
      alt: "A red tractor parked beside the farm cottage at Inbavanam",
      caption: "The tractor used on the land at Inbavanam.",
      width: 1600,
      height: 1066,
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
      src: "/community/circle-game.webp",
      alt: "Children playing a moving circle game in the open-sided hall, with the valley beyond",
      caption: "A group game in the open hall at Inbavanam.",
      width: 1447,
      height: 1087,
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
      src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (25).jpeg",
      alt: "The sunlit community hall at Inbavanam, open on one side to the valley",
      caption: "The hall used for meetings, trainings and dialogue.",
      width: 1600,
      height: 1066,
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
      src: "/inbavanam cover/top view inbavanam.png",
      alt: "Aerial view of Inbavanam, its gardens, orchards and the cultivated land around the buildings",
      caption: "The buildings, gardens and cultivated land seen from above.",
      width: 1672,
      height: 941,
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
      src: "/community/drawing-workshop.webp",
      alt: "Children drawing on the floor of the open hall while a facilitator works at a whiteboard",
      caption: "A session in the open hall, the kind of work volunteers help with.",
      width: 1448,
      height: 1086,
      brief: "Photograph of volunteers, with caption.",
    },
  },
];

export interface ProgramDetail {
  slug: string;
  name: string;
  area: string;
  art: IllustrationName;
  tag: string;
  subtitle: string;
  lead: string;
  highlights: string[];
  keyFact: { label: string; value: string };
  sourceRef: string;
}

/**
 * 12 Program initiatives with verified, concise content extracted
 * directly from the Inbavanam Organisation Profile PDF.
 */
export const programIndex: ProgramDetail[] = [
  {
    slug: "peacebuilding",
    name: "Peacebuilding",
    area: "peacebuilding",
    art: "dove",
    tag: "Conflict Transformation",
    subtitle: "Mediation & Nonviolent Dialogue",
    lead: "Inbavanam conducts intensive peacebuilding and conflict transformation training for practitioners from academic institutions, social-work organisations, and grassroots community initiatives.",
    highlights: [
      "Distinguishes short-term conflict resolution from deep, sustainable conflict transformation.",
      "Three-day workshop curriculum combining conflict analysis, relationship mapping, and real-life case discussions.",
      "Explores foundational themes: Truth, Mercy, Justice, Peace, Nonviolence, Dialogue, Mediation, and Reconciliation.",
      "Equips participants with practical tools for personal, community, and organisational levels to serve as active peace ambassadors.",
    ],
    keyFact: { label: "Workshop Format", value: "3-Day Experiential Programme" },
    sourceRef: "Section 10: Peacebuilding & Conflict Transformation",
  },
  {
    slug: "organizational-capacity-building",
    name: "Organizational Capacity Building",
    area: "education-and-training",
    art: "stone",
    tag: "Civil Society",
    subtitle: "Strengthening Strategy & Community Impact",
    lead: "Inbavanam delivers strategic organisational-capacity-building programmes for civil-society organisations and educational institutions seeking to deepen their community impact and operational sustainability.",
    highlights: [
      "Comprehensive review of vision, mission, strategic direction, programme relevance, and operational sustainability.",
      "Facilitated reflection, capacity assessments, collective analysis, and strategic forward planning.",
      "Aligns internal organisational systems directly with the practical, evolving needs of grassroots communities.",
      "2024 institutional collaborations include OfERR, NDWT, VTMS, and the Department of Management at Nirmala College, Coimbatore.",
    ],
    keyFact: { label: "2024 Partners", value: "OfERR, NDWT, VTMS & Nirmala College" },
    sourceRef: "Section 11: Organisational Capacity Building",
  },
  {
    slug: "childrens-empowerment",
    name: "Children's Empowerment",
    area: "empowerment",
    art: "sprout",
    tag: "Village Hamlets",
    subtitle: "Will Power Coaching Centres",
    lead: "Grounded in the settlements of Kandiyur AD Colony and Bagavathi Amman Koil, Inbavanam provides accessible, nurturing educational support close to children's homes to prevent dropout.",
    highlights: [
      'Village-based activity centres named by the children themselves as the "Will Power Coaching Centre."',
      "Approximately 40 children participate actively in the centres in each of the two village communities.",
      "Daily foundational learning, literacy classes, health and hygiene education, and regular public library visits.",
      "Introduced digital learning tools through 6 computers sourced with the help of Chennai-based volunteers.",
    ],
    keyFact: { label: "Student Outreach", value: "~40 Children in Each Village Centre" },
    sourceRef: "Section 3 & 4: Education Programme & Hamlets",
  },
  {
    slug: "outbound-trainings",
    name: "Outbound Trainings",
    area: "education-and-training",
    art: "path",
    tag: "Campus & Retreats",
    subtitle: "Experiential Learning at Inbavanam Resource Centre",
    lead: "Hosted at the Inbavanam Resource Centre, outbound trainings offer organisations, corporate groups, and social workers an immersive natural environment for experiential learning and team reflection.",
    highlights: [
      "Dedicated training hall accommodating up to 60 people, with residential lodging facilities for up to 30 participants.",
      "A distraction-free rural setting designed for workshops, residential programmes, and team rejuvenation.",
      "Living ecological campus powered by solar electricity, rainwater harvesting, total water recycling, and stone architecture.",
      "Functions as a place of rest, recuperation, and strategic planning for community volunteers and social activists.",
    ],
    keyFact: { label: "Campus Capacity", value: "60 Training / 30 Residential" },
    sourceRef: "Section 13: Inbavanam Resource Centre",
  },
  {
    slug: "wisdom-workshops",
    name: "WISDOM Workshops",
    area: "education-and-training",
    art: "lamp",
    tag: "Applied Learning",
    subtitle: "Participatory Dialogue & Ethical Leadership",
    lead: "WISDOM workshops bring together social practitioners, youth, and community workers for structured reflection, applied ethics, and collective problem-solving in grassroots community development.",
    highlights: [
      "Participatory methodology grounded in decades of international and grassroots social-work experience.",
      "Emphasises ethical leadership, conflict transformation, nonviolent communication, and empathy.",
      "Connects theoretical knowledge with real-world community challenges, rights awareness, and environmental responsibility.",
      "Conducted through interactive exercises, case studies, and shared dialogue at the Inbavanam campus.",
    ],
    keyFact: { label: "Core Methodology", value: "Experiential Dialogue & Ethics" },
    sourceRef: "Section 10 & 14: Workshop Methodology & Knowledge",
  },
  {
    slug: "education",
    name: "Education",
    area: "education-and-training",
    art: "book",
    tag: "Foundational Pillar",
    subtitle: "Dropout Prevention & Educational Pathways",
    lead: "Education is one of Inbavanam's two foundational priorities, focused on breaking intergenerational cycles of educational disadvantage among marginalised rural and tribal families.",
    highlights: [
      "Holistic child and parent counselling, foundational literacy, and motivation to continue secondary education.",
      "Community advocacy with government-school headmasters and teachers to ensure children are enrolled and supported.",
      "Higher-education support: guidance through college admissions, mentorship, and financial scholarships.",
      "Promotes literacy and curiosity through digital computer access and organized visits to local libraries.",
    ],
    keyFact: { label: "Core Priority", value: "Foundational & Higher Education" },
    sourceRef: "Section 1 & 4: Education Programme",
  },
  {
    slug: "gender-empowerment",
    name: "Gender Empowerment",
    area: "empowerment",
    art: "people",
    tag: "Women & Youth",
    subtitle: "Higher Education for First-Generation Young Women",
    lead: "Inbavanam champions higher-education pathways and leadership opportunities for young women from economically and socially marginalised communities.",
    highlights: [
      "Directly supported nine first-generation girl learners with college admissions, higher-education guidance, and scholarships.",
      "Provides sustained one-on-one mentorship to ensure young women complete their degrees and enter professional careers.",
      "Engages rural women, agricultural workers, and self-help-group (SHG) members in capacity building and financial literacy.",
      "Breaks generational disadvantage by equipping women with education, leadership skills, and socio-economic dignity.",
    ],
    keyFact: { label: "Direct Support", value: "9 Girl Scholars in College" },
    sourceRef: "Section 4: Support for First-Generation Girls",
  },
  {
    slug: "natural-farming",
    name: "Natural Farming",
    area: "natural-farming",
    art: "sesame",
    tag: "Demonstration",
    subtitle: "Closed-Loop Integrated Ecological Agriculture",
    lead: "Natural farming at Inbavanam functions as a practical demonstration site in partnership with Krishi Vigyan Kendra and neighbouring organic farmers to advance chemical-free cultivation.",
    highlights: [
      "Integrated circular system combining crop cultivation, fruit orchards, plantains (bananas), and coconut trees.",
      "Closed-loop recycling: nutrient-rich water from fish culture is used for irrigation; treated bio-toilet water nourishes plants.",
      "Soil regeneration and crop development focused on traditional millets and successful organic banana cultivation.",
      "Complementary livelihood activities including poultry, country-bred chickens, goat rearing, and a native tree nursery.",
    ],
    keyFact: { label: "Eco-System", value: "Closed-Loop Integrated Agriculture" },
    sourceRef: "Section 5 & 6: Natural Farming & Demonstration",
  },
  {
    slug: "community-sports-and-engagement",
    name: "Community Sports and Engagement",
    area: "community-engagement",
    art: "ball",
    tag: "Youth Mobilisation",
    subtitle: "Health, Teamwork & Social Cohesion",
    lead: "Community sports and group activities serve as an active entry point for youth engagement, building healthy routines, discipline, and trust across rural settlements.",
    highlights: [
      "Provides positive recreational and social outlets for young people facing daily-wage precarity or unemployment.",
      "Complements village coaching centres by building physical fitness, mutual respect, and collaborative teamwork.",
      "Brings youth together across social divisions, supporting Inbavanam's wider commitment to social cohesion and belonging.",
      "Acts as an approachable platform for field workers to connect with youth and encourage continued education.",
    ],
    keyFact: { label: "Key Outcome", value: "Youth Engagement & Social Cohesion" },
    sourceRef: "Section 3 & 9: Social Cohesion & Community",
  },
  {
    slug: "access-to-justice",
    name: "Access to Justice",
    area: "advocacy",
    art: "scales",
    tag: "Constitutional Rights",
    subtitle: "Legal Literacy & Essential Documentation",
    lead: "Inbavanam works directly with vulnerable families to overcome administrative barriers, understand constitutional rights, and access statutory government services and entitlements.",
    highlights: [
      "Assists community members in obtaining essential identity documents: tribal certificates, Aadhaar cards, ration cards, and PAN cards.",
      "Facilitates access to social welfare schemes, educational admissions, formal employment, and banking services.",
      "Conducts legal-awareness workshops, rights education, field visits, and community-level problem solving.",
      "Helps marginalised citizens navigate legal and administrative systems to advocate for themselves with dignity.",
    ],
    keyFact: { label: "Core Documentation", value: "Tribal Cards, Aadhaar & Welfare" },
    sourceRef: "Section 7: Access to Justice & Documentation",
  },
  {
    slug: "tribal-panchayat-leaders-empowerment",
    name: "Tribal Panchayat Leaders Empowerment",
    area: "empowerment",
    art: "gathering",
    tag: "Local Governance",
    subtitle: "Statutory Leadership & Community Representation",
    lead: "Recognising the critical role played by formal (elected) and informal leaders, this programme strengthens tribal representatives to advocate effectively for their communities.",
    highlights: [
      "Strengthens tribal Panchayat leaders to understand statutory governance responsibilities and represent community concerns.",
      "Facilitates constructive engagement between indigenous hamlets, government departments, and public welfare programmes.",
      "Regular field visits by community workers to maintain close dialogue with leaders and understand local village needs.",
      "Conducts leadership workshops, rights-awareness sessions, and training on sustainable community development.",
    ],
    keyFact: { label: "Target Leaders", value: "Elected & Traditional Tribal Leaders" },
    sourceRef: "Section 8: Tribal Panchayat Leaders' Empowerment",
  },
  {
    slug: "sustainable-development",
    name: "Sustainable Development",
    area: "sustainable-development",
    art: "leaf",
    tag: "Living Model",
    subtitle: "Balanced Ecological & Economic Security",
    lead: "Inbavanam demonstrates a holistic development model balancing environmental protection, social inclusion, economic security, community participation, and sustainable livelihoods.",
    highlights: [
      "~5-acre community farming collective providing landless agricultural workers with shared land access and profit-sharing.",
      "Demonstrates renewable solar electricity, sun ovens, rainwater harvesting, and bio-toilet infrastructure in daily practice.",
      "On-site tree nursery producing saplings distributed for planting in homes, sidewalks, and community spaces.",
      "Promotes biodiversity conservation, coexisting with resident peacocks, bulbuls, owls, rabbits, and wandering deer.",
    ],
    keyFact: { label: "Living Model", value: "~5-Acre Collective & Eco-Campus" },
    sourceRef: "Section 5, 12 & 13: Sustainable Development & Centre",
  },
];

export function getProgramArea(slug: string) {
  return programAreas.find((area) => area.slug === slug);
}
