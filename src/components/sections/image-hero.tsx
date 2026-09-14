import type { MediaAsset } from "@/types/content";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type ImageHeroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  media: MediaAsset;
  children?: React.ReactNode;
};

/** Full-bleed photographic opening for inner pages (for example Stay). */
export function ImageHero({ eyebrow, title, lede, media, children }: ImageHeroProps) {
  return (
    <section className="on-dark relative isolate flex min-h-[78svh] items-end overflow-hidden bg-maroon-deep">
      <div className="absolute inset-0 -z-10 motion-safe:animate-[kenburns_14s_ease-out_both]">
        <MediaFrame media={media} fill tone="dark" priority sizes="100vw" zoom={false} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-maroon-deep/90 via-maroon-deep/35 to-maroon-deep/40" />
      <div className="container-page flex flex-col gap-8 pt-[calc(var(--header-h)+4rem)] pb-16">
        <SectionHeading as="h1" size="h1" eyebrow={eyebrow} title={title} lede={lede} />
        {children ? <Reveal delay={0.25}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
