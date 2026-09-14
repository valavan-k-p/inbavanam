import { MapPin } from "lucide-react";
import { communityBand, community, findUs, pillars, pullQuote } from "@/data/story";
import { contact, enquireLink, site, TBC } from "@/data/site";
import { LineArt } from "@/components/illustrations/line-art";
import { ButtonLink } from "@/components/ui/button-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { Paragraphs } from "@/components/ui/paragraphs";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/** Olive band of the four values, with an optional pull quote. */
export function ValuesBand({ withQuote = true }: { withQuote?: boolean }) {
  return (
    <section aria-labelledby="values-title" className="surface-olive grain overflow-hidden">
      <div className="container-page py-16 md:py-20">
        <h2 id="values-title" className="sr-only">
          What Inbavanam stands for
        </h2>
        <ul className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.label}
              delay={i * 0.1}
              className="group flex flex-col items-center gap-3 px-4 text-center md:border-l md:border-rule md:first:border-l-0"
            >
              <span className="grid size-16 place-items-center rounded-full border border-rule transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
                <LineArt name={pillar.art} className="size-9" />
              </span>
              <span className="mt-1 label">{pillar.label}</span>
              <span className="text-sm text-muted-foreground">{pillar.body}</span>
            </Reveal>
          ))}
        </ul>
        {withQuote ? (
          <Reveal
            variant="fade"
            className="mt-16 flex items-center justify-center gap-10 border-t border-rule pt-14"
          >
            <blockquote className="max-w-[24ch] text-center font-display text-h2 italic">
              &ldquo;{pullQuote}&rdquo;
            </blockquote>
            <LineArt name="leaf" className="hidden size-20 text-cream/70 md:block" />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/** Photograph band with the community story and a call to take part. */
export function CommunityBand() {
  return (
    <section
      aria-labelledby="community-band-title"
      className="on-dark relative isolate overflow-hidden bg-maroon-deep"
    >
      <div className="absolute inset-0 -z-10 sepia-[0.35]">
        <MediaFrame media={communityBand.media} fill tone="dark" sizes="100vw" zoom={false} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-maroon-deep/92 via-maroon-deep/65 to-maroon-deep/25" />
      <div className="container-page grid gap-12 py-[var(--section-y)] lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-7 lg:col-span-6">
          <SectionHeading
            id="community-band-title"
            eyebrow={community.eyebrow}
            title={community.heading}
          />
          <Reveal delay={0.2}>
            <Paragraphs items={community.body} className="text-lede" />
          </Reveal>
          <Reveal delay={0.3}>
            <ButtonLink href="/community" variant="light" arrow>
              Get involved
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal variant="right" delay={0.2} className="lg:col-span-5 lg:col-start-8">
          <blockquote className="font-display text-h2 italic">{communityBand.quote}</blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/** Landscape band with the location and directions. */
export function FindUsBand() {
  const external = Boolean(contact.mapUrl);
  return (
    <section
      aria-labelledby="find-title"
      className="on-dark relative isolate overflow-hidden bg-olive-deep"
    >
      <div className="absolute inset-0 -z-10">
        <MediaFrame media={findUs.media} fill tone="dark" sizes="100vw" zoom={false} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-maroon-deep/85 via-maroon-deep/40 to-transparent" />
      <div className="relative container-page flex min-h-[26rem] flex-col justify-center gap-6 py-20 md:min-h-[32rem]">
        <p className="label text-muted-foreground" data-reveal="fade">
          Find us
        </p>
        <h2 id="find-title" className="max-w-[16ch] text-h2" data-reveal="up">
          Karamadai, Coimbatore
        </h2>
        <Reveal delay={0.1}>
          <p className="prose-measure">
            {site.locationLong}.{" "}
            {contact.address ? contact.address : `Street address: ${TBC.toLowerCase()}.`}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <ButtonLink
            href={contact.mapUrl ?? "/contact"}
            variant="khaki"
            arrow
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {external ? "Get directions" : "Ask for directions"}
          </ButtonLink>
        </Reveal>
        <span
          aria-hidden="true"
          className="absolute top-1/2 right-[18%] hidden -translate-y-1/2 md:block"
        >
          <span className="absolute inset-0 -m-3 animate-[ping-soft_2.8s_ease-out_infinite] rounded-full border border-ivory/40" />
          <span className="grid size-12 place-items-center rounded-full bg-ivory text-maroon shadow-lg">
            <MapPin className="size-5" strokeWidth={1.5} />
          </span>
        </span>
      </div>
    </section>
  );
}

/** Walnut strip inviting a stay enquiry. */
export function PlanStayBand() {
  return (
    <section aria-labelledby="plan-title" className="surface-walnut grain">
      <div className="container-page flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
        <Reveal variant="left" className="flex items-center gap-6">
          <LineArt name="home" className="hidden size-14 text-cream sm:block" />
          <div>
            <h2 id="plan-title" className="text-h3">
              Plan your stay
            </h2>
            <p className="mt-2 text-muted-foreground">
              Tell us your dates and group size and we will reply with what is available.
            </p>
          </div>
        </Reveal>
        <Reveal variant="right">
          <ButtonLink href={enquireLink.href} variant="khaki" arrow>
            {enquireLink.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
