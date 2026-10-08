/**
 * Shown the instant a sidebar link is clicked, while the server fetches the
 * page. Without it the browser holds the previous page until everything is
 * ready, which reads as the admin having frozen.
 *
 * The sidebar lives in the layout, so only this panel is replaced.
 */
export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-live="polite" className="flex flex-col gap-8">
      <span className="sr-only">Loading</span>

      <div className="flex flex-col gap-3">
        <Bar className="h-3 w-28" />
        <Bar className="h-9 w-72 max-w-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-[var(--radius)] border border-rule p-5"
          >
            <Bar className="h-3 w-24" />
            <Bar className="h-8 w-16" />
            <Bar className="h-3 w-20" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-[var(--radius)] border border-rule p-6"
          >
            <Bar className="h-5 w-40" />
            {Array.from({ length: 3 }, (_, row) => (
              <div key={row} className="flex items-center gap-4 border-t border-rule pt-4">
                <Bar className="size-10 shrink-0 rounded" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <Bar className="h-3 w-2/3" />
                  <Bar className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** A placeholder block that pulses while the real content loads. */
function Bar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block animate-pulse rounded bg-walnut/15 motion-reduce:animate-none ${className ?? ""}`}
    />
  );
}
