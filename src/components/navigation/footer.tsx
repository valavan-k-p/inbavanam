import Link from "next/link";
import { contact, primaryNav, site, supportLink } from "@/data/site";
import { Logo } from "@/components/brand/logo";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button-link";

export function Footer() {
  return (
    <footer className="surface-card border-t border-rule">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:items-center">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex items-center gap-4 self-start lg:col-span-4"
        >
          <Logo size={76} />
          <Wordmark tagline />
        </Link>

        <nav aria-label="Footer" className="lg:col-span-5">
          <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block link-underline py-2.5 label text-[0.66rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-4 lg:col-span-3 lg:items-end">
          <ButtonLink href={supportLink.href} variant="olive" arrow>
            {supportLink.label}
          </ButtonLink>
          <p className="text-sm text-muted-foreground">{site.locationShort}</p>
        </div>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-rule py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
          {contact.email ? (
            <>
              {" · "}
              <a href={`mailto:${contact.email}`} className="link-underline">
                {contact.email}
              </a>
            </>
          ) : null}
        </p>
        <ul className="flex gap-6">
          <li>
            <Link href="/contact" className="inline-block link-underline py-2">
              Contact
            </Link>
          </li>
          <li>
            <a href="/sitemap.xml" className="inline-block link-underline py-2">
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
