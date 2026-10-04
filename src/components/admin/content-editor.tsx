"use client";

import { useActionState, useState } from "react";
import { Check, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { saveSiteContent, type ContentSaveState } from "@/app/admin/(dashboard)/content/actions";

interface SectionField {
  name: string;
  label: string;
  type: "text" | "textarea";
  hint?: string;
  rows?: number;
}

interface ContentSectionConfig {
  key: string;
  title: string;
  description: string;
  fields: SectionField[];
}

const inputClass =
  "min-h-11 w-full rounded-[var(--radius)] border border-input bg-cream/50 px-3.5 py-2 text-base text-ink transition-colors hover:border-foreground focus:border-foreground focus:outline-hidden";

function SectionCard({
  config,
  initialValues,
}: {
  config: ContentSectionConfig;
  initialValues: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, pending] = useActionState<ContentSaveState, FormData>(
    saveSiteContent.bind(null, config.key),
    { status: "idle" },
  );

  return (
    <div className="rounded-[var(--radius)] border border-rule bg-card shadow-xs transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-background/40"
      >
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded bg-cream text-maroon">
            <FileText className="size-4" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{config.title}</h3>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {state.status === "success" && (
            <span className="flex items-center gap-1 text-xs font-bold text-olive">
              <Check className="size-3.5" /> Saved
            </span>
          )}
          {isOpen ? <ChevronDown className="size-5 text-muted-foreground" /> : <ChevronRight className="size-5 text-muted-foreground" />}
        </div>
      </button>

      {isOpen && (
        <form action={formAction} className="border-t border-rule p-6 flex flex-col gap-5">
          {state.status === "error" && state.message && (
            <div role="alert" className="rounded border-l-4 border-destructive bg-background p-3 text-xs text-destructive">
              {state.message}
            </div>
          )}
          {state.status === "success" && state.message && (
            <div role="alert" className="rounded border-l-4 border-olive bg-background p-3 text-xs text-olive">
              {state.message}
            </div>
          )}

          {config.fields.map((f) => (
            <div key={f.name} className="flex flex-col gap-1.5">
              <label htmlFor={`${config.key}-${f.name}`} className="text-xs font-semibold label text-foreground">
                {f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  id={`${config.key}-${f.name}`}
                  name={f.name}
                  rows={f.rows ?? 3}
                  defaultValue={initialValues[f.name] ?? ""}
                  className={inputClass}
                />
              ) : (
                <input
                  id={`${config.key}-${f.name}`}
                  name={f.name}
                  type="text"
                  defaultValue={initialValues[f.name] ?? ""}
                  className={inputClass}
                />
              )}
              {f.hint && <p className="text-[0.7rem] text-muted-foreground">{f.hint}</p>}
            </div>
          ))}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-rule">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-primary px-6 label text-xs text-primary-foreground transition-opacity disabled:opacity-60"
            >
              {pending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export function ContentEditor({
  sections,
  values,
}: {
  sections: ContentSectionConfig[];
  values: Record<string, Record<string, string>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <SectionCard
          key={section.key}
          config={section}
          initialValues={values[section.key] ?? {}}
        />
      ))}
    </div>
  );
}
