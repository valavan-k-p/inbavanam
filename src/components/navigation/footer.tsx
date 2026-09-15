import Link from "next/link";
import { contact, primaryNav, site, supportLink } from "@/data/site";
import { Logo } from "@/components/brand/logo";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button-link";

/**
 * Botanical grain/seed stalk inspired by the reference image's handcrafted
 * natural motifs, drawn in Inbavanam's printed line-art aesthetic.
 */
function BotanicalStalk({
  height = 110,
  className,
  color = "#4a432b",
  leafFill = "#786b44",
}: {
  height?: number;
  className?: string;
  color?: string;
  leafFill?: string;
}) {
  const seeds = [
    { y: 22, rot: -32 },
    { y: 22, rot: 32 },
    { y: 38, rot: -34 },
    { y: 38, rot: 34 },
    { y: 54, rot: -36 },
    { y: 54, rot: 36 },
    { y: 70, rot: -38 },
    { y: 70, rot: 38 },
    { y: 86, rot: -40 },
    { y: 86, rot: 40 },
  ];

  return (
    <svg
      viewBox="0 0 44 110"
      height={height}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Central stem */}
      <path d="M22,110 L22,8" />
      {/* Terminal tip leaf */}
      <path
        d="M22,8 C20,4 20,1 22,0 C24,1 24,4 22,8 Z"
        fill={leafFill}
      />
      {/* Paired alternating seeds */}
      {seeds.map((s, idx) => {
        const isLeft = s.rot < 0;
        const leafPath = isLeft
          ? `M22,${s.y} C17,${s.y - 4} 12,${s.y - 8} 11,${s.y - 12} C15,${s.y - 10} 19,${s.y - 6} 22,${s.y} Z`
          : `M22,${s.y} C27,${s.y - 4} 32,${s.y - 8} 33,${s.y - 12} C29,${s.y - 10} 25,${s.y - 6} 22,${s.y} Z`;
        return (
          <path
            key={idx}
            d={leafPath}
            fill={leafFill}
          />
        );
      })}
    </svg>
  );
}

/**
 * Clean, radiant sun motif inspired by the reference design:
 * a solid circular core with 24 delicate radial rays in warm muted gold.
 */
function SunMotif({ className }: { className?: string }) {
  const rays = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 15 * Math.PI) / 180;
    const x1 = (50 + Math.cos(angle) * 19).toFixed(2);
    const y1 = (50 + Math.sin(angle) * 19).toFixed(2);
    const x2 = (50 + Math.cos(angle) * 28).toFixed(2);
    const y2 = (50 + Math.sin(angle) * 28).toFixed(2);
    return { x1, y1, x2, y2 };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Central sun circle */}
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="#d8be75"
        stroke="#8b712b"
        strokeWidth={1.4}
      />
      {/* 24 radial rays */}
      {rays.map((ray, i) => (
        <line
          key={i}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke="#997c2e"
          strokeWidth={1.35}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/**
 * 4-line rhythmic wavy ribbon pattern inspired by the reference image.
 */
function WavyRibbon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 32"
      className={className}
      fill="none"
      strokeWidth={1.35}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M0,5 Q22.5,0 45,5 T90,5 T135,5 T180,5" stroke="#ab5945" />
      <path d="M0,12 Q22.5,7 45,12 T90,12 T135,12 T180,12" stroke="#5a5233" />
      <path d="M0,19 Q22.5,14 45,19 T90,19 T135,19 T180,19" stroke="#9e823c" />
      <path d="M0,26 Q22.5,21 45,26 T90,26 T135,26 T180,26" stroke="#705039" />
    </svg>
  );
}

/**
 * Graceful deer & fawn wildlife motif directly inspired by the reference image,
 * stylized with handcrafted Inbavanam line-art and ornamental flank dots.
 */
function DeerMotif({ className }: { className?: string }) {
  // Ornamental concentric dots on the deer's shoulder/flank
  const ring1 = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 * Math.PI) / 180;
    return { cx: +(46 + Math.cos(a) * 5).toFixed(1), cy: +(46 + Math.sin(a) * 5).toFixed(1) };
  });
  const ring2 = Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 * Math.PI) / 180;
    return { cx: +(46 + Math.cos(a) * 9.5).toFixed(1), cy: +(46 + Math.sin(a) * 9.5).toFixed(1) };
  });

  return (
    <svg
      viewBox="0 0 126 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* --- Mother Deer --- */}
      {/* Body silhouette */}
      <path
        d="M17,96 L20,96 L23,72 C24,63 26,52 22,46 C16,42 12,45 13,42 C16,39 21,41 26,43 C35,44 43,42 50,36 C55,31 60,22 64,17 L65,11 C64,9 62,11 59,10 C63,8 67,10 67,12 L69,15 C74,13 78,11 82,13 C84,14 82,17 78,18 C74,21 70,25 68,32 C65,40 64,44 64,48 L65,96 L62,96 L61,56 C57,58 52,60 48,60 C40,60 36,58 32,62 L26,96 L23,96 L28,68 C27,62 25,58 22,54 C19,58 18,72 17,96 Z"
        fill="#6b4231"
      />

      {/* Branching Antlers */}
      <g stroke="#533123" strokeWidth={1.3} strokeLinecap="round">
        {/* Main beam extending back-up */}
        <path d="M63,13 C60,9 56,5 50,2" />
        <path d="M57,8 C54,4 52,0 47,1" />
        <path d="M52,3 C50,-1 46,-2 44,0" />
        {/* Forward brow tines */}
        <path d="M65,11 C68,7 72,4 77,3" />
        <path d="M70,6 C74,3 78,0 82,2" />
      </g>

      {/* Ornamental mandala dot pattern on the flank (matching reference) */}
      <circle cx="46" cy="46" r="2" fill="#faf5ee" />
      {ring1.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={1.2} fill="#faf5ee" />
      ))}
      {ring2.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={1.1} fill="#faf5ee" />
      ))}

      {/* --- Small Companion Fawn --- */}
      {/* Fawn body */}
      <path
        d="M93,96 L95,96 L97,80 C98,73 99,66 96,62 C92,59 89,61 90,59 C92,57 95,58 98,60 C104,61 109,59 113,55 C116,52 119,46 121,43 L122,39 C121,38 120,39 118,38 C121,37 123,38 123,39 L124,41 C127,40 129,39 131,40 C132,41 131,43 129,44 C126,46 124,48 123,52 C121,57 120,60 120,62 L121,96 L119,96 L118,68 C115,70 112,71 109,71 C104,71 101,70 99,72 L96,96 L94,96 L97,78 C96,74 95,71 93,69 C91,71 90,80 93,96 Z"
        fill="#7c4c37"
        transform="translate(-16, 0)"
      />
      {/* Fawn small budding antler / ears */}
      <path
        d="M106,39 C108,35 112,33 115,34 M104,39 C102,36 100,34 97,35"
        stroke="#5e3827"
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      {/* Fawn small dots */}
      <circle cx="89" cy="62" r="1.1" fill="#faf5ee" />
      <circle cx="86" cy="65" r="1" fill="#faf5ee" />
      <circle cx="92" cy="65" r="1" fill="#faf5ee" />
      <circle cx="89" cy="68" r="1" fill="#faf5ee" />
    </svg>
  );
}

/**
 * Decorative background system for the ending section, incorporating the
 * reference's nature motifs (contour wave lines, rolling hills, botanical stalks,
 * radiant sun, and deer wildlife) in Inbavanam's medium-contrast earthy palette.
 */
function FooterDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* 1. Radiant sun detail in the upper right background */}
      <SunMotif className="absolute -top-3 right-6 sm:right-16 lg:right-28 size-20 sm:size-24" />

      {/* 2. Rhythmic 4-line wavy ribbon accent floating near center-top */}
      <WavyRibbon className="absolute top-7 left-1/3 hidden w-28 md:block lg:w-36" />

      {/* 3. Rolling landscape silhouette across the base */}
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-44 w-full"
      >
        {/* Soft background hill fill */}
        <path
          d="M0,135 C280,95 560,155 860,115 C1120,80 1300,125 1440,105 L1440,200 L0,200 Z"
          fill="#ebdccb"
        />
        {/* Foreground rolling terrain contour */}
        <path
          d="M0,152 C340,128 640,172 960,138 C1200,110 1340,140 1440,130 L1440,200 L0,200 Z"
          fill="#dfcfbd"
        />
      </svg>

      {/* 4. Deer & Fawn wildlife motif standing naturally on the terrain */}
      <DeerMotif className="absolute bottom-10 right-10 sm:right-24 lg:right-36 xl:right-44 h-18 sm:h-22 lg:h-24 w-auto" />

      {/* 5. Botanical stalks rising from the terrain in the lower margins */}
      {/* Left botanical cluster */}
      <div className="absolute bottom-4 left-3 sm:left-8 lg:left-14 flex items-end gap-1.5">
        <BotanicalStalk
          height={100}
          color="#4a432b"
          leafFill="#786b44"
        />
        <BotanicalStalk
          height={78}
          color="#7c4636"
          leafFill="#a7523f"
        />
      </div>

      {/* Right botanical cluster (framing the right side near the deer) */}
      <div className="absolute bottom-4 right-3 sm:right-8 lg:right-12 hidden items-end gap-1.5 sm:flex">
        <BotanicalStalk
          height={82}
          color="#7c4636"
          leafFill="#a7523f"
        />
        <BotanicalStalk
          height={104}
          color="#4a432b"
          leafFill="#786b44"
        />
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative surface-card border-t border-rule overflow-hidden">
      {/* Nature-inspired decorative layer inspired by the reference design */}
      <FooterDecorations />

      <div className="relative z-10 container-page grid gap-12 py-16 lg:grid-cols-12 lg:items-center">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex items-center gap-4 self-start lg:col-span-4"
        >
          <Logo size={76} />
          <Wordmark tagline />
        </Link>

        <nav aria-label="Footer" className="lg:col-span-5">
          <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block link-underline py-2.5 label text-[0.66rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-4 lg:col-span-3 lg:items-end">
          <ButtonLink href={supportLink.href} variant="olive" arrow>
            {supportLink.label}
          </ButtonLink>
          <p className="text-sm text-muted-foreground">{site.locationShort}</p>
        </div>
      </div>

      <div className="relative z-10 container-page flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
          {contact.email ? (
            <>
              {" · "}
              <a href={`mailto:${contact.email}`} className="link-underline">
                {contact.email}
              </a>
            </>
          ) : null}
        </p>
        <ul className="flex gap-6">
          <li>
            <Link href="/contact" className="inline-block link-underline py-2">
              Contact
            </Link>
          </li>
          <li>
            <a href="/sitemap.xml" className="inline-block link-underline py-2">
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
