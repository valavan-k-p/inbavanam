"use client";

import { useState } from "react";
import { programIndex, type ProgramDetail } from "@/data/programs";
import { LineArt } from "@/components/illustrations/line-art";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
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
 *
 * Clicking any card opens a dedicated detail modal with accurate,
 * verified programme content from Inbavanam_Organisation_Profile.pdf.
 */
export function ProgramGrid({ items = programIndex }: { items?: ProgramDetail[] }) {
  const [activeProgram, setActiveProgram] = useState<ProgramDetail | null>(null);
  const activeIndex = activeProgram
    ? items.findIndex((p) => p.slug === activeProgram.slug)
    : -1;
  const activeTheme = activeIndex >= 0 ? cardThemes[activeIndex % cardThemes.length] : null;

  return (
    <>
      <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4.5 xl:gap-5">
        {items.map((program, i) => {
          const theme = cardThemes[i % cardThemes.length];
          return (
            <Reveal
              as="li"
              key={program.name}
              variant="fade"
              delay={(i % 4) * 0.05}
              className="h-full"
            >
              <button
                type="button"
                onClick={() => setActiveProgram(program)}
                aria-haspopup="dialog"
                aria-label={`View details for ${program.name}`}
                className={cn(
                  "group relative flex size-full min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3.5 rounded-[1.25rem] p-5 text-center select-none sm:min-h-[175px] sm:gap-4 sm:p-6",
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
                  className="font-display text-[1.05rem] leading-snug font-normal sm:text-[1.125rem]"
                  style={{ color: theme.text }}
                >
                  {program.name}
                </span>
              </button>
            </Reveal>
          );
        })}
      </ul>

      {/* Detail Dialog with PDF-grounded programme content */}
      <Dialog.Root
        open={activeProgram !== null}
        onOpenChange={(open) => {
          if (!open) setActiveProgram(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Popup className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 transition-[opacity,scale] duration-300 outline-none data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0 sm:p-6">
            {activeProgram && (
              <div className="surface-card relative w-full max-w-2xl rounded-[1.5rem] border border-rule bg-background p-6 shadow-[0_24px_48px_-12px_rgba(43,21,21,0.25)] sm:p-8 md:p-10">
                {/* Header with program icon and close button */}
                <div className="flex items-center justify-between gap-4 border-b border-rule pb-5">
                  <div className="flex items-center gap-3.5">
                    <span
                      className="grid size-12 place-items-center rounded-full border border-rule shadow-xs"
                      style={{
                        backgroundColor: activeTheme?.bg ?? "var(--brand-card)",
                        color: activeTheme?.icon ?? "var(--brand-olive)",
                      }}
                    >
                      <LineArt name={activeProgram.art} className="size-6" />
                    </span>
                    <div>
                      <span className="label text-xs font-medium tracking-widest text-olive uppercase">
                        {activeProgram.tag}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Inbavanam Programme Initiative
                      </p>
                    </div>
                  </div>

                  <Dialog.Close
                    aria-label="Close programme details"
                    className="grid size-10 cursor-pointer place-items-center rounded-full border border-rule text-muted-foreground transition-colors hover:border-walnut hover:text-foreground"
                  >
                    <X className="size-5" strokeWidth={1.5} />
                  </Dialog.Close>
                </div>

                {/* Title & Subtitle */}
                <div className="mt-6">
                  <Dialog.Title className="font-display text-2xl leading-tight font-normal text-foreground sm:text-3xl">
                    {activeProgram.name}
                  </Dialog.Title>
                  <p className="mt-1 label text-xs font-medium text-olive sm:text-sm">
                    {activeProgram.subtitle}
                  </p>
                </div>

                {/* Lead text extracted directly from the PDF */}
                <p className="mt-4 text-sm leading-relaxed font-normal text-foreground/90 sm:text-base">
                  {activeProgram.lead}
                </p>

                {/* Key focus & activities */}
                <div className="mt-6">
                  <h4 className="label text-xs tracking-wider text-muted-foreground uppercase">
                    Key Focus & Activities
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {activeProgram.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs leading-relaxed text-foreground/85 sm:text-sm"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-terracotta" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key fact chip & PDF source attribution */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rule bg-card/70 px-5 py-3.5">
                  <div>
                    <span className="block text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                      {activeProgram.keyFact.label}
                    </span>
                    <span className="font-serif text-sm font-medium text-foreground">
                      {activeProgram.keyFact.value}
                    </span>
                  </div>
                  <span className="text-[0.72rem] text-muted-foreground/80 italic sm:text-[0.68rem]">
                    Source: {activeProgram.sourceRef}
                  </span>
                </div>

                {/* Action CTAs */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                  <ButtonLink href="/community" variant="olive" size="sm" arrow>
                    Get involved
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="text" size="sm" arrow>
                    Enquire about this programme
                  </ButtonLink>
                </div>
              </div>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
