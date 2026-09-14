import { contact, site } from "@/data/site";

/**
 * Organization structured data. Only fields backed by confirmed source
 * material are included; contact fields are added once supplied.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: new URL(site.logo.src, site.url).toString(),
    description: site.proposition,
    founder: site.founders.map((name) => ({ "@type": "Person", name })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karamadai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
      ...(contact.address ? { streetAddress: contact.address } : {}),
    },
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
  };
}

/** Renders JSON-LD safely: `<` is escaped so the payload cannot close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
