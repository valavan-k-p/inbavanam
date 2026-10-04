import { requireAdmin } from "@/lib/auth";
import { ContentEditor } from "@/components/admin/content-editor";
import {
  aboutIntro,
  architecture,
  community,
  communityBand,
  contactIntro,
  intro,
  place,
  pullQuote,
  stayIntro,
} from "@/data/story";
import { site } from "@/data/site";

export const metadata = { title: "Website Content" };

export default async function AdminContentPage() {
  const { supabase } = await requireAdmin();

  const { data: storedSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "site_content")
    .single();

  const stored = (storedSetting?.value && typeof storedSetting.value === "object") ? (storedSetting.value as Record<string, Record<string, string>>) : {};

  const sections = [
    {
      key: "hero",
      title: "1. Homepage Hero & Brand",
      description: "Manage the hero proposition, brand quote, and location line.",
      fields: [
        {
          name: "proposition",
          label: "Brand Proposition",
          type: "text" as const,
          hint: "Displayed on the hero banner and browser metadata.",
        },
        {
          name: "pullQuote",
          label: "Pull Quote",
          type: "text" as const,
          hint: "Featured quote below the values band.",
        },
        {
          name: "locationShort",
          label: "Short Location",
          type: "text" as const,
          hint: "Displayed in header and hero.",
        },
      ],
    },
    {
      key: "intro",
      title: "2. Introduction ('What is Inbavanam')",
      description: "Opening narrative paragraphs describing the land and purpose.",
      fields: [
        { name: "eyebrow", label: "Eyebrow Label", type: "text" as const },
        { name: "heading", label: "Section Heading", type: "text" as const },
        { name: "body1", label: "Paragraph 1 (Land & Region)", type: "textarea" as const, rows: 3 },
        { name: "body2", label: "Paragraph 2 (Founders & Purpose)", type: "textarea" as const, rows: 3 },
      ],
    },
    {
      key: "about",
      title: "3. About Section",
      description: "Story overview and centerpiece collage photograph reference.",
      fields: [
        { name: "heading", label: "About Heading", type: "text" as const },
        {
          name: "imagePath",
          label: "Collage Image / Media Path",
          type: "text" as const,
          hint: "Image source path for the circular collage (e.g. /about us image/about-collage.webp).",
        },
      ],
    },
    {
      key: "the_land",
      title: "4. The Land Section",
      description: "Farming, landscape narrative, and background photograph.",
      fields: [
        { name: "heading", label: "Section Heading", type: "text" as const },
        {
          name: "imagePath",
          label: "Background Photograph Path",
          type: "text" as const,
          hint: "Current: /inbavanam cover/farm.png. Preserves exact container styling.",
        },
      ],
    },
    {
      key: "architecture",
      title: "5. Architecture Section",
      description: "Stone construction, climate-responsive design narrative, and image.",
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text" as const },
        { name: "heading", label: "Heading", type: "text" as const },
        { name: "body1", label: "Paragraph 1 (Heavy Stone)", type: "textarea" as const, rows: 2 },
        { name: "body2", label: "Paragraph 2 (Walkthroughs)", type: "textarea" as const, rows: 2 },
        { name: "imagePath", label: "Architecture Photograph Path", type: "text" as const },
      ],
    },
    {
      key: "stay",
      title: "6. Stay Section",
      description: "Guest accommodation introduction and background photograph.",
      fields: [
        { name: "heading", label: "Heading", type: "text" as const },
        { name: "body", label: "Description Paragraph", type: "textarea" as const, rows: 3 },
        { name: "imagePath", label: "Stay Background Photograph Path", type: "text" as const },
      ],
    },
    {
      key: "community",
      title: "7. Community Section",
      description: "Community partnership narrative, quote, and documentary photo.",
      fields: [
        { name: "eyebrow", label: "Eyebrow", type: "text" as const },
        { name: "heading", label: "Heading", type: "text" as const },
        { name: "body1", label: "Paragraph 1 (Communities & Wellbeing)", type: "textarea" as const, rows: 3 },
        { name: "body2", label: "Paragraph 2 (Agriculture & Land)", type: "textarea" as const, rows: 2 },
        { name: "quote", label: "Community Band Quote", type: "text" as const },
        { name: "imagePath", label: "Community Photograph Path", type: "text" as const },
      ],
    },
    {
      key: "contact",
      title: "8. Contact Page Intro",
      description: "Heading and invitation copy on the contact form page.",
      fields: [
        { name: "heading", label: "Contact Heading", type: "text" as const },
        { name: "body", label: "Contact Description", type: "textarea" as const, rows: 3 },
      ],
    },
  ];

  // Merge default values with stored values
  const defaultValues: Record<string, Record<string, string>> = {
    hero: {
      proposition: site.proposition,
      pullQuote: pullQuote,
      locationShort: site.locationShort,
      ...stored.hero,
    },
    intro: {
      eyebrow: intro.eyebrow,
      heading: intro.heading,
      body1: intro.body[0] ?? "",
      body2: intro.body[1] ?? "",
      ...stored.intro,
    },
    about: {
      heading: aboutIntro.heading,
      imagePath: aboutIntro.media.src ?? "",
      ...stored.about,
    },
    the_land: {
      heading: "Land that is worked as well as lived on.",
      imagePath: place.media.src ?? "",
      ...stored.the_land,
    },
    architecture: {
      eyebrow: architecture.eyebrow,
      heading: architecture.heading,
      body1: architecture.body[0] ?? "",
      body2: architecture.body[1] ?? "",
      imagePath: architecture.media.src ?? "",
      ...stored.architecture,
    },
    stay: {
      heading: stayIntro.heading,
      body: stayIntro.body,
      imagePath: stayIntro.media.src ?? "",
      ...stored.stay,
    },
    community: {
      eyebrow: community.eyebrow,
      heading: community.heading,
      body1: community.body[0] ?? "",
      body2: community.body[1] ?? "",
      quote: communityBand.quote,
      imagePath: community.media.src ?? "",
      ...stored.community,
    },
    contact: {
      heading: contactIntro.heading,
      body: contactIntro.body,
      ...stored.contact,
    },
  };

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <span className="label text-muted-foreground">Website Copy & Media</span>
        <h1 className="text-h2">Website Content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the text copy, headings, descriptions, and photograph sources across key sections.
          Changes take effect on the public site immediately without layout shifts.
        </p>
      </div>

      <ContentEditor sections={sections} values={defaultValues} />
    </div>
  );
}
