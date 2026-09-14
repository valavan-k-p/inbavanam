import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { adminResources } from "@/lib/admin/resources";

export default async function AdminDashboard() {
  const { supabase } = await requireStaff();

  const counts = await Promise.all(
    adminResources.map(async (r) => {
      const { count } = await supabase.from(r.table).select("id", { count: "exact", head: true });
      return { resource: r, count: count ?? 0 };
    }),
  );
  const { count: newEnquiries } = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-h2">Dashboard</h1>
      <Link
        href="/admin/enquiries"
        className="self-start border border-rule bg-cream p-6 hover:border-foreground"
      >
        <span className="label text-muted-foreground">New enquiries</span>
        <span className="mt-2 block font-display text-h1 tabular">{newEnquiries ?? 0}</span>
      </Link>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {counts.map(({ resource, count }) => (
          <li key={resource.slug}>
            <Link
              href={`/admin/${resource.slug}`}
              className="flex h-full flex-col gap-2 border border-rule p-5 hover:border-foreground"
            >
              <span className="flex items-baseline justify-between">
                <span className="font-display text-h3">{resource.title}</span>
                <span className="text-muted-foreground tabular">{count}</span>
              </span>
              <span className="text-sm text-muted-foreground">{resource.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
