import {
  profileOverview,
  communitiesServed,
  programmePillars,
  resourceCentreProfile,
  corePrinciples,
} from "@/data/organisation-profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { LineArt } from "@/components/illustrations/line-art";
import { ButtonLink } from "@/components/ui/button-link";
import { KolamDivider } from "@/components/illustrations/kolam";
import { Check, Users, MapPin, Building2, Sun, Droplets, Bird, Compass } from "lucide-react";

export function OrganisationProfileSection() {
  return (
    <div id="organisation-profile" className="scroll-mt-20">
      {/* 1. Profile Overview & Founding Purpose */}
      <section aria-labelledby="profile-overview-title" className="section-y">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                id="profile-overview-title"
                eyebrow={profileOverview.eyebrow}
                title={profileOverview.heading}
                lede={profileOverview.lede}
              />
              <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/community" variant="primary" arrow>
                  Support our work
                </ButtonLink>
                <ButtonLink href="/contact" variant="text" arrow>
                  Connect with us
                </ButtonLink>
              </Reveal>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <p className="label text-muted-foreground uppercase tracking-wider">
                  Two Foundational Priorities
                </p>
              </Reveal>
              <div className="grid gap-6 sm:grid-cols-2">
                {profileOverview.foundingPriorities.map((item, i) => (
                  <Reveal
                    key={item.title}
                    delay={0.15 + i * 0.1}
                    className="flex flex-col gap-3 rounded-[var(--radius)] border border-rule bg-background p-6 transition-all duration-300 hover:border-walnut/40"
                  >
                    <span className="grid size-12 place-items-center rounded-full border border-rule bg-card">
                      <LineArt name={i === 0 ? "book" : "sprout"} className="size-6 text-olive" />
                    </span>
                    <h3 className="text-h3 font-serif text-lg">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Communities at the Heart of Inbavanam */}
      <section aria-labelledby="communities-title" className="surface-card section-y">
        <div className="container-page">
          <SectionHeading
            id="communities-title"
            eyebrow="Communities Served"
            title="Grassroots Partnership & Shared Dignity"
            lede="Inbavanam began by working directly with two historically marginalised settlements in Mettupalayam Taluk, building trusting relationships through regular presence and practical collaboration."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {communitiesServed.map((comm, idx) => (
              <Reveal
                key={comm.name}
                delay={idx * 0.15}
                className="flex flex-col justify-between rounded-[var(--radius)] border border-rule bg-background p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
                    <span className="label text-xs uppercase tracking-widest text-olive">
                      {comm.tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="size-3.5 text-walnut" />
                      {comm.scale}
                    </span>
                  </div>

                  <h3 className="mt-5 text-h2 font-serif text-2xl">{comm.name}</h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-terracotta" />
                    {comm.location}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                    {comm.context}
                  </p>

                  {/* Challenges addressed */}
                  <div className="mt-6 border-t border-rule/60 pt-5">
                    <h4 className="label text-xs text-muted-foreground">
                      Key Structural Challenges
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                      {comm.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-walnut/60" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practical Initiatives */}
                <div className="mt-8 rounded-[var(--radius)] border border-rule bg-card/60 p-5">
                  <h4 className="label text-xs text-olive font-medium">
                    Inbavanam Collaborative Action
                  </h4>
                  <ul className="mt-3 space-y-2 text-xs text-foreground/90">
                    {comm.initiatives.map((init) => (
                      <li key={init} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-olive" />
                        <span>{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Programme Areas */}
      <section aria-labelledby="programmes-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="programmes-title"
            eyebrow="Programmes & Initiatives"
            title="Integrated Pathways to Long-Term Transformation"
            lede="Education, agriculture, civic rights, and conflict transformation work together as interconnected strands of sustainable human and community development."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programmePillars.map((p, i) => (
              <Reveal
                key={p.id}
                delay={(i % 3) * 0.1}
                className="group flex flex-col justify-between rounded-[var(--radius)] border border-rule bg-background p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-walnut/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="label text-xs tabular text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-12 place-items-center rounded-full border border-rule bg-card transition-transform duration-500 group-hover:scale-105">
                      <LineArt name={p.art} className="size-6 text-olive" />
                    </span>
                  </div>

                  <h3 className="mt-5 text-h3 font-serif text-xl">{p.title}</h3>
                  <p className="label mt-1 text-xs text-olive font-medium">{p.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-rule pt-4 text-xs text-foreground/80">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="mt-1 size-1 shrink-0 bg-terracotta" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {p.keyFacts && (
                  <div className="mt-6 grid grid-cols-2 gap-2 border-t border-rule pt-4 text-center">
                    {p.keyFacts.map((fact) => (
                      <div key={fact.label} className="rounded bg-card p-2">
                        <p className="text-[0.68rem] text-muted-foreground uppercase tracking-wider">
                          {fact.label}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-foreground">
                          {fact.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Inbavanam Resource Centre (Living Demonstration Campus) */}
      <section
        aria-labelledby="centre-title"
        className="on-dark relative isolate overflow-hidden bg-maroon-deep py-[var(--section-y)]"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-maroon-deep/90 via-maroon-deep/95 to-maroon-deep" />
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col gap-6 lg:col-span-5">
              <SectionHeading
                id="centre-title"
                eyebrow={resourceCentreProfile.eyebrow}
                title={resourceCentreProfile.heading}
                lede={resourceCentreProfile.summary}
              />

              {/* Campus Capacity Stats */}
              <div className="mt-2 grid grid-cols-2 gap-4">
                {resourceCentreProfile.capacity.map((cap) => (
                  <div
                    key={cap.label}
                    className="rounded-[var(--radius)] border border-ivory/20 bg-ivory/5 p-4"
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {cap.label}
                    </p>
                    <p className="mt-1 font-serif text-lg font-medium text-ivory">
                      {cap.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Diverse Groups Served */}
              <div className="mt-4 border-t border-ivory/15 pt-5">
                <p className="label text-xs uppercase tracking-widest text-brand-stone">
                  Groups Welcomed at the Centre
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-xs text-ivory/90">
                  {resourceCentreProfile.groupsServed.map((g) => (
                    <li key={g} className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-khaki" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Environmental Architecture & Eco-features */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              {resourceCentreProfile.features.map((feat) => (
                <div
                  key={feat.title}
                  className="flex flex-col gap-3 rounded-[var(--radius)] border border-ivory/15 bg-ivory/[0.04] p-6 backdrop-blur-xs transition-colors duration-300 hover:bg-ivory/[0.08]"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-ivory/10 text-ivory">
                    <LineArt name={feat.icon} className="size-5 text-khaki" />
                  </span>
                  <h4 className="font-serif text-base text-ivory">{feat.title}</h4>
                  <p className="text-xs leading-relaxed text-ivory/80">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Guiding Principles & Core Approach */}
      <section aria-labelledby="principles-title" className="section-y">
        <div className="container-page">
          <div className="text-center">
            <SectionHeading
              id="principles-title"
              eyebrow="Core Approach"
              title="Principles Guiding Every Action"
              lede="Inbavanam works through shared values that uphold human dignity, collective ownership, and deep ecological responsibility."
              align="center"
            />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {corePrinciples.map((principle, idx) => (
              <Reveal
                key={principle.title}
                delay={idx * 0.08}
                className="group flex flex-col gap-3 rounded-[var(--radius)] border border-rule bg-background p-6 transition-all duration-300 hover:border-walnut/40 hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-rule bg-card transition-transform duration-500 group-hover:scale-105">
                    <LineArt name={principle.art} className="size-6 text-olive" />
                  </span>
                  <h3 className="text-h3 font-serif text-lg">{principle.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.summary}
                </p>
              </Reveal>
            ))}
          </div>

          <KolamDivider className="mt-20" />
        </div>
      </section>
    </div>
  );
}
