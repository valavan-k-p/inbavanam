import type { Metadata } from "next";
import { accommodationTemplate } from "@/data/collections";
import { getAccommodations } from "@/lib/db/content";
import { architecture } from "@/data/story";
import { enquireLink } from "@/data/site";
import { PageHero } from "@/components/sections/page-hero";
import { AccommodationCard } from "@/components/sections/accommodation-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { LineArt } from "@/components/illustrations/line-art";

export const metadata: Metadata = {
  title: "Stay",
  description: "Accommodation and spaces at Inbavanam, near Karamadai in the Coimbatore region.",
  alternates: { canonical: "/stay" },
};

const showPreview = process.env.NODE_ENV === "development";

export const revalidate = 300;

export default async function StayPage() {
  const published = (await getAccommodations()).filter((a) => a.published);

  return (
    <>
      <PageHero
        eyebrow="Stay"
        title="Rooms and spaces for rest."
        lede="Stay on your own, with family or as a group. Tell us your dates and group size and we will reply with what is available."
      >
        <ButtonLink href={enquireLink.href} className="self-start">
          Plan your stay
        </ButtonLink>
      </PageHero>

      <section aria-label="Accommodation" className="pb-[var(--section-y)]">
        <div className="container-page flex flex-col gap-16">
          {published.length ? (
            published.map((item) => <AccommodationCard key={item.slug} item={item} />)
          ) : (
            <>
              <div className="flex flex-col gap-5 border-t border-rule pt-10 sm:flex-row sm:items-center sm:gap-10">
                <LineArt name="stone" className="size-20 shrink-0 text-walnut" />
                <p className="prose-measure text-lede">
                  Details of each room, including capacity and amenities, are being prepared and
                  will be listed here soon.
                </p>
              </div>
              {showPreview ? <AccommodationCard item={accommodationTemplate} preview /> : null}
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="buildings-title" className="surface-walnut grain section-y">
        <div className="container-page">
          <SectionHeading
            id="buildings-title"
            eyebrow="The buildings"
            title={architecture.heading}
          />
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {architecture.facts.map((fact) => (
              <li key={fact.label} className="flex flex-col gap-3 border-t border-rule pt-6">
                <h3 className="label">{fact.label}</h3>
                <p className="text-muted-foreground">{fact.body}</p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/gallery?category=Architecture" variant="text" arrow className="mt-12">
            See the architecture
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
