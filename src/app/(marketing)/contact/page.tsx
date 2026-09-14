import type { Metadata } from "next";
import { contact, site, TBC } from "@/data/site";
import { isEnquiryType } from "@/lib/validations/enquiry";
import { PageHero } from "@/components/sections/page-hero";
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

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you have in mind."
        lede="Stays, gatherings, volunteering and support all start with a short message."
      />
      <section className="container-page grid gap-16 pb-[var(--section-y)] lg:grid-cols-12">
        <div className="lg:col-span-7">
          <EnquiryForm defaultType={isEnquiryType(type) ? type : "general"} context={context} />
        </div>
        <aside
          aria-labelledby="details-title"
          className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9"
        >
          <h2 id="details-title" className="text-h3">
            Contact details
          </h2>
          <dl className="flex flex-col gap-6">
            <Detail term="Email">
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
              ) : (
                TBC
              )}
            </Detail>
            <Detail term="Phone">
              {contact.phone ? (
                <a href={`tel:${contact.phone}`} className="underline underline-offset-4">
                  {contact.phone}
                </a>
              ) : (
                TBC
              )}
            </Detail>
            <Detail term="Where">{site.locationLong}</Detail>
            <Detail term="Address">{contact.address ?? TBC}</Detail>
          </dl>
        </aside>
      </section>
    </>
  );
}

function Detail({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-rule pt-4">
      <dt className="label text-muted-foreground">{term}</dt>
      <dd className="mt-2">{children}</dd>
    </div>
  );
}
