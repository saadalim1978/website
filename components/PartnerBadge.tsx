import fs from "node:fs";
import path from "node:path";
import { BadgeCheck } from "lucide-react";
import { site, type Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";

/** يتحقق وقت البناء من وجود ملف شعار Lenovo في public/ */
function logoExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", site.lenovoLogo.replace(/^\/+/, "")));
  } catch {
    return false;
  }
}

/**
 * شارة الشراكة مع Lenovo.
 * - إذا وُجد الملف public/partners/lenovo-logo.png ← يُعرض الشعار مع نص "موزّع معتمد".
 * - إذا لم يوجد ← تُعرض شارة نصية فقط.
 */
export default function PartnerBadge({ locale, size = "md" }: { locale: Locale; size?: "md" | "lg" }) {
  const t = getDictionary(locale).products;
  const lg = size === "lg";

  if (logoExists()) {
    return (
      <div className={`inline-flex items-center rounded-xl border border-line bg-white ${lg ? "gap-5 px-6 py-4" : "gap-4 px-4 py-3"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.lenovoLogo}
          alt="Lenovo"
          className={lg ? "h-14 w-auto" : "h-10 w-auto"}
          loading="lazy"
        />
        <span className="h-10 w-px bg-line" aria-hidden="true" />
        <div className="leading-tight">
          <p className="flex items-center gap-1 text-xs font-medium text-brand">
            <BadgeCheck className="size-4" aria-hidden="true" />
            {t.partnerLabel}
          </p>
          <p lang="en" className={`font-bold text-ink ${lg ? "text-base" : "text-sm"}`}>
            {t.partnerName}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 rounded-xl border border-line bg-white ${lg ? "px-6 py-4" : "px-4 py-3"}`}>
      <BadgeCheck className="size-7 shrink-0 text-brand" aria-hidden="true" />
      <div className="leading-tight">
        <p className="text-xs font-medium text-muted">{t.partnerLabel}</p>
        <p lang="en" className="text-base font-bold text-ink">
          {t.partnerName}
        </p>
      </div>
    </div>
  );
}
