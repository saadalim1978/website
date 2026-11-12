"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe, Mail, Menu, X } from "lucide-react";
import { site, localePath, type Locale, type RouteKey } from "@/config/site";
import type { Dictionary } from "@/content/ar";

const items: { key: keyof Dictionary["nav"]; route: RouteKey }[] = [
  { key: "home", route: "" },
  { key: "about", route: "about" },
  { key: "services", route: "services" },
  { key: "products", route: "products" },
  { key: "contact", route: "contact" },
];

export default function SiteHeader({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname() || `/${locale}/`;
  const [open, setOpen] = useState(false);

  // المسار الحالي بدون بادئة اللغة، لاستخدامه في زر تبديل اللغة
  const rest = pathname.replace(/^\/(ar|en)(?=\/|$)/, "").replace(/^\/+|\/+$/g, "");
  const other: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = localePath(other, rest);

  const isActive = (route: RouteKey) => (route === "" ? rest === "" : rest === route || rest.startsWith(`${route}/`));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="h-1 bg-gradient-to-l from-gold via-brand to-ink" aria-hidden="true" />
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href={localePath(locale)} className="flex items-center gap-3" aria-label={site.name[locale]}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" width={145} height={88} className="h-9 w-auto lg:h-11" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-ink sm:text-base">{site.name[locale]}</span>
            <span className="hidden text-xs text-muted sm:block" lang={other}>
              {site.name[other]}
            </span>
          </span>
        </Link>

        <nav aria-label={locale === "ar" ? "القائمة الرئيسية" : "Main navigation"} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((it) => (
              <li key={it.key}>
                <Link
                  href={localePath(locale, it.route)}
                  aria-current={isActive(it.route) ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(it.route) ? "bg-brand-50 text-brand" : "text-ink/80 hover:text-brand"
                  }`}
                >
                  {nav[it.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            title={nav.switchLangLabel}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-ink/80 hover:text-brand"
          >
            <Globe className="size-4" aria-hidden="true" />
            {nav.switchLang}
          </Link>
          <Link href={localePath(locale, "contact")} className="btn-primary hidden md:inline-flex">
            <Mail className="size-4" aria-hidden="true" />
            {nav.contact}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-ink hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={locale === "ar" ? "القائمة الرئيسية" : "Main navigation"}
        className={`border-t border-line bg-white lg:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="container-x flex flex-col py-3">
          {items.map((it) => (
            <li key={it.key}>
              <Link
                href={localePath(locale, it.route)}
                aria-current={isActive(it.route) ? "page" : undefined}
                className={`block rounded-lg px-3 py-3 text-base font-medium ${
                  isActive(it.route) ? "bg-brand-50 text-brand" : "text-ink hover:bg-surface"
                }`}
              >
                {nav[it.key]}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <a href={`mailto:${site.email}`} className="btn-primary w-full">
              <Mail className="size-4" aria-hidden="true" />
              <span className="ltr-nums">{site.email}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
