import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { getAdminResource } from "@/lib/admin/resources";
import { RecordForm } from "@/components/admin/record-form";
import { saveRecord } from "../../actions";

type Props = { params: Promise<{ resource: string }> };

export default async function NewRecordPage({ params }: Props) {
  const { resource: slug } = await params;
  const resource = getAdminResource(slug);
  if (!resource) notFound();
  await requireStaff();

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <h1 className="text-h2">Add {resource.singular}</h1>
      <RecordForm
        fields={resource.fields}
        action={saveRecord.bind(null, resource.slug, null)}
        cancelHref={`/admin/${resource.slug}`}
      />
    </div>
  );
}
