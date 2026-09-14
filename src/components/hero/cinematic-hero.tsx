import { enquireLink, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { revealDelay } from "@/components/ui/reveal";
import { HeroVideo } from "./hero-video";

export function CinematicHero() {
  return (
    <section
      aria-label={site.name}
      className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-maroon-deep"
    >
      {/* Right-side hero media container */}
      <div className="absolute inset-0 md:left-1/2 -z-20">
        <HeroVideo src="/videos/inbavanam-hero.mp4" />
      </div>

      {/* Existing atmospheric gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-maroon-deep/85 via-maroon-deep/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-maroon-deep/85 via-transparent to-maroon-deep/45" />

      {/* Semantic h1 for screen readers and SEO */}
      <h1 className="sr-only">{site.name}</h1>

      {/* Left side remains clean and minimal */}
      <div className="container-page flex flex-1 flex-col justify-center" />

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

