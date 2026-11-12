/**
 * ملف الإعدادات الرئيسي — عدّل بيانات الشركة والروابط من هنا فقط.
 */

const addressQueryEn =
  "Building 8884, Airport Road, Sedra Dist., Riyadh 13413, Saudi Arabia";

export const site = {
  /** الدومين الرسمي — يُستخدم في metadataBase وsitemap وOpen Graph */
  url: "https://solutions.competitive.sa",

  name: {
    ar: "شركة الحلول التنافسية",
    en: "Competitive Solutions Co.",
  },

  founded: 2023,
  email: "a@competitive.sa",

  address: {
    ar: "مبنى 8884، طريق المطار، حي سدرة، الرقم الإضافي 3667، الرياض 13413، المملكة العربية السعودية",
    en: "Building 8884, Airport Road, Sedra Dist., Additional No. 3667, Riyadh 13413, Kingdom of Saudi Arabia",
    // حقول منفصلة لبيانات Schema.org
    buildingNumber: "8884",
    street: { ar: "طريق المطار", en: "Airport Road" },
    district: { ar: "حي سدرة", en: "Sedra Dist." },
    additionalNumber: "3667",
    city: { ar: "الرياض", en: "Riyadh" },
    postalCode: "13413",
    country: "SA",
  },

  /**
   * الخريطة — استبدل الرابطين برابط موقعك الدقيق متى ما احتجت.
   * mapEmbedUrl: رابط الـ iframe (من خرائط Google: مشاركة ← تضمين خريطة ← انسخ قيمة src)
   * mapOpenUrl: رابط زر "افتح في خرائط Google"
   */
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressQueryEn)}&output=embed`,
  mapOpenUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQueryEn)}`,

  /**
   * شعار Lenovo — يظهر تلقائياً في شريط الشراكات وصفحة المنتجات
   * بمجرد وجود الملف في public/partners/lenovo-logo.png
   * (إذا لم يوجد الملف تظهر شارة نصية بدلاً منه).
   */
  lenovoLogo: "/partners/lenovo-logo.png",

  /** معرّف Formspree يُقرأ من متغير البيئة وقت البناء */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
} as const;

export type Locale = "ar" | "en";
export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

/** مسارات الصفحات (بدون بادئة اللغة) */
export const routes = ["", "about", "services", "products", "contact"] as const;
export type RouteKey = (typeof routes)[number];

export function localePath(locale: Locale, route: RouteKey | string = ""): string {
  const clean = route.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}
