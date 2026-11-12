import type { MetadataRoute } from "next";
import { site, routes, localePath } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.flatMap((route) =>
    (["ar", "en"] as const).map((locale) => ({
      url: `${site.url}${localePath(locale, route)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? (locale === "ar" ? 1 : 0.9) : 0.7,
      alternates: {
        languages: {
          ar: `${site.url}${localePath("ar", route)}`,
          en: `${site.url}${localePath("en", route)}`,
        },
      },
    })),
  );
}
