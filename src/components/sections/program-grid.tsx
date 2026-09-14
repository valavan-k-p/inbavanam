import Link from "next/link";
import { programIndex } from "@/data/programs";
import { LineArt } from "@/components/illustrations/line-art";
import { Reveal } from "@/components/ui/reveal";

/** Icon grid of individual programs, each linking to its program area. */
export function ProgramGrid() {
  return (
    <ul className="grid grid-cols-2 border-t border-l border-rule sm:grid-cols-3 lg:grid-cols-4">
      {programIndex.map((program, i) => (
        <Reveal
          as="li"
          key={program.name}
          variant="fade"
          delay={(i % 4) * 0.07}
          className="border-r border-b border-rule"
        >
          <Link
            href={`/our-work#${program.area}`}
            className="group flex h-full flex-col items-center gap-4 px-4 py-9 text-center transition-colors duration-500 hover:bg-card"
          >
            <LineArt
              name={program.art}
              className="size-16 text-walnut transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 group-hover:scale-105"
            />
            <span className="font-display text-[1.15rem] leading-snug">{program.name}</span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
