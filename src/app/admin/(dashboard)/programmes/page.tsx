import Link from "next/link";
import { Edit } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { programIndex, type ProgramDetail } from "@/data/programs";
import { LineArt } from "@/components/illustrations/line-art";

import { ProgrammesToolbar } from "@/components/admin/programmes-toolbar";

export const metadata = { title: "Programmes Management" };

export default async function AdminProgrammesPage() {
  const { supabase } = await requireAdmin();

  const { data: setting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "programs")
    .single();

  let programmes: (ProgramDetail & { published?: boolean })[] = [];
  if (setting?.value && Array.isArray(setting.value)) {
    programmes = setting.value;
  } else {
    programmes = programIndex.map((p) => ({ ...p, published: true }));
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="label text-muted-foreground">Work Initiatives</span>
        <h1 className="text-h2">Programmes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the 12 core programmes from the Inbavanam Organisation Profile. Edit subtitles,
          leads, bullet points, key facts, and visibility.
        </p>
      </div>

      <ProgrammesToolbar />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programmes.map((p) => {
          const isPublished = p.published !== false;
          return (
            <div
              key={p.slug}
              className="flex flex-col justify-between rounded-[var(--radius)] border border-rule bg-card p-5 shadow-xs transition-colors hover:border-foreground"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded bg-cream text-maroon">
                    <LineArt name={p.art} className="size-6" />
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold ${
                      isPublished
                        ? "bg-olive/15 text-olive"
                        : "bg-terracotta/15 text-terracotta"
                    }`}
                  >
                    {isPublished ? "Published" : "Hidden"}
                  </span>
                </div>

                <div>
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                    {p.tag}
                  </span>
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    {p.name}
                  </h2>
                  <p className="text-xs font-medium text-walnut">{p.subtitle}</p>
                </div>

                <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed">
                  {p.lead}
                </p>

                <div className="rounded bg-background/60 p-2 text-[0.7rem] text-muted-foreground">
                  <span className="font-semibold">{p.keyFact.label}:</span> {p.keyFact.value}
                </div>
              </div>

              <div className="mt-5 border-t border-rule pt-3">
                <Link
                  href={`/admin/programmes/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold label text-foreground hover:text-terracotta"
                >
                  <Edit className="size-3.5" />
                  <span>Edit Content & Outcomes</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
