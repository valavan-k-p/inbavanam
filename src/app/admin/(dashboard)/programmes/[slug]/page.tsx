import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { programIndex, type ProgramDetail } from "@/data/programs";
import { ProgrammeForm } from "@/components/admin/programme-form";
import { saveProgramme } from "../actions";

type Props = { params: Promise<{ slug: string }> };

export const metadata = { title: "Edit Programme" };

export default async function EditProgrammePage({ params }: Props) {
  const { slug } = await params;
  const { supabase } = await requireAdmin();

  const { data: setting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "programs")
    .single();

  let storedPrograms: (ProgramDetail & { published?: boolean })[] = [];
  if (setting?.value && Array.isArray(setting.value)) {
    storedPrograms = setting.value;
  } else {
    storedPrograms = programIndex.map((p) => ({ ...p, published: true }));
  }

  const programme = storedPrograms.find((p) => p.slug === slug);
  if (!programme) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div>
        <span className="label text-muted-foreground">Work Initiatives</span>
        <h1 className="text-h2">Edit Programme: {programme.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update the titles, short descriptions, key highlights, and fact details for this programme card.
        </p>
      </div>

      <ProgrammeForm
        initial={programme}
        action={saveProgramme.bind(null, slug)}
        cancelHref="/admin/programmes"
      />
    </div>
  );
}
