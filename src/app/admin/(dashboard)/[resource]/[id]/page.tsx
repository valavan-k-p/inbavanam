import { notFound } from "next/navigation";
import { z } from "zod";
import { requireStaff } from "@/lib/auth";
import { getAdminResource } from "@/lib/admin/resources";
import { RecordForm } from "@/components/admin/record-form";
import { deleteRecord, saveRecord } from "../../actions";

type Props = { params: Promise<{ resource: string; id: string }> };

export default async function EditRecordPage({ params }: Props) {
  const { resource: slug, id } = await params;
  const resource = getAdminResource(slug);
  if (!resource || !z.uuid().safeParse(id).success) notFound();
  const { supabase } = await requireStaff();

  const { data: record } = await supabase.from(resource.table).select("*").eq("id", id).single();
  if (!record) notFound();

  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <h1 className="text-h2">Edit {resource.singular}</h1>
      <RecordForm
        fields={resource.fields}
        initial={record as Record<string, unknown>}
        action={saveRecord.bind(null, resource.slug, id)}
        cancelHref={`/admin/${resource.slug}`}
      />

      <section
        aria-labelledby="danger-title"
        className="flex flex-col gap-4 border-t border-destructive/40 pt-8"
      >
        <h2 id="danger-title" className="text-h3">
          Delete this {resource.singular}
        </h2>
        <p className="text-muted-foreground">
          Deleting removes it from the site and from the database. Unpublishing is usually the safer
          choice.
        </p>
        <form
          action={deleteRecord.bind(null, resource.slug, id)}
          className="flex flex-col items-start gap-4"
        >
          <label className="flex items-center gap-3">
            <input type="checkbox" name="confirm" required className="size-5 accent-maroon" />I
            understand this cannot be undone.
          </label>
          <button
            type="submit"
            className="min-h-11 cursor-pointer border border-destructive px-5 label text-destructive hover:bg-destructive hover:text-ivory"
          >
            Delete permanently
          </button>
        </form>
      </section>
    </div>
  );
}
