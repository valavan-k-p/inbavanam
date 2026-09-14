"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AdminField } from "@/lib/admin/resources";
import type { RecordFormState } from "@/app/admin/(dashboard)/actions";

type RecordFormProps = {
  fields: AdminField[];
  initial?: Record<string, unknown>;
  action: (prev: RecordFormState, formData: FormData) => Promise<RecordFormState>;
  cancelHref: string;
};

const inputClass =
  "min-h-11 w-full border border-input bg-cream/60 px-3 py-2 text-base hover:border-foreground focus:border-foreground aria-[invalid=true]:border-destructive";

function initialValue(field: AdminField, value: unknown): string {
  if (value === null || value === undefined) return "";
  if (field.type === "list" && Array.isArray(value)) return value.join("\n");
  return String(value);
}

export function RecordForm({ fields, initial = {}, action, cancelHref }: RecordFormProps) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.status === "error" && state.message ? (
        <p role="alert" className="border-l-2 border-destructive bg-cream p-4">
          {state.message}
        </p>
      ) : null}

      {fields.map((field) => {
        const id = `field-${field.name}`;
        const error = errors[field.name]?.[0];
        const describedBy =
          [field.hint ? `${id}-hint` : null, error ? `${id}-error` : null]
            .filter(Boolean)
            .join(" ") || undefined;
        const common = {
          id,
          name: field.name,
          "aria-invalid": Boolean(error),
          "aria-describedby": describedBy,
        };
        const value = initialValue(field, initial[field.name]);

        if (field.type === "checkbox") {
          return (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="flex items-center gap-3 font-semibold">
                <input
                  type="checkbox"
                  {...common}
                  defaultChecked={initial[field.name] === true}
                  className="size-5 accent-maroon"
                />
                {field.label}
              </label>
              {field.hint ? (
                <p id={`${id}-hint`} className="text-sm text-muted-foreground">
                  {field.hint}
                </p>
              ) : null}
            </div>
          );
        }

        return (
          <div key={field.name} className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-semibold">
              {field.label}
              {field.required ? <span className="text-terracotta"> *</span> : null}
            </label>
            {field.type === "textarea" || field.type === "list" ? (
              <textarea
                {...common}
                rows={field.type === "list" ? 4 : 5}
                defaultValue={value}
                className={inputClass}
              />
            ) : field.type === "select" ? (
              <select
                {...common}
                defaultValue={value}
                className={inputClass}
                required={field.required}
              >
                {field.required ? null : <option value="">None</option>}
                {field.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...common}
                type={field.type === "slug" ? "text" : field.type}
                defaultValue={value}
                required={field.required}
                className={inputClass}
              />
            )}
            {field.hint ? (
              <p id={`${id}-hint`} className="text-sm text-muted-foreground">
                {field.hint}
              </p>
            ) : null}
            {error ? (
              <p id={`${id}-error`} className="text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 cursor-pointer bg-primary px-6 label text-primary-foreground disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save"}
        </button>
        <Link href={cancelHref} className="label underline-offset-4 hover:underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
