"use client";

import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useRef, useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type Status = "idle" | "submitting" | "success" | "error";
type Values = Record<Field, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY: Values = { name: "", email: "", message: "" };

function validate(values: Values) {
  const errors: Partial<Record<Field, true>> = {};
  if (values.name.trim().length < 2) errors.name = true;
  if (!EMAIL_RE.test(values.email.trim())) errors.email = true;
  if (values.message.trim().length < 10) errors.message = true;
  return errors;
}

const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Contact form, delivered by Web3Forms straight from the browser (the site is
 * static). The access key identifies the inbox without revealing it: no email
 * address or phone number is ever exposed.
 */
export function ContactForm() {
  const t = useTranslations("contact.form");
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);
  const showError = (field: Field) => Boolean(errors[field] && (touched[field] || submitted));
  const fieldId = (field: Field) => `${uid}-${field}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const form = event.currentTarget;
    // Honeypot: empty for people, often filled by bots. Pretend success and drop it.
    const botcheck = String(new FormData(form).get("botcheck") ?? "");

    const invalid = (Object.keys(errors) as Field[])[0];
    if (invalid) {
      form.querySelector<HTMLElement>(`#${CSS.escape(fieldId(invalid))}`)?.focus();
      return;
    }

    if (botcheck) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      if (!siteConfig.web3formsAccessKey) throw new Error("Web3Forms access key is not configured (src/lib/site.ts)");
      const name = values.name.trim();
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: siteConfig.web3formsAccessKey,
          subject: `Portfolio — new message from ${name}`,
          from_name: "Portfolio Zouhour Abdelli",
          name,
          email: values.email.trim(),
          replyto: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || !result?.success) throw new Error(String(response.status));
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
      setSubmitted(false);
    } catch (error) {
      console.error("[contact]", error);
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("input:not([tabindex='-1'])")?.focus());
  }

  const inputBase =
    "w-full rounded-xl border bg-bg/60 px-4 py-3 text-[0.95rem] text-fg placeholder:text-subtle transition-[border-color,box-shadow] duration-300 outline-none focus:border-accent focus:shadow-[0_0_0_4px_var(--glow)]";

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-card sm:p-8 md:p-10">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]"
      />

      <div role="status" aria-live="polite" className="sr-only">
        {status === "success" ? `${t("successTitle")} ${t("successText")}` : null}
        {status === "error" ? `${t("errorTitle")} ${t("errorText")}` : null}
      </div>

      {status === "success" ? (
        <div className="animate-fade-up flex min-h-[420px] flex-col items-center justify-center text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-600 ring-8 ring-emerald-400/5 dark:text-emerald-300">
            <CircleCheck className="size-8" aria-hidden="true" />
          </span>
          <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg">{t("successTitle")}</h3>
          <p className="mt-2 max-w-sm text-muted">{t("successText")}</p>
          <button type="button" onClick={reset} className={buttonClasses("secondary", "md", "mt-8")}>
            {t("sendAnother")}
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          className={cn("space-y-5", status !== "idle" && "animate-fade-in")}
        >
          <h3 className="font-display text-xl font-semibold tracking-tight text-fg">{t("title")}</h3>

          {/* Honeypot — hidden from people and assistive tech */}
          <div aria-hidden="true" className="absolute -start-[9999px] size-px overflow-hidden">
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {(["name", "email"] as const).map((field) => (
              <div key={field}>
                <label
                  htmlFor={fieldId(field)}
                  className="mb-2 flex items-center justify-between text-sm font-medium text-fg"
                >
                  {t(field)}
                  <span className="text-xs font-normal text-subtle">{t("required")}</span>
                </label>
                <input
                  id={fieldId(field)}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  inputMode={field === "email" ? "email" : undefined}
                  autoComplete={field === "email" ? "email" : "name"}
                  dir={field === "email" ? "ltr" : undefined}
                  required
                  value={values[field]}
                  onChange={(e) => setValues((v) => ({ ...v, [field]: e.target.value }))}
                  onBlur={() => setTouched((tt) => ({ ...tt, [field]: true }))}
                  placeholder={t(`${field}Placeholder`)}
                  aria-invalid={showError(field) || undefined}
                  aria-describedby={showError(field) ? `${fieldId(field)}-error` : undefined}
                  className={cn(
                    inputBase,
                    showError(field) ? "border-rose-400/70" : "border-line-strong",
                    field === "email" && "text-start rtl:text-end",
                  )}
                />
                {showError(field) ? (
                  <p id={`${fieldId(field)}-error`} className="mt-2 text-xs text-rose-600 dark:text-rose-300">
                    {t(`errors.${field}`)}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor={fieldId("message")}
              className="mb-2 flex items-center justify-between text-sm font-medium text-fg"
            >
              {t("message")}
              <span className="text-xs font-normal text-subtle">{t("required")}</span>
            </label>
            <textarea
              id={fieldId("message")}
              name="message"
              required
              rows={6}
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              onBlur={() => setTouched((tt) => ({ ...tt, message: true }))}
              placeholder={t("messagePlaceholder")}
              aria-invalid={showError("message") || undefined}
              aria-describedby={showError("message") ? `${fieldId("message")}-error` : undefined}
              className={cn(inputBase, "resize-y", showError("message") ? "border-rose-400/70" : "border-line-strong")}
            />
            {showError("message") ? (
              <p id={`${fieldId("message")}-error`} className="mt-2 text-xs text-rose-600 dark:text-rose-300">
                {t("errors.message")}
              </p>
            ) : null}
          </div>

          {status === "error" ? (
            <p className="flex items-start gap-3 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-fg">
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-rose-500" aria-hidden="true" />
              <span>
                <strong className="font-semibold">{t("errorTitle")}</strong> {t("errorText")}
              </span>
            </p>
          ) : null}

          <button type="submit" disabled={status === "submitting"} className={buttonClasses("primary", "lg", "w-full")}>
            {status === "submitting" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                {t("sending")}
              </>
            ) : (
              <>
                {t("submit")}
                <Send
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
