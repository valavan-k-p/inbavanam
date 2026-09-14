import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonLink = cva(
  "inline-flex min-h-12 items-center justify-center gap-3 px-6 label transition-colors duration-[var(--dur-fast)] cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/88",
        outline: "border border-current text-foreground hover:bg-foreground/8",
        accent: "bg-terracotta text-ivory hover:bg-terracotta/88",
        text: "min-h-11 px-0 text-foreground underline-offset-8 hover:underline",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonLink> & { arrow?: boolean };

export function ButtonLink({
  variant,
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonLink({ variant }), className)} {...props}>
      <span>{children}</span>
      {arrow ? <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} /> : null}
    </Link>
  );
}

export { buttonLink };
