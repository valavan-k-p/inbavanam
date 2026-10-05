import Image from "next/image";
import { enquireLink, site } from "@/data/site";
import { heroSlides } from "@/data/story";
import { HeroSlideshow } from "./hero-slideshow";
import { ButtonLink } from "@/components/ui/button-link";
import { revealDelay } from "@/components/ui/reveal";
import { getSiteContentSection } from "@/lib/db/content";

export async function CinematicHero() {
  const heroData = await getSiteContentSection("hero", {
    heroImage: "/images/hero image.png",
    heroHeadline: site.heroHeadline.join(" "),
    heroEyebrow: site.heroEyebrow.join(" · "),
    locationShort: site.locationShort,
    buttonLabel: "Book / Enquire",
    buttonHref: enquireLink.href,
  });

  const locationParts = heroData.locationShort
    ? heroData.locationShort.split(/·|,|\//).map((s) => s.trim()).filter(Boolean)
    : ["Karamadai", "Coimbatore"];

  return (
    <section
      aria-label={site.name}
      className="on-dark grain relative isolate flex min-h-[82svh] flex-col overflow-hidden bg-maroon-deep sm:min-h-svh"
    >
      <HeroSlideshow slides={heroSlides} />

      {/* Scrim over the photographs: the artwork and the labels have to stay
          readable whichever slide is showing. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-maroon-deep/65" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-maroon-deep/85 via-transparent to-maroon-deep/45" />

      {/* Semantic h1 for screen readers and SEO */}
      <h1 className="sr-only">{heroData.heroHeadline || site.name}</h1>

      {/* Hero Image prominently centered below navigation */}
      <div className="container-page flex flex-1 items-center justify-center pt-[calc(var(--header-h)+1.5rem)] pb-24 md:pb-28">
        <div className="relative flex w-full max-w-5xl items-center justify-center sm:px-6">
          <Image
            src={heroData.heroImage || "/images/hero image.png"}
            alt={site.name}
            width={2171}
            height={724}
            priority
            sizes="(min-width: 1280px) 1024px, (min-width: 768px) 85vw, 92vw"
            className="h-auto max-h-[48vh] w-full max-w-full object-contain select-none"
          />
        </div>
      </div>

      {/* Bottom bar outside the marked area: Karamadai / Coimbatore and Book / Enquire */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 container-page flex items-end justify-between pb-8 md:pb-12">
        <p className="label leading-relaxed" data-reveal="fade" style={revealDelay(0.8)}>
          {locationParts.map((part, i) => (
            <span key={i} className="block">
              {part}
            </span>
          ))}
        </p>
        <div data-reveal="fade" style={revealDelay(0.8)}>
          <ButtonLink
            href={heroData.buttonHref || enquireLink.href}
            variant="khaki"
            arrow
            className="pointer-events-auto"
          >
            {heroData.buttonLabel || enquireLink.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
