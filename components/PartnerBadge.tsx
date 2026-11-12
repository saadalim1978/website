import { BadgeCheck } from "lucide-react";
import { site, type Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";

/**
 * مكان شارة الشريك الرسمية من Lenovo.
 * لإضافة الشارة: ضع الصورة في public/partners/ ثم اكتب مسارها في site.lenovoBadge داخل config/site.ts.
 * إلى ذلك الحين تُعرض شارة نصية فقط (بدون شعار Lenovo).
 */
export default function PartnerBadge({ locale, size = "md" }: { locale: Locale; size?: "md" | "lg" }) {
  const t = getDictionary(locale).products;

  if (site.lenovoBadge) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={site.lenovoBadge}
        alt={`${t.partnerLabel} — ${t.partnerName}`}
        className={size === "lg" ? "h-24 w-auto" : "h-16 w-auto"}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-xl border-2 border-dashed border-brand/30 bg-white ${
        size === "lg" ? "px-6 py-4" : "px-4 py-3"
      }`}
      data-placeholder="lenovo-partner-badge"
      title={t.badgePlaceholder}
    >
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
