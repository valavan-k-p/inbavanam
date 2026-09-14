import { foundersIntro, heroMedia, heroSlides } from "@/data/story";
import { enquireLink, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { revealDelay } from "@/components/ui/reveal";
import { HeroVideo } from "./hero-video";
import { HeroSlideshow } from "./hero-slideshow";
import { StoryButton } from "./story-button";

export function CinematicHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-maroon-deep"
    >
      {heroMedia.src ? (
        <div className="absolute inset-0 -z-20">
          <HeroVideo src={heroMedia.src} poster={heroMedia.poster ?? null} alt={heroMedia.alt} />
        </div>
      ) : (
        <HeroSlideshow slides={heroSlides} />
      )}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-maroon-deep/85 via-maroon-deep/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-maroon-deep/85 via-transparent to-maroon-deep/45" />

      <div className="container-page flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+3rem)] pb-36">
        <p
          className="label text-[0.8rem] leading-relaxed tracking-[0.26em] text-ivory/85"
          data-reveal="fade"
        >
          {site.heroEyebrow.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <h1
          id="hero-title"
          className="mt-8 max-w-[20ch] font-display text-[clamp(2.5rem,1.4rem+3.4vw,4.75rem)] leading-[1.04]"
        >
          <span className="sr-only">{site.name}. </span>
          {site.heroHeadline.map((line, i) => (
            <span
              key={line}
              className="block overflow-hidden pb-[0.1em]"
              data-reveal="rise"
              style={revealDelay(0.15 + i * 0.14)}
            >
              <span className="block">{line}</span>
            </span>
          ))}
        </h1>
        <div
          className="mt-10 flex flex-wrap items-center gap-6"
          data-reveal="up"
          style={revealDelay(0.6)}
        >
          <StoryButton media={foundersIntro.media} />
          <ButtonLink href={enquireLink.href} variant="khaki" className="md:hidden">
            {enquireLink.label}
          </ButtonLink>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 container-page hidden items-end justify-between pb-12 md:flex">
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
