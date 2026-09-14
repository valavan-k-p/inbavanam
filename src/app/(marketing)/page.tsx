import { CinematicHero } from "@/components/hero/cinematic-hero";
import {
  ArchitectureSection,
  CommunitySection,
  EssenceSection,
  EventsSection,
  ExperiencesSection,
  FinalCtaSection,
  FoundersSection,
  GalleryPreviewSection,
  LocationSection,
  OurWorkSection,
  PlaceSection,
  StayPreviewSection,
} from "@/components/sections/home";
import { JsonLd, organizationJsonLd } from "@/lib/seo/json-ld";

// Re-read published events and gallery items from Supabase every five minutes.
export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <CinematicHero />
      <EssenceSection />
      <PlaceSection />
      <ArchitectureSection />
      <StayPreviewSection />
      <ExperiencesSection />
      <CommunitySection />
      <OurWorkSection />
      <EventsSection />
      <FoundersSection />
      <GalleryPreviewSection />
      <LocationSection />
      <FinalCtaSection />
    </>
  );
}
