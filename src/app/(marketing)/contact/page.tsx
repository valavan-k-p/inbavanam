import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact, site, TBC } from "@/data/site";
import { contactIntro } from "@/data/story";
import { isEnquiryType } from "@/lib/validations/enquiry";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FindUsBand } from "@/components/sections/bands";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about a stay, an event, volunteering or supporting Inbavanam near Karamadai.",
  alternates: { canonical: "/contact" },
};

type ContactPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const type = first(params.type);
  const subject = first(params.space) ?? first(params.experience) ?? first(params.event);
  const context = subject ? `Enquiry started from: ${subject.slice(0, 80)}` : undefined;

  const details = [
    {
      icon: MapPin,
      term: "Location",
      value: contact.address ?? site.locationLong,
      href: contact.mapUrl,
    },
    {
      icon: Phone,
      term: "Phone",
      value: contact.phone ?? TBC,
      href: contact.phone ? `tel:${contact.phone}` : null,
    },
    {
      icon: Mail,
      term: "Email",
      value: contact.email ?? TBC,
      href: contact.email ? `mailto:${contact.email}` : null,
    },
  ];

  return (
    <>
      <section className="pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-[var(--section-y)]">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <SectionHeading
              as="h1"
              size="h1"
              eyebrow="Contact"
              title={contactIntro.heading}
              lede={contactIntro.body}
            />
            <dl className="flex flex-col gap-6">
              {details.map(({ icon: Icon, term, value, href }, i) => (
                <Reveal
                  key={term}
                  variant="left"
                  delay={0.2 + i * 0.1}
                  className="flex items-start gap-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-rule text-walnut">
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                  </span>
                  <span>
                    <dt className="label text-[0.62rem] text-muted-foreground">{term}</dt>
                    <dd className="mt-1">
                      {href ? (
                        <a href={href} className="link-underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </span>
                </Reveal>
              ))}
            </dl>
          </div>
          <Reveal
            variant="up"
            delay={0.15}
            className="rounded-[var(--radius)] border border-rule bg-card p-6 shadow-[0_30px_60px_-40px_rgb(43_21_21/0.45)] md:p-10 lg:col-span-7"
          >
            <EnquiryForm defaultType={isEnquiryType(type) ? type : "general"} context={context} />
          </Reveal>
        </div>
      </section>
      <FindUsBand />
    </>
  );
}
