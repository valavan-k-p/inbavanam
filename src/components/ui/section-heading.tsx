import { cn } from "@/lib/utils";

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
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="flex items-center gap-3 label text-muted-foreground">
          <span aria-hidden="true" className="inline-block size-1.5 rotate-45 bg-terracotta" />
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={cn(
          size === "display" && "text-display",
          size === "h1" && "text-h1",
          size === "h2" && "text-h2",
          "max-w-[18ch]",
        )}
      >
        {title}
      </Tag>
      {lede ? <p className="prose-measure text-lede text-muted-foreground">{lede}</p> : null}
    </header>
  );
}
