import { cn } from "@/lib/utils";
import { revealDelay } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Heading level; pages use h1 once, sections default to h2. */
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h1" | "h2";
  align?: "start" | "center";
  id?: string;
  className?: string;
  /** Animate eyebrow, title and lede in sequence on scroll. */
  reveal?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  as: Tag = "h2",
  size = "h2",
  align = "start",
  id,
  className,
  reveal = true,
}: SectionHeadingProps) {
  const r = (variant: string, delay: number) =>
    reveal ? { "data-reveal": variant, style: revealDelay(delay) } : {};

  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="label text-muted-foreground" {...r("fade", 0)}>
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={cn(
          size === "display" && "text-display",
          size === "h1" && "text-h1",
          size === "h2" && "text-h2",
          "max-w-[20ch]",
        )}
        {...r("up", 0.08)}
      >
        {title}
      </Tag>
      {lede ? (
        <p className="prose-measure text-lede text-muted-foreground" {...r("up", 0.16)}>
          {lede}
        </p>
      ) : null}
    </header>
  );
}
