import { requireStaff } from "@/lib/auth";
import { enquiryTypeLabels, isEnquiryType } from "@/lib/validations/enquiry";
import { formatDateRange } from "@/lib/dates";
import { setEnquiryStatus } from "../actions";

export const metadata = { title: "Enquiries" };

const statusLabels = { new: "New", in_progress: "In progress", closed: "Closed" } as const;

export default async function EnquiriesPage() {
  const { supabase } = await requireStaff();
  const { data: enquiries, error } = await supabase
    .from("enquiries")
    .select(
      "id,type,name,email,phone,arrival_date,departure_date,group_size,message,context,status,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-h2">Enquiries</h1>
      {error ? <p role="alert">Could not load enquiries: {error.message}</p> : null}
      {enquiries?.length ? (
        <ul className="flex flex-col">
          {enquiries.map((e) => (
            <li key={e.id} className="grid gap-4 border-t border-rule py-6 lg:grid-cols-12">
              <div className="flex flex-col gap-1 lg:col-span-3">
                <p className="label text-terracotta">
                  {isEnquiryType(e.type) ? enquiryTypeLabels[e.type] : e.type}
                </p>
                <p className="font-semibold">{e.name}</p>
                <a href={`mailto:${e.email}`} className="underline underline-offset-4">
                  {e.email}
                </a>
                {e.phone ? <p>{e.phone}</p> : null}
                <p className="text-sm text-muted-foreground">
                  Received{" "}
                  {new Date(e.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </p>
              </div>
              <div className="flex flex-col gap-2 lg:col-span-6">
                {e.arrival_date ? (
                  <p className="text-sm">
                    Dates: {formatDateRange(e.arrival_date, e.departure_date ?? undefined)}
                  </p>
                ) : null}
                {e.group_size ? <p className="text-sm">Group size: {e.group_size}</p> : null}
                {e.context ? <p className="text-sm text-muted-foreground">{e.context}</p> : null}
                <p className="whitespace-pre-line">{e.message}</p>
              </div>
              <form
                action={setEnquiryStatus.bind(null, e.id)}
                className="flex items-start gap-2 lg:col-span-3"
              >
                <label className="sr-only" htmlFor={`status-${e.id}`}>
                  Status
                </label>
                <select
                  id={`status-${e.id}`}
                  name="status"
                  defaultValue={e.status}
                  className="min-h-11 border border-input bg-cream/60 px-3"
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="min-h-11 cursor-pointer border border-rule px-4 label hover:border-foreground"
                >
                  Update
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No enquiries yet.</p>
      )}
    </div>
  );
}
