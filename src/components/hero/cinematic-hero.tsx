import Image from "next/image";
import { enquireLink, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { revealDelay } from "@/components/ui/reveal";

export function CinematicHero() {
  return (
    <section
      aria-label={site.name}
      className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-maroon-deep grain"
    >

      {/* Existing atmospheric gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-maroon-deep/85 via-transparent to-maroon-deep/45" />

      {/* Semantic h1 for screen readers and SEO */}
      <h1 className="sr-only">{site.name}</h1>

      {/* Hero Image prominently centered below navigation */}
      <div className="container-page flex flex-1 items-center justify-center pt-[calc(var(--header-h)+1.5rem)] pb-24 md:pb-28">
        <div className="relative flex w-full max-w-5xl items-center justify-center px-4 sm:px-6">
          <Image
            src="/images/hero image.png"
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
          <span className="block">Karamadai</span>
          <span className="block">Coimbatore</span>
        </p>
        <div data-reveal="fade" style={revealDelay(0.8)}>
          <ButtonLink href={enquireLink.href} variant="khaki" arrow className="pointer-events-auto">
            {enquireLink.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

