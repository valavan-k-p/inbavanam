import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
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
    <section
      className={cn("pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-12 md:pb-16", className)}
    >
      <div className="container-page flex flex-col gap-10">
        <SectionHeading as="h1" size="h1" eyebrow={eyebrow} title={title} lede={lede} />
        {children ? <Reveal delay={0.24}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
