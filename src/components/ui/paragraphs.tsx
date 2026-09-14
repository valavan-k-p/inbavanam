export function Paragraphs({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((p) => (
        <p key={p} className="mt-5 first:mt-0">
          {p}
        </p>
      ))}
    </div>
  );
}
