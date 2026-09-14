import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Set-in-type name that accompanies the supplied logo mark. */
export function Wordmark({
  tagline = false,
  className,
}: {
  tagline?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="font-display text-[1.35rem] tracking-[0.14em] uppercase">{site.name}</span>
      {tagline ? (
        <span className="mt-2 label text-[0.6rem] tracking-[0.3em] text-muted-foreground">
          {site.tagline}
        </span>
      ) : null}
    </span>
  );
}
