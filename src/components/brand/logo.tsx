"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// Intrinsic proportions of the supplied public/brand/logo.png.
const RATIO = 1226 / 1283;

type LogoProps = {
  size?: number;
  /**
   * The mark is black ink on a transparent ground, so on dark surfaces it
   * sits on an ivory disc. The artwork itself is never recoloured.
   */
  onDark?: boolean;
  priority?: boolean;
  className?: string;
};

export function Logo({ size = 56, onDark = false, priority = false, className }: LogoProps) {
  // If the file is missing, leave the space empty rather than show a broken image.
  const [failed, setFailed] = useState(false);
  const inner = onDark ? Math.round(size * 0.78) : size;
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center",
        onDark && "rounded-full bg-ivory ring-1 ring-ivory/40",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {failed ? null : (
        <Image
          src={site.logo.src}
          alt={site.logo.alt}
          width={Math.round(inner * RATIO)}
          height={inner}
          priority={priority}
          onError={() => setFailed(true)}
          className="h-auto max-h-full w-auto max-w-full"
        />
      )}
    </span>
  );
}
