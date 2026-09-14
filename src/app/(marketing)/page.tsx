import { CinematicHero } from "@/components/hero/cinematic-hero";
import {
  AboutTeaserSection,
  ArchitectureSection,
  EventsSection,
  ExperiencesSection,
  FoundersSection,
  GalleryPreviewSection,
  OurWorkSection,
  PlaceSection,
  StayFeatureSection,
} from "@/components/sections/home";
import { CommunityBand, FindUsBand, PlanStayBand, ValuesBand } from "@/components/sections/bands";
import { JsonLd, organizationJsonLd } from "@/lib/seo/json-ld";

// Re-read published events and gallery items from Supabase every five minutes.
export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <CinematicHero />
      <AboutTeaserSection />
      <ValuesBand />
      <PlaceSection />
      <ArchitectureSection />
      <StayFeatureSection />
      <ExperiencesSection />
      <CommunityBand />
      <OurWorkSection />
      <EventsSection />
      <FoundersSection />
      <GalleryPreviewSection />
      <FindUsBand />
      <PlanStayBand />
    </>
  );
}
