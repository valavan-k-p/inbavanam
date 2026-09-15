import Link from "next/link";
import { programIndex } from "@/data/programs";
import { LineArt } from "@/components/illustrations/line-art";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type CardTheme = {
  bg: string;
  border: string;
  icon: string;
  text: string;
};

/**
 * Medium-light, clearly visible natural earthy palette for each initiative tile.
 * Sophisticated, rich, and visible against the warm cream background while
 * avoiding washed-out pastel tones or heavy dark shades.
 */
const cardThemes: CardTheme[] = [
  // 1: Peacebuilding — Muted sage green
  { bg: "#B7C9B0", border: "rgba(36, 54, 32, 0.14)", icon: "#223320", text: "#1b2919" },
  // 2: Organizational Capacity Building — Warm clay beige
  { bg: "#D2BFA9", border: "rgba(62, 44, 26, 0.14)", icon: "#382517", text: "#2c1c11" },
  // 3: Children's Empowerment — Muted dusty terracotta
  { bg: "#D8B8AE", border: "rgba(74, 38, 28, 0.14)", icon: "#422119", text: "#331912" },
  // 4: Outbound Trainings — Muted warm ochre
  { bg: "#D2C49A", border: "rgba(64, 54, 22, 0.14)", icon: "#382e14", text: "#2c240f" },
  // 5: WISDOM Workshops — Muted olive / deep sage (solid colour, no image)
  { bg: "#9EAB83", border: "rgba(38, 48, 26, 0.16)", icon: "#24301a", text: "#1c2514" },
  // 6: Education — Warm stone
  { bg: "#C9BDAE", border: "rgba(58, 46, 36, 0.14)", icon: "#33271d", text: "#271d15" },
  // 7: Gender Empowerment — Warm sand
  { bg: "#DDD0B8", border: "rgba(64, 50, 30, 0.14)", icon: "#382a19", text: "#2a1f12" },
  // 8: Natural Farming — Muted botanical green
  { bg: "#B5C79E", border: "rgba(40, 56, 28, 0.14)", icon: "#24351a", text: "#1c2b14" },
  // 9: Community Sports and Engagement — Warm sandstone
  { bg: "#D1BFA3", border: "rgba(64, 48, 30, 0.14)", icon: "#382819", text: "#2c1f12" },
  // 10: Access to Justice — Muted terracotta
  { bg: "#D3B1A7", border: "rgba(72, 38, 30, 0.14)", icon: "#402018", text: "#311812" },
  // 11: Tribal Panchayat Leaders Empowerment — Warm muted stone/olive
  { bg: "#C4C0AE", border: "rgba(52, 50, 36, 0.14)", icon: "#2e2c20", text: "#232218" },
  // 12: Sustainable Development — Muted sage
  { bg: "#B5C9AE", border: "rgba(38, 54, 32, 0.14)", icon: "#223320", text: "#1a2918" },
];

/**
 * Initiatives grid: modular, compact rounded-tile cards with individual
 * medium-light earthy background colors, subtle depth, small elegant line-art icons,
 * centered serif titles.
 */
export function ProgramGrid() {
  return (
    <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4.5 xl:gap-5">
      {programIndex.map((program, i) => {
        const theme = cardThemes[i % cardThemes.length];
        return (
          <Reveal
            as="li"
            key={program.name}
            variant="fade"
            delay={(i % 4) * 0.05}
            className="h-full"
          >
            <Link
              href={`/our-work#${program.area}`}
              className={cn(
                "group relative flex h-full min-h-[160px] sm:min-h-[175px] flex-col items-center justify-center gap-3.5 sm:gap-4 rounded-[1.25rem] p-5 sm:p-6 text-center select-none",
                "shadow-[0_4px_14px_-2px_rgba(45,28,20,0.07),0_2px_5px_-1px_rgba(45,28,20,0.04)]",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:shadow-[0_10px_24px_-4px_rgba(45,28,20,0.12),0_4px_8px_-2px_rgba(45,28,20,0.06)] hover:brightness-[1.02]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-terracotta)]",
              )}
              style={{
                backgroundColor: theme.bg,
                borderColor: theme.border,
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <div
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-105"
                style={{ color: theme.icon }}
              >
                <LineArt name={program.art} className="size-9" />
              </div>
              <span
                className="font-display text-[1.05rem] sm:text-[1.125rem] font-normal leading-snug"
                style={{ color: theme.text }}
              >
                {program.name}
              </span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
