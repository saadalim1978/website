import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { site, localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const links = [
    { label: t.nav.home, href: localePath(locale) },
    { label: t.nav.about, href: localePath(locale, "about") },
    { label: t.nav.services, href: localePath(locale, "services") },
    { label: t.nav.products, href: localePath(locale, "products") },
    { label: t.nav.contact, href: localePath(locale, "contact") },
  ];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href={localePath(locale)} className="inline-block rounded-xl bg-white p-3 ring-1 ring-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt={site.name[locale]} width={530} height={341} loading="lazy" className="h-auto w-40" />
          </Link>
          <p className="mt-4 text-sm leading-7 text-muted">{t.footer.about}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">{t.footer.quickLinks}</h2>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">{t.footer.address}</h2>
          <address className="mt-4 space-y-3 text-sm not-italic leading-7 text-muted">
            <p className="flex gap-2">
              <MapPin className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
              <span>{site.address[locale]}</span>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-bold text-ink">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-brand">
                <Mail className="size-4 text-brand" aria-hidden="true" />
                <span className="ltr-nums">{site.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>
            © <span className="ltr-nums">{year}</span> {site.name[locale]}. {t.footer.rights}
          </p>
          <p lang={locale === "ar" ? "en" : "ar"}>{site.name[locale === "ar" ? "en" : "ar"]}</p>
        </div>
      </div>
    </footer>
  );
}
