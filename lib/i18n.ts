import { ar } from "@/content/ar";
import { en } from "@/content/en";
import { locales, type Locale } from "@/config/site";

const dictionaries = { ar, en } as const;

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
