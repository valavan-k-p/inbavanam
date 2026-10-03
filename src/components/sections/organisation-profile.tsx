import {
  profileOverview,
  communitiesServed,
  programmePillars,
  resourceCentreProfile,
  corePrinciples,
  profileMedia,
} from "@/data/organisation-profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { LineArt } from "@/components/illustrations/line-art";
import { ButtonLink } from "@/components/ui/button-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { KolamDivider } from "@/components/illustrations/kolam";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The organisation profile, from
 * `public/content/Inbavanam_Organisation_Profile.pdf`. Laid out the way the
 * rest of the site is: rules rather than cards, sentence-case headings, the
 * line-art set rather than UI icons, and the shared surface classes.
 */
export function OrganisationProfileSection() {
  return (
    <div id="organisation-profile" className="scroll-mt-20">
      <section aria-labelledby="profile-overview-title" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading
              id="profile-overview-title"
              eyebrow={profileOverview.eyebrow}
              title={profileOverview.heading}
              lede={profileOverview.lede}
            />
            <Reveal delay={0.2} className="flex flex-wrap gap-6">
              <ButtonLink href="/community" variant="primary" arrow>
                Support our work
              </ButtonLink>
              <ButtonLink href="/contact" variant="text" arrow>
                Connect with us
              </ButtonLink>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
            <p className="label text-muted-foreground" data-reveal="fade">
              Where it started
            </p>
            <ul className="grid gap-10 sm:grid-cols-2">
              {profileOverview.foundingPriorities.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={0.15 + i * 0.1}
                  className="group flex flex-col gap-4 border-t border-rule pt-6"
                >
                  <span className="grid size-14 place-items-center rounded-full border border-rule transition-transform duration-500 group-hover:-translate-y-1">
                    <LineArt name={i === 0 ? "book" : "sprout"} className="size-8 text-olive" />
                  </span>
                  <h3 className="text-h3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="communities-title" className="surface-card section-y">
        <div className="container-page">
          <SectionHeading
            id="communities-title"
            eyebrow="Communities served"
            title="Two villages, side by side"
            lede="Inbavanam started in two villages in Mettupalayam Taluk, by turning up regularly, getting to know people, and working on things together."
          />

          <Reveal variant="clip" className="mt-14">
            <MediaFrame
              media={profileMedia.communities}
              ratio="var(--frame-ratio)"
              className="[--frame-ratio:1.33] md:[--frame-ratio:2.33]"
              sizes="100vw"
            />
          </Reveal>

          <ul className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {communitiesServed.map((community, i) => (
              <Reveal
                as="li"
                key={community.name}
                delay={i * 0.12}
                className="flex flex-col gap-5 border-t border-rule pt-8"
              >
                <div className="flex flex-col gap-2">
                  <p className="label text-muted-foreground">
                    {community.tag}
                    <span className="mx-3">&middot;</span>
                    {community.scale}
                  </p>
                  <h3 className="text-h3">{community.name}</h3>
                  <p className="text-sm text-muted-foreground">{community.location}</p>
                </div>

                <p className="text-muted-foreground">{community.context}</p>

                <div className="flex flex-col gap-3 border-t border-rule pt-5">
                  <h4 className="label text-muted-foreground">What Inbavanam does here</h4>
                  <ul className="flex flex-col gap-2 text-sm">
                    {community.initiatives.slice(0, 3).map((initiative) => (
                      <li key={initiative} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-olive" />
                        <span>{initiative}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="programmes-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="programmes-title"
            eyebrow="Programmes"
            title="One piece of work"
            lede="School, farming, rights and peace are not separate projects. Each one makes the others possible."
          />

          <Reveal variant="clip" className="mt-14">
            <MediaFrame
              media={profileMedia.programmes}
              ratio="var(--frame-ratio)"
              className="[--frame-ratio:1.33] md:[--frame-ratio:2.33]"
              sizes="100vw"
            />
          </Reveal>

          <ul className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {programmePillars.map((pillar, i) => (
              <Reveal
                as="li"
                key={pillar.id}
                delay={(i % 3) * 0.1}
                className="group flex flex-col gap-4 border-t border-rule pt-6"
              >
                <div className="flex items-center justify-between">
                  <span className="label text-muted-foreground tabular">{pad(i + 1)}</span>
                  <span className="grid size-14 place-items-center rounded-full border border-rule transition-transform duration-500 group-hover:-translate-y-1">
                    <LineArt name={pillar.art} className="size-8 text-olive" />
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-h3">{pillar.title}</h3>
                  <p className="label text-muted-foreground">{pillar.subtitle}</p>
                </div>

                <p className="text-muted-foreground">{pillar.summary}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className="mt-14">
            <ButtonLink href="/our-work" variant="olive" arrow>
              See each programme in detail
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="centre-title" className="surface-maroon grain section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading
              id="centre-title"
              eyebrow={resourceCentreProfile.eyebrow}
              title={resourceCentreProfile.heading}
              lede={resourceCentreProfile.summary}
            />

            <dl className="flex flex-col gap-4">
              {resourceCentreProfile.capacity.map((item) => (
                <Reveal
                  key={item.label}
                  variant="left"
                  className="flex items-baseline justify-between gap-6 border-t border-rule pt-4"
                >
                  <dt className="label text-muted-foreground">{item.label}</dt>
                  <dd className="text-right font-display text-lg">{item.value}</dd>
                </Reveal>
              ))}
            </dl>

            <Reveal variant="clip" delay={0.1}>
              <MediaFrame
                media={profileMedia.centre}
                ratio="3 / 2"
                tone="dark"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </Reveal>
          </div>

          <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:content-center">
            {resourceCentreProfile.features.map((feature, i) => (
              <Reveal
                as="li"
                key={feature.title}
                delay={i * 0.1}
                className="group flex flex-col gap-4 border-t border-rule pt-6"
              >
                <span className="grid size-14 place-items-center rounded-full border border-rule transition-transform duration-500 group-hover:-translate-y-1">
                  <LineArt name={feature.icon} className="size-8 text-khaki" />
                </span>
                <h3 className="text-h3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="principles-title"
            eyebrow="Core approach"
            title="How we work"
            lede="A few simple ideas sit behind everything here."
            align="center"
            className="mx-auto"
          />

          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {corePrinciples.map((principle, i) => (
              <Reveal
                as="li"
                key={principle.title}
                delay={(i % 3) * 0.1}
                className="group flex gap-5 border-t border-rule pt-6"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-rule transition-transform duration-500 group-hover:-translate-y-1">
                  <LineArt name={principle.art} className="size-8 text-olive" />
                </span>
                <span className="flex flex-col gap-2">
                  <h3 className="label">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.summary}</p>
                </span>
              </Reveal>
            ))}
          </ul>

          <KolamDivider className="mt-20" />
        </div>
      </section>
    </div>
  );
}
