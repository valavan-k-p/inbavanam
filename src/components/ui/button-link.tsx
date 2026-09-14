import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonLink = cva(
  "group/btn label inline-flex cursor-pointer items-center justify-center gap-3 select-none transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        olive: "bg-olive-deep text-ivory hover:bg-olive",
        light: "bg-ivory text-maroon hover:bg-paper",
        outline: "border border-current text-foreground hover:bg-foreground/[0.07]",
        khaki: "border border-khaki text-ivory hover:border-ivory hover:bg-khaki/15",
        text: "text-foreground",
      },
      size: {
        md: "min-h-12 px-6",
        sm: "min-h-10 px-4 text-[0.66rem]",
      },
    },
    compoundVariants: [{ variant: "text", className: "min-h-11 px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonLink> & { arrow?: boolean };

export function ButtonLink({
  variant,
  size,
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonLink({ variant, size }), className)} {...props}>
      <span className={variant === "text" ? "link-underline pb-0.5" : undefined}>{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          strokeWidth={1.5}
        />
      ) : null}
    </Link>
  );
}

export { buttonLink };
