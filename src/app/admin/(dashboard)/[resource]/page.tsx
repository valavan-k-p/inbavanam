import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { getAdminResource } from "@/lib/admin/resources";
import { setPublished } from "../actions";

type Props = { params: Promise<{ resource: string }> };

export default async function ResourceListPage({ params }: Props) {
  const { resource: slug } = await params;
  const resource = getAdminResource(slug);
  if (!resource) notFound();
  const { supabase } = await requireStaff();

  const { data: rows, error } = await supabase
    .from(resource.table)
    .select(["id", "published", ...resource.listColumns].join(","))
    .order(resource.orderBy.column, { ascending: resource.orderBy.ascending });
  const labels = Object.fromEntries(resource.fields.map((f) => [f.name, f.label]));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h2">{resource.title}</h1>
          <p className="mt-2 text-muted-foreground">{resource.description}</p>
        </div>
        <Link
          href={`/admin/${resource.slug}/new`}
          className="inline-flex min-h-11 items-center bg-primary px-5 label text-primary-foreground"
        >
          Add {resource.singular}
        </Link>
      </div>

      {error ? (
        <p role="alert">
          Could not load {resource.title.toLowerCase()}: {error.message}
        </p>
      ) : null}

      {rows && rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                {resource.listColumns.map((c) => (
                  <th key={c} scope="col" className="py-3 pr-4 label text-muted-foreground">
                    {labels[c] ?? c}
                  </th>
                ))}
                <th scope="col" className="py-3 pr-4 label text-muted-foreground">
                  Status
                </th>
                <th scope="col" className="sr-only">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {(rows as unknown as Record<string, unknown>[]).map((row) => {
                const id = String(row.id);
                const isPublished = row.published === true;
                return (
                  <tr key={id} className="border-b border-rule">
                    {resource.listColumns.map((c, i) => (
                      <td key={c} className="py-3 pr-4">
                        {i === 0 ? (
                          <Link
                            href={`/admin/${resource.slug}/${id}`}
                            className="underline underline-offset-4"
                          >
                            {String(row[c] ?? "Untitled")}
                          </Link>
                        ) : (
                          String(row[c] ?? "")
                        )}
                      </td>
                    ))}
                    <td className="py-3 pr-4">{isPublished ? "Published" : "Draft"}</td>
                    <td className="py-3 text-right">
                      <form action={setPublished.bind(null, resource.slug, id)}>
                        <input type="hidden" name="published" value={String(!isPublished)} />
                        <button
                          type="submit"
                          className="min-h-11 cursor-pointer label underline-offset-4 hover:underline"
                        >
                          {isPublished ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="border-t border-rule pt-6 text-muted-foreground">
          No {resource.title.toLowerCase()} yet.
        </p>
      )}
    </div>
  );
}
