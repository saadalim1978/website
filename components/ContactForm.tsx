"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import type { Dictionary } from "@/content/ar";

type Status = "idle" | "sending" | "success" | "mailto" | "error";
type ServiceOption = { id: string; title: string };

/**
 * نموذج التواصل:
 * - إذا كان NEXT_PUBLIC_FORMSPREE_ID مضبوطاً وقت البناء ← يُرسل مباشرة عبر Formspree.
 * - إذا لم يكن مضبوطاً ← يفتح تطبيق البريد لدى الزائر برسالة جاهزة إلى بريد الشركة.
 * في الحالتين يعمل النموذج دائماً، ولا تظهر للزائر أي رسالة عن الإعدادات.
 */
export default function ContactForm({
  t,
  services,
  email,
}: {
  t: Dictionary["contact"];
  services: ServiceOption[];
  email: string;
}) {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [mobileError, setMobileError] = useState(false);
  const serviceRef = useRef<HTMLSelectElement>(null);

  // اختيار الخدمة تلقائياً عند القدوم من رابط مثل ?service=software
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.id === id);
    if (match && serviceRef.current) serviceRef.current.value = match.title;
  }, [services]);

  function openMailClient(data: FormData) {
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const lines = [
      `${t.fields.name}: ${get("name")}`,
      `${t.fields.organization}: ${get("organization") || "-"}`,
      `${t.fields.mobile}: ${get("mobile")}`,
      `${t.fields.email}: ${get("email")}`,
      `${t.fields.service}: ${get("service")}`,
      "",
      get("message"),
    ];
    const subject = `${t.mailSubject} — ${get("service")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    // أرقام سعودية أو دولية: 7 إلى 15 رقماً مع + اختيارية
    const mobile = String(data.get("mobile") ?? "").replace(/[\s-]/g, "");
    if (!/^\+?\d{7,15}$/.test(mobile)) {
      setMobileError(true);
      (form.elements.namedItem("mobile") as HTMLInputElement | null)?.focus();
      return;
    }
    setMobileError(false);

    if (!formId) {
      openMailClient(data);
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const label = "mb-1.5 block text-sm font-medium text-ink";
  const input =
    "block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
  const req = (
    <span className="text-red-700" aria-hidden="true">
      {" "}
      *
    </span>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            {t.fields.name}
            {req}
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder={t.placeholders.name} className={input} />
        </div>
        <div>
          <label htmlFor="cf-org" className={label}>
            {t.fields.organization}
          </label>
          <input id="cf-org" name="organization" type="text" autoComplete="organization" placeholder={t.placeholders.organization} className={input} />
        </div>
        <div>
          <label htmlFor="cf-mobile" className={label}>
            {t.fields.mobile}
            {req}
          </label>
          <input
            id="cf-mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            dir="ltr"
            placeholder={t.placeholders.mobile}
            aria-invalid={mobileError || undefined}
            aria-describedby={mobileError ? "cf-mobile-err" : undefined}
            className={`${input} text-start`}
          />
          {mobileError && (
            <p id="cf-mobile-err" className="mt-1.5 text-sm text-red-700">
              {t.invalidMobile}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            {t.fields.email}
            {req}
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" dir="ltr" placeholder={t.placeholders.email} className={`${input} text-start`} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-service" className={label}>
          {t.fields.service}
          {req}
        </label>
        <select id="cf-service" name="service" required defaultValue="" ref={serviceRef} className={input}>
          <option value="" disabled>
            {t.fields.servicePlaceholder}
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value={t.fields.serviceOther}>{t.fields.serviceOther}</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>
          {t.fields.message}
          {req}
        </label>
        <textarea id="cf-message" name="message" required rows={5} placeholder={t.placeholders.message} className={input} />
      </div>

      {/* حقل مخفي لمكافحة الرسائل المزعجة (Formspree honeypot) */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="_subject" value={t.mailSubject} />

      <div aria-live="polite" role="status">
        {status === "success" && (
          <p className="flex gap-2 rounded-lg bg-brand-50 p-3 text-sm text-brand-dark">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t.success}
          </p>
        )}
        {status === "mailto" && (
          <p className="flex gap-2 rounded-lg bg-brand-50 p-3 text-sm text-brand-dark">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {t.mailtoOpened}{" "}
              <a href={`mailto:${email}`} className="ltr-nums font-semibold underline">
                {email}
              </a>
            </span>
          </p>
        )}
        {status === "error" && (
          <p className="flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {t.error}{" "}
              <a href={`mailto:${email}`} className="ltr-nums font-semibold underline">
                {email}
              </a>
            </span>
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
