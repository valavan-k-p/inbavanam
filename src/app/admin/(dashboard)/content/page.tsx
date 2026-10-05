import { requireAdmin } from "@/lib/auth";
import { ContentEditor, type ContentSectionConfig } from "@/components/admin/content-editor";
import {
  aboutIntro,
  aboutStory,
  architecture,
  community,
  communityBand,
  contactIntro,
  intro,
  place,
  pullQuote,
  stayIntro,
} from "@/data/story";
import { site, supportLink } from "@/data/site";

export const metadata = { title: "Website Content" };

export default async function AdminContentPage() {
  const { supabase } = await requireAdmin();

  const { data: storedSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "site_content")
    .single();

  const stored =
    storedSetting?.value && typeof storedSetting.value === "object"
      ? (storedSetting.value as Record<string, Record<string, string>>)
      : {};

  const sections: ContentSectionConfig[] = [
    {
      key: "hero",
      title: "1. Homepage Hero & Top Banner",
      description: "Manage the hero image artwork, proposition text, brand quotes, and location line.",
      locationBadge: "Homepage — top section",
      previewUrl: "/",
      fields: [
        {
          name: "heroImage",
          label: "Hero Artwork Image",
          type: "image",
          hint: "The centerpiece Inbavanam artwork displayed prominently in the hero section below the navigation.",
          locationInfo: "Homepage — Hero Center",
        },
        {
          name: "heroHeadline",
          label: "Hero Heading / Headline",
          type: "text",
          hint: "The main statement displayed across the hero banner and browser metadata.",
          locationInfo: "Homepage — Hero Headline",
        },
        {
          name: "heroEyebrow",
          label: "Hero Eyebrow Tagline",
          type: "text",
          hint: "Uppercase tagline placed above the main headline (e.g. Rooted in people · Nurturing tomorrow).",
          locationInfo: "Homepage — Hero Top",
        },
        {
          name: "locationShort",
          label: "Hero Location Label",
          type: "text",
          hint: "Location text shown at the bottom-left of the hero (e.g. Karamadai · Coimbatore).",
          locationInfo: "Homepage — Hero Bottom Left",
        },
        {
          name: "buttonLabel",
          label: "Action Button Text",
          type: "text",
          hint: "The text displayed on the main call-to-action button (e.g. Book / Enquire).",
          locationInfo: "Homepage — Hero Bottom Right",
        },
        {
          name: "buttonHref",
          label: "Action Button Destination",
          type: "text",
          hint: "Link destination for the hero action button (default: /contact?type=stay).",
          locationInfo: "Homepage — Hero Button Link",
        },
      ],
    },
    {
      key: "intro",
      title: "2. Introduction ('What is Inbavanam')",
      description: "Opening narrative paragraphs describing the land, founders, and purpose.",
      locationBadge: "Homepage — What is Inbavanam section",
      previewUrl: "/#essence",
      fields: [
        {
          name: "eyebrow",
          label: "Section Eyebrow",
          type: "text",
          hint: "Category tag shown above the heading (e.g. What is Inbavanam).",
          locationInfo: "Homepage — Above Introduction Heading",
        },
        {
          name: "heading",
          label: "Section Heading",
          type: "text",
          hint: "The bold headline introducing Inbavanam's space and community purpose.",
          locationInfo: "Homepage — Introduction Heading",
        },
        {
          name: "body1",
          label: "Paragraph 1 (The Land & Region)",
          type: "textarea",
          rows: 3,
          hint: "First narrative paragraph describing the 5.5-acre retreat space and Tamil Nadu location.",
          locationInfo: "Homepage — Introduction First Paragraph",
        },
        {
          name: "body2",
          label: "Paragraph 2 (Founders & Community Purpose)",
          type: "textarea",
          rows: 3,
          hint: "Second narrative paragraph introducing Gladston and Florina Xavier's social work.",
          locationInfo: "Homepage — Introduction Second Paragraph",
        },
      ],
    },
    {
      key: "about",
      title: "3. About Inbavanam & Story",
      description: "Story overview, circular collage photograph, and About page story paragraphs.",
      locationBadge: "Homepage About section + About Page (/about)",
      previewUrl: "/about",
      fields: [
        {
          name: "heading",
          label: "About Section Heading",
          type: "text",
          hint: "Prominent heading for the About section on the homepage and top of /about.",
          locationInfo: "Homepage & About Page Top",
        },
        {
          name: "imagePath",
          label: "About Collage Image",
          type: "image",
          hint: "The circular collage photograph featuring the pavilion, residence, and hills around the logo.",
          locationInfo: "Homepage & About Page Circular Illustration",
        },
        {
          name: "pullQuote",
          label: "Brand Pull Quote",
          type: "text",
          hint: "The signature quote displayed below the values band (e.g. A place to pause. A space to connect.).",
          locationInfo: "Homepage & About Page — Values Quote Band",
        },
        {
          name: "storyHeading",
          label: "Our Story Heading",
          type: "text",
          hint: "The headline for the detailed narrative section on the About page (e.g. School first, then a steady income).",
          locationInfo: "About Page — Story Section",
        },
        {
          name: "storyBody1",
          label: "Story Paragraph 1 (Village Context)",
          type: "textarea",
          rows: 3,
          hint: "Narrative explaining the two villages: Kandiyur and Bagavathi Amman Koil.",
          locationInfo: "About Page — Story Paragraph 1",
        },
        {
          name: "storyBody2",
          label: "Story Paragraph 2 (School & Learning Centres)",
          type: "textarea",
          rows: 3,
          hint: "Narrative describing educational coaching, scholarships, and women in college.",
          locationInfo: "About Page — Story Paragraph 2",
        },
        {
          name: "storyBody3",
          label: "Story Paragraph 3 (Farming & Livelihoods)",
          type: "textarea",
          rows: 3,
          hint: "Narrative describing shared farming without chemicals, livestock, and steady income.",
          locationInfo: "About Page — Story Paragraph 3",
        },
        {
          name: "storyImagePath",
          label: "Story Photograph",
          type: "image",
          hint: "Photograph of the resource centre jaali screen and granite steps on the About page.",
          locationInfo: "About Page — Beside Story Narrative",
        },
      ],
    },
    {
      key: "the_land",
      title: "4. The Land Section",
      description: "Farming, landscape narrative, and full-width background photograph.",
      locationBadge: "Homepage — The Land section",
      previewUrl: "/#the-land",
      fields: [
        {
          name: "heading",
          label: "Section Heading",
          type: "text",
          hint: "Large headline placed over the farmland photograph (e.g. Land that is worked as well as lived on.).",
          locationInfo: "Homepage — Over The Land Image",
        },
        {
          name: "body",
          label: "The Land Narrative / Description",
          type: "textarea",
          rows: 3,
          hint: "Supporting paragraph describing agricultural practice and connection to the landscape.",
          locationInfo: "Homepage — The Land Description",
        },
        {
          name: "imagePath",
          label: "The Land Background Photograph",
          type: "image",
          hint: "Full-width landscape photograph of the farmland with grazing cattle and the Western Ghats. Preserves exact layout.",
          locationInfo: "Homepage — Full Width Section Background",
        },
        {
          name: "landArea",
          label: "Land Area Label",
          type: "text",
          hint: "Area specification (e.g. approximately 5.5 acres).",
          locationInfo: "Homepage — Land Facts",
        },
      ],
    },
    {
      key: "architecture",
      title: "5. Architecture Section",
      description: "Stone construction, climate-responsive design narrative, photography, and key facts.",
      locationBadge: "Homepage — Architecture section",
      previewUrl: "/#architecture",
      fields: [
        {
          name: "eyebrow",
          label: "Section Eyebrow",
          type: "text",
          hint: "Small category label (e.g. Architecture).",
          locationInfo: "Homepage — Architecture Top",
        },
        {
          name: "heading",
          label: "Section Heading",
          type: "text",
          hint: "Main headline (e.g. Built with the land in mind.).",
          locationInfo: "Homepage — Architecture Heading",
        },
        {
          name: "body1",
          label: "Paragraph 1 (Stone & Natural Cooling)",
          type: "textarea",
          rows: 2,
          hint: "Description of unusually heavy stone construction and natural cooling.",
          locationInfo: "Homepage — Architecture Description 1",
        },
        {
          name: "body2",
          label: "Paragraph 2 (Walkthroughs & Materials)",
          type: "textarea",
          rows: 2,
          hint: "Description of the thinking and founder explanations behind the construction.",
          locationInfo: "Homepage — Architecture Description 2",
        },
        {
          name: "imagePath",
          label: "Architecture Photograph",
          type: "image",
          hint: "Centerpiece photograph of the brick and stone elevation with jaali screens and arches.",
          locationInfo: "Homepage — Architecture Video/Photo Frame",
        },
        {
          name: "fact1Label",
          label: "Feature 1 Title",
          type: "text",
          hint: "Title of the first architectural pillar (default: Natural cooling).",
          locationInfo: "Homepage — Architecture Pillar 1",
        },
        {
          name: "fact1Body",
          label: "Feature 1 Description",
          type: "textarea",
          rows: 2,
          hint: "Explanation of spaces designed to stay cool naturally.",
          locationInfo: "Homepage — Architecture Pillar 1 Text",
        },
        {
          name: "fact2Label",
          label: "Feature 2 Title",
          type: "text",
          hint: "Title of the second architectural pillar (default: Heavy stone).",
          locationInfo: "Homepage — Architecture Pillar 2",
        },
        {
          name: "fact2Body",
          label: "Feature 2 Description",
          type: "textarea",
          rows: 2,
          hint: "Explanation of heavy stone walls and local quarrying.",
          locationInfo: "Homepage — Architecture Pillar 2 Text",
        },
        {
          name: "fact3Label",
          label: "Feature 3 Title",
          type: "text",
          hint: "Title of the third architectural pillar (default: Climate-responsive design).",
          locationInfo: "Homepage — Architecture Pillar 3",
        },
        {
          name: "fact3Body",
          label: "Feature 3 Description",
          type: "textarea",
          rows: 2,
          hint: "Explanation of construction that works with the local microclimate.",
          locationInfo: "Homepage — Architecture Pillar 3 Text",
        },
      ],
    },
    {
      key: "stay",
      title: "6. Stay Section",
      description: "Guest accommodation introduction, room descriptions, and cover photograph.",
      locationBadge: "Homepage Stay section + Stay Page (/stay)",
      previewUrl: "/stay",
      fields: [
        {
          name: "heading",
          label: "Stay Heading",
          type: "text",
          hint: "Headline welcoming visitors (default: Rest well. Feel at home.).",
          locationInfo: "Homepage & Stay Page Banner",
        },
        {
          name: "body",
          label: "Stay Description",
          type: "textarea",
          rows: 3,
          hint: "Paragraph describing peaceful reflection, time together, and thoughtful spaces.",
          locationInfo: "Homepage & Stay Page Intro",
        },
        {
          name: "imagePath",
          label: "Stay Cover Photograph",
          type: "image",
          hint: "Full-width photograph displayed on the homepage Stay section (default: /inbavanam cover/pets.jpg).",
          locationInfo: "Homepage — Stay Full Width Section",
        },
        {
          name: "roomImagePath",
          label: "Guest Room Photograph",
          type: "image",
          hint: "Photograph of guest room with handmade Athangudi floor tiles and natural stone.",
          locationInfo: "Stay Page (/stay) — Top Hero Image",
        },
        {
          name: "buttonLabel",
          label: "Booking Button Text",
          type: "text",
          hint: "Text on the reservation/enquiry button (default: Book / Enquire).",
          locationInfo: "Homepage & Stay Page Enquiry Button",
        },
      ],
    },
    {
      key: "community",
      title: "7. Community Section",
      description: "Community partnership narrative, quote, and background photography.",
      locationBadge: "Homepage Community section + Community Page (/community)",
      previewUrl: "/community",
      fields: [
        {
          name: "eyebrow",
          label: "Section Eyebrow",
          type: "text",
          hint: "Category tag shown above heading (default: Community).",
          locationInfo: "Homepage — Above Community Heading",
        },
        {
          name: "heading",
          label: "Section Heading",
          type: "text",
          hint: "Main headline (default: Rooted in community.).",
          locationInfo: "Homepage — Community Heading",
        },
        {
          name: "body1",
          label: "Paragraph 1 (Grassroots Social Work)",
          type: "textarea",
          rows: 3,
          hint: "Description of working alongside tribal and Scheduled Caste communities on education and health.",
          locationInfo: "Homepage — Community Paragraph 1",
        },
        {
          name: "body2",
          label: "Paragraph 2 (Shared Agriculture & Land)",
          type: "textarea",
          rows: 2,
          hint: "Description of teaching organic farming and providing shared land.",
          locationInfo: "Homepage — Community Paragraph 2",
        },
        {
          name: "quote",
          label: "Community Quote",
          type: "text",
          hint: "Italicized quote (default: Stronger communities, a brighter tomorrow.).",
          locationInfo: "Homepage — Right Side of Community Section",
        },
        {
          name: "imagePath",
          label: "Community Background Photograph",
          type: "image",
          hint: "Landscape photograph displayed as background for the community section (default: /inbavanam cover/side inbavanam.png).",
          locationInfo: "Homepage — Community Section Background",
        },
      ],
    },
    {
      key: "find_us",
      title: "8. Find Us & Directions",
      description: "Location heading, regional description, and Google Maps pin link.",
      locationBadge: "Homepage Find Us band + Contact Page (/contact)",
      previewUrl: "/contact",
      fields: [
        {
          name: "heading",
          label: "Location Heading",
          type: "text",
          hint: "Title for the location section (default: Karamadai, Coimbatore).",
          locationInfo: "Homepage Find Us & Contact Page",
        },
        {
          name: "description",
          label: "Regional Location Description",
          type: "textarea",
          rows: 3,
          hint: "Directions text (e.g. Near Karamadai, in the Mettupalayam and Coimbatore region of Tamil Nadu).",
          locationInfo: "Homepage Find Us & Contact Page",
        },
        {
          name: "mapUrl",
          label: "Google Maps Location Link",
          type: "text",
          hint: "Direct Google Maps URL opened when visitors click the map pin.",
          locationInfo: "Interactive Map Pin Destination",
        },
        {
          name: "imagePath",
          label: "Find Us Aerial Photograph",
          type: "image",
          hint: "Aerial photograph of the Inbavanam buildings, coconut palms, and cultivated fields.",
          locationInfo: "Homepage Find Us Background",
        },
      ],
    },
    {
      key: "contact",
      title: "9. Contact Page Invitation",
      description: "Headline and description shown on the public contact form page.",
      locationBadge: "Contact Page (/contact)",
      previewUrl: "/contact",
      fields: [
        {
          name: "heading",
          label: "Contact Heading",
          type: "text",
          hint: "Title on the contact page (default: Get in touch).",
          locationInfo: "Contact Page (/contact) — Main Title",
        },
        {
          name: "body",
          label: "Contact Description",
          type: "textarea",
          rows: 3,
          hint: "Warm invitation copy explaining that visitors can enquire about stays, workshops, or volunteering.",
          locationInfo: "Contact Page (/contact) — Introduction Text",
        },
      ],
    },
    {
      key: "footer",
      title: "10. Website Footer",
      description: "Footer brand tagline, short location, support button text, and copyright line.",
      locationBadge: "All Pages — Footer",
      previewUrl: "/#footer",
      fields: [
        {
          name: "tagline",
          label: "Footer Brand Tagline",
          type: "text",
          hint: "Brand line displayed underneath the Inbavanam logo (default: People · Place · Purpose).",
          locationInfo: "Footer — Below Logo",
        },
        {
          name: "locationShort",
          label: "Footer Location Text",
          type: "text",
          hint: "Short location shown above the bottom copyright bar (default: Karamadai · Coimbatore).",
          locationInfo: "Footer — Bottom Right",
        },
        {
          name: "supportLabel",
          label: "Support Button Text",
          type: "text",
          hint: "Action button in footer (default: Support Inbavanam).",
          locationInfo: "Footer — Action Button",
        },
        {
          name: "supportUrl",
          label: "Support Button Link",
          type: "text",
          hint: "Link destination for support button (default: /community#support).",
          locationInfo: "Footer — Support Link",
        },
        {
          name: "copyrightText",
          label: "Copyright Note",
          type: "text",
          hint: "Copyright line printed at the bottom of every page (default: Inbavanam).",
          locationInfo: "Footer — Bottom Copyright Bar",
        },
      ],
    },
  ];

  // Default factory values from src/data/
  const originalDefaults: Record<string, Record<string, string>> = {
    hero: {
      heroImage: "/images/hero image.png",
      heroHeadline: site.heroHeadline.join(" "),
      heroEyebrow: site.heroEyebrow.join(" · "),
      locationShort: site.locationShort,
      buttonLabel: "Book / Enquire",
      buttonHref: "/contact?type=stay",
    },
    intro: {
      eyebrow: intro.eyebrow,
      heading: intro.heading,
      body1: intro.body[0] ?? "",
      body2: intro.body[1] ?? "",
    },
    about: {
      heading: aboutIntro.heading,
      imagePath: aboutIntro.media.src ?? "/about us image/about-collage.webp",
      pullQuote: pullQuote,
      storyHeading: aboutStory.heading,
      storyBody1: aboutStory.body[0] ?? "",
      storyBody2: aboutStory.body[1] ?? "",
      storyBody3: aboutStory.body[2] ?? "",
      storyImagePath: aboutStory.media.src ?? "",
    },
    the_land: {
      heading: "Land that is worked as well as lived on.",
      body: "Inbavanam is a retreat space near Karamadai, where farmland is worked as well as lived on. Food is grown organically with care for the soil.",
      imagePath: place.media.src ?? "/inbavanam cover/farm.png",
      landArea: site.landArea,
    },
    architecture: {
      eyebrow: architecture.eyebrow,
      heading: architecture.heading,
      body1: architecture.body[0] ?? "",
      body2: architecture.body[1] ?? "",
      imagePath: architecture.media.src ?? "",
      fact1Label: architecture.facts[0]?.label ?? "Natural cooling",
      fact1Body: architecture.facts[0]?.body ?? "",
      fact2Label: architecture.facts[1]?.label ?? "Heavy stone",
      fact2Body: architecture.facts[1]?.body ?? "",
      fact3Label: architecture.facts[2]?.label ?? "Climate-responsive design",
      fact3Body: architecture.facts[2]?.body ?? "",
    },
    stay: {
      heading: stayIntro.heading,
      body: stayIntro.body,
      imagePath: "/inbavanam cover/pets.jpg",
      roomImagePath: stayIntro.media.src ?? "",
      buttonLabel: "Book / Enquire",
    },
    community: {
      eyebrow: community.eyebrow,
      heading: community.heading,
      body1: community.body[0] ?? "",
      body2: community.body[1] ?? "",
      quote: communityBand.quote,
      imagePath: "/inbavanam cover/side inbavanam.png",
    },
    find_us: {
      heading: "Karamadai, Coimbatore",
      description: site.locationLong,
      mapUrl: "https://maps.app.goo.gl/LakRJCWDNT8QczTC9",
      imagePath: "/inbavanam cover/top view inbavanam.png",
    },
    contact: {
      heading: contactIntro.heading,
      body: contactIntro.body,
    },
    footer: {
      tagline: site.tagline,
      locationShort: site.locationShort,
      supportLabel: supportLink.label,
      supportUrl: supportLink.href,
      copyrightText: site.name,
    },
  };

  // Merge stored values over default values
  const currentValues: Record<string, Record<string, string>> = {};
  for (const [secKey, defaults] of Object.entries(originalDefaults)) {
    currentValues[secKey] = {
      ...defaults,
      ...(stored[secKey] || {}),
    };
  }

  return (
    <div className="flex max-w-4xl flex-col gap-8 pb-16">
      <div>
        <span className="label text-muted-foreground">Admin CMS</span>
        <h1 className="text-h2">Website Content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage every headline, narrative paragraph, background photograph, and link across all 10
          public sections. Each field includes a helper description and direct preview link to its
          location on the website.
        </p>
      </div>

      <ContentEditor
        sections={sections}
        values={currentValues}
        originalDefaults={originalDefaults}
      />
    </div>
  );
}
