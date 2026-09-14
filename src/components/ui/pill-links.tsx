import Link from "next/link";

/** In-page navigation styled as pills (for jumping to sections). */
export function PillLinks({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-10 items-center rounded-full border border-rule px-4 label text-[0.66rem] transition-colors duration-300 hover:border-maroon hover:bg-maroon hover:text-ivory"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
