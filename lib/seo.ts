import type { Metadata } from "next";
import { site, localePath, type Locale, type RouteKey } from "@/config/site";
import { getDictionary } from "@/lib/i18n";

type PageKey = "home" | "about" | "services" | "products" | "contact";

const routeOf: Record<PageKey, RouteKey> = {
  home: "",
  about: "about",
  services: "services",
  products: "products",
  contact: "contact",
};

/** يبني metadata لكل صفحة باللغتين مع روابط hreflang وOpen Graph */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const t = getDictionary(locale);
  const p = t.meta.pages[page];
  const route = routeOf[page];
  const path = localePath(locale, route);
  const title = `${p.title} | ${site.name[locale]}`;

  return {
    title: { absolute: title },
    description: p.description,
    alternates: {
      canonical: path,
      languages: {
        ar: localePath("ar", route),
        en: localePath("en", route),
        "x-default": localePath("ar", route),
      },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name[locale],
      title,
      description: p.description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: p.description,
      images: ["/og.jpg"],
    },
  };
}

/** بيانات Schema.org من نوع LocalBusiness تتضمن العنوان الوطني */
export function localBusinessJsonLd(locale: Locale) {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#organization`,
    name: site.name[locale],
    alternateName: site.name[locale === "ar" ? "en" : "ar"],
    url: `${site.url}${localePath(locale)}`,
    logo: `${site.url}/logo.jpg`,
    image: `${site.url}/og.jpg`,
    telephone: site.phone.tel,
    email: site.email,
    foundingDate: String(site.founded),
    taxID: site.unifiedNumber,
    identifier: [
      { "@type": "PropertyValue", propertyID: "CR", value: site.crNumber },
      { "@type": "PropertyValue", propertyID: "UnifiedNationalNumber", value: site.unifiedNumber },
      { "@type": "PropertyValue", propertyID: "NationalShortAddress", value: a.short },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        locale === "ar"
          ? `مبنى ${a.buildingNumber}، ${a.street.ar}، ${a.district.ar}، الرقم الإضافي ${a.additionalNumber}`
          : `Building ${a.buildingNumber}, ${a.street.en}, ${a.district.en}, Additional No. ${a.additionalNumber}`,
      addressLocality: a.city[locale],
      addressRegion: locale === "ar" ? "منطقة الرياض" : "Riyadh Province",
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    hasMap: site.mapOpenUrl,
    areaServed: { "@type": "Country", name: locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia" },
    knowsAbout: getDictionary(locale).services.items.map((s) => s.title),
  };
}
