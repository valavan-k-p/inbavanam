"use client";

import { cloneElement, useActionState, useEffect, useId, useRef, useState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/(marketing)/contact/actions";
import {
  enquiryTypeLabels,
  enquiryTypes,
  validateEnquiry,
  type EnquiryFieldErrors,
  type EnquiryType,
} from "@/lib/validations/enquiry";
import { cn } from "@/lib/utils";

const initialState: EnquiryState = { status: "idle" };

const fieldLabels: Record<string, string> = {
  type: "Enquiry type",
  name: "Name",
  email: "Email",
  phone: "Phone",
  arrival: "Arrival",
  departure: "Departure",
  groupSize: "Group size",
  message: "Message",
  consent: "Consent",
};

type EnquiryFormProps = { defaultType?: EnquiryType; context?: string };

/**
 * One validated form for every enquiry context. Validates in the browser
 * for instant feedback and again on the server. After a failed submit,
 * focus moves to an error summary that links to each field.
 */
export function EnquiryForm({ defaultType = "general", context }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [type, setType] = useState<EnquiryType>(defaultType);
  const [clientErrors, setClientErrors] = useState<EnquiryFieldErrors | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const errors = clientErrors ?? (state.status === "error" ? state.fieldErrors : undefined) ?? {};
  const errorEntries = Object.entries(errors).filter(([, messages]) => messages?.length);
  const showSummary =
    errorEntries.length > 0 || (state.status === "error" && !clientErrors && state.message);

  useEffect(() => {
    if (showSummary) summaryRef.current?.focus();
  }, [showSummary, state, clientErrors]);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col gap-5 border-t border-rule pt-8">
        <p className="font-display text-h3">Thank you. Your enquiry has been sent.</p>
        <p className="text-muted-foreground">We will reply to the email address you gave us.</p>
      </div>
    );
  }

  const id = (name: string) => `${baseId}-${name}`;
  const v = state.values ?? {};
  const fieldError = (name: keyof EnquiryFieldErrors) => errors[name]?.[0];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const result = validateEnquiry(values);
    if (!result.success) {
      event.preventDefault();
      setClientErrors(result.fieldErrors);
    } else {
      setClientErrors(null);
    }
  };

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {showSummary ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-destructive bg-ivory p-5 outline-none focus-visible:outline-2"
        >
          <p className="font-semibold">
            {clientErrors
              ? "Please check the fields marked below."
              : (state.message ?? "Please check the fields marked below.")}
          </p>
          {errorEntries.length ? (
            <ul className="mt-3 flex flex-col gap-1 text-sm">
              {errorEntries.map(([name, messages]) => (
                <li key={name}>
                  <a href={`#${id(name)}`} className="underline underline-offset-4">
                    {fieldLabels[name] ?? name}: {messages?.[0]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 label text-muted-foreground">What is this about?</legend>
        <div id={id("type")} className="flex flex-wrap gap-2">
          {enquiryTypes.map((t) => (
            <label
              key={t}
              className={cn(
                "flex min-h-11 cursor-pointer items-center border px-4 label transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                type === t
                  ? "border-maroon bg-maroon text-ivory"
                  : "border-rule hover:border-foreground",
              )}
            >
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="sr-only"
              />
              {enquiryTypeLabels[t]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Name" required error={fieldError("name")}>
          <input name="name" type="text" autoComplete="name" defaultValue={v.name} required />
        </Field>
        <Field id={id("email")} label="Email" required error={fieldError("email")}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            defaultValue={v.email}
            required
          />
        </Field>
        <Field
          id={id("phone")}
          label="Phone"
          hint="Optional. Include your country code if outside India."
          error={fieldError("phone")}
        >
          <input name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} />
        </Field>
        {type === "stay" || type === "event" ? (
          <Field
            id={id("groupSize")}
            label="Group size"
            hint="Approximate is fine."
            error={fieldError("groupSize")}
          >
            <input
              name="groupSize"
              type="number"
              inputMode="numeric"
              min={1}
              defaultValue={v.groupSize}
            />
          </Field>
        ) : null}
        {type === "stay" || type === "event" ? (
          <>
            <Field
              id={id("arrival")}
              label={type === "stay" ? "Arrival" : "Preferred date"}
              error={fieldError("arrival")}
            >
              <input name="arrival" type="date" defaultValue={v.arrival} />
            </Field>
            <Field
              id={id("departure")}
              label={type === "stay" ? "Departure" : "End date"}
              hint="Optional."
              error={fieldError("departure")}
            >
              <input name="departure" type="date" defaultValue={v.departure} />
            </Field>
          </>
        ) : null}
      </div>

      <Field
        id={id("message")}
        label="Message"
        required
        hint={messageHints[type]}
        error={fieldError("message")}
      >
        <textarea name="message" rows={6} defaultValue={v.message} required />
      </Field>

      {context ? <input type="hidden" name="context" value={context} /> : null}

      {/* Honeypot field, hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            defaultChecked={v.consent === "on"}
            aria-invalid={Boolean(fieldError("consent"))}
            aria-describedby={fieldError("consent") ? `${id("consent")}-error` : undefined}
            className="mt-1 size-5 accent-maroon"
          />
          <span>I agree that Inbavanam may use these details to reply to my enquiry.</span>
        </label>
        {fieldError("consent") ? (
          <p id={`${id("consent")}-error`} className="text-sm font-medium text-destructive">
            {fieldError("consent")}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="inline-flex min-h-12 cursor-pointer items-center justify-center self-start bg-primary px-8 label text-primary-foreground transition-colors hover:bg-primary/88 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  );
}

const messageHints: Record<EnquiryType, string> = {
  general: "Tell us what you would like to know.",
  stay: "Who is coming, and anything we should know to prepare.",
  event: "The kind of gathering, the number of people and what you need from the space.",
  volunteer: "Your skills, your availability and what draws you to the work.",
  support: "How you would like to help.",
};

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
};

function Field({ id, label, required, hint, error, children }: FieldProps) {
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;
  const control = cloneElement(children, {
    id,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    className:
      "min-h-12 w-full border border-input bg-ivory/60 px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground hover:border-foreground focus:border-foreground aria-[invalid=true]:border-destructive",
  });
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-terracotta">
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {control}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
