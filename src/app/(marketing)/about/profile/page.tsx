import type { Metadata } from "next";
import { OrganisationProfileSection } from "@/components/sections/organisation-profile";
import { PageHero } from "@/components/sections/page-hero";
import { ValuesBand } from "@/components/sections/bands";
import { ButtonLink } from "@/components/ui/button-link";
import { profileOverview } from "@/data/organisation-profile";

export const metadata: Metadata = {
  title: "Organisation Profile & Programme Content",
  description:
    "Comprehensive profile of Inbavanam: Community development initiatives in Kandiyur and Bagavathi Amman Koil, Coimbatore District, Tamil Nadu.",
  alternates: { canonical: "/about/profile" },
};

export default function OrganisationProfilePage() {
  return (
    <>
      <PageHero
        eyebrow={profileOverview.eyebrow}
        title={profileOverview.heading}
        lede={profileOverview.lede}
      >
        <div className="flex flex-wrap items-center gap-6">
          <ButtonLink href="/about" variant="text" arrow>
            Meet the founders
          </ButtonLink>
          <ButtonLink href="/community" variant="light" arrow>
            Get involved
          </ButtonLink>
        </div>
      </PageHero>

      <ValuesBand withQuote={false} />

      <OrganisationProfileSection />
    </>
  );
}
