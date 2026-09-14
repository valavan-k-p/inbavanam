import { SectionHeading } from "@/components/ui/section-heading";
import { KolamDivider } from "@/components/illustrations/kolam";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Opening block for inner pages; clears the fixed header. */
export function PageHero({ eyebrow, title, lede, className, children }: PageHeroProps) {
  return (
    <section className={cn("pt-[calc(var(--header-h)+clamp(3.5rem,8vw,7rem))] pb-14", className)}>
      <div className="container-page flex flex-col gap-10">
        <SectionHeading as="h1" size="h1" eyebrow={eyebrow} title={title} lede={lede} />
        {children}
      </div>
      <KolamDivider className="container-page mt-16" count={7} />
    </section>
  );
}
