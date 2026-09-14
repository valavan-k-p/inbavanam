import Link from "next/link";
import { contact, enquireLink, primaryNav, site, supportLink, TBC } from "@/data/site";
import { Logo } from "@/components/brand/logo";

const takePart = [
  supportLink,
  { label: "Volunteer", href: "/community#volunteer" },
  { label: "Get involved", href: "/community" },
  enquireLink,
];

export function Footer() {
  return (
    <footer className="surface-walnut grain">
      <div className="container-page grid gap-12 py-20 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-4">
          <Logo size={88} onDark />
          <p className="max-w-[28ch] font-display text-h3 italic">{site.proposition}</p>
        </div>

        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 md:col-span-8">
          <FooterColumn title="Explore" links={primaryNav} />
          <FooterColumn title="Take part" links={takePart} />
          <div>
            <h2 className="label text-muted-foreground">Contact</h2>
            <address className="mt-5 flex flex-col gap-3 not-italic">
              <span>{site.locationLong}</span>
              <span>
                {contact.email ? (
                  <a
                    className="underline-offset-4 hover:underline"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                ) : (
                  <>Email: {TBC}</>
                )}
              </span>
              <span>
                {contact.phone ? (
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                ) : (
                  <>Phone: {TBC}</>
                )}
              </span>
            </address>
          </div>
        </nav>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-rule py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.locationShort}</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="label text-muted-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-block py-2 underline-offset-4 hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
