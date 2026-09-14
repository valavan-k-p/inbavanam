import type { Metadata } from "next";
import { community } from "@/data/story";
import { contact } from "@/data/site";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Paragraphs } from "@/components/ui/paragraphs";
import { MediaFrame } from "@/components/ui/media-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { LineArt } from "@/components/illustrations/line-art";

export const metadata: Metadata = {
  title: "Community",
  description: "Volunteer with, support or partner with Inbavanam and its community programs.",
  alternates: { canonical: "/community" },
};

const paths = [
  {
    id: "volunteer",
    title: "Volunteer",
    body: "Give time and skills to programs at and around Inbavanam. Specific roles and dates will be listed here as they are confirmed; tell us what you can offer in the meantime.",
    href: "/contact?type=volunteer",
    cta: "Offer your time",
    art: "sprout",
  },
  {
    id: "support",
    title: "Support Inbavanam",
    body: "The work is self-funded by the founders. Ways to contribute financially will be listed here once they are confirmed.",
    href: contact.supportUrl ?? "/contact?type=support",
    cta: contact.supportUrl ? "Support now" : "Ask how to help",
    art: "hands",
  },
  {
    id: "partner",
    title: "Partner or visit",
    body: "Organisations, schools and groups who want to work together, or bring people to learn from the land, can start a conversation with us.",
    href: "/contact?type=general",
    cta: "Get in touch",
    art: "gathering",
  },
] as const;

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Community"
        title={community.heading}
        lede="Ways to take part in the work around Inbavanam."
      />

      <section aria-labelledby="who-title" className="surface-olive grain section-y">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading
              id="who-title"
              eyebrow="Who we work with"
              title="Neighbours, not beneficiaries"
            />
            <Paragraphs items={community.body} className="text-lede" />
          </div>
          <MediaFrame
            media={community.media}
            ratio="4 / 3"
            className="lg:col-span-6 lg:col-start-7"
          />
        </div>
      </section>

      <section aria-labelledby="involved-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="involved-title"
            eyebrow="Get involved"
            title="Three ways to take part"
          />
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {paths.map((p) => (
              <article
                key={p.id}
                id={p.id}
                aria-labelledby={`${p.id}-title`}
                className="flex scroll-mt-24 flex-col gap-5 border-t border-rule pt-8"
              >
                <LineArt name={p.art} className="size-16 text-olive" />
                <h3 id={`${p.id}-title`} className="text-h3">
                  {p.title}
                </h3>
                <p className="text-muted-foreground">{p.body}</p>
                <ButtonLink
                  href={p.href}
                  variant={p.id === "support" ? "primary" : "outline"}
                  className="mt-auto self-start"
                >
                  {p.cta}
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
