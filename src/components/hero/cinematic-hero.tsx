import { heroMedia } from "@/data/story";
import { enquireLink, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button-link";
import { KolamKnot } from "@/components/illustrations/kolam";
import { HeroVideo } from "./hero-video";

export function CinematicHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface-maroon relative isolate flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        {heroMedia.src ? (
          <HeroVideo src={heroMedia.src} poster={heroMedia.poster ?? null} alt={heroMedia.alt} />
        ) : (
          <HeroPlaceholder />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-maroon-deep/90 via-maroon-deep/35 to-maroon-deep/20" />
      </div>

      <div className="pointer-events-none container-page pt-40 pb-[clamp(3rem,9vh,7rem)]">
        <p className="label text-muted-foreground">{site.locationShort}</p>
        <h1 id="hero-title" className="mt-6 text-display tracking-[0.06em] uppercase">
          {site.name}
        </h1>
        <p className="mt-6 font-display text-h3 italic">
          {site.heroLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <div className="pointer-events-auto mt-10 flex flex-wrap gap-4">
          <ButtonLink href="#essence" variant="primary">
            Explore Inbavanam
          </ButtonLink>
          <ButtonLink href={enquireLink.href} variant="outline">
            Plan your stay
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** Stands in for the hero video until footage is supplied. */
function HeroPlaceholder() {
  return (
    <div data-placeholder="media" className="grain absolute inset-0 bg-maroon">
      <KolamKnot className="absolute top-1/2 left-1/2 w-[min(70vw,34rem)] -translate-x-1/2 -translate-y-[60%] text-stone/20" />
      <p className="absolute top-28 right-[var(--gutter)] label text-stone/80">
        Hero video to be supplied
      </p>
    </div>
  );
}
