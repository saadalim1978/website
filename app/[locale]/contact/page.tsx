import { ExternalLink, Mail, MapPin } from "lucide-react";
import { site, type Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const c = t.contact;

  return (
    <>
      <PageHero title={c.title} subtitle={c.subtitle} eyebrow={site.name[locale]} />

      <div className="container-x grid gap-8 py-14 lg:grid-cols-5 lg:gap-10">
        <section className="card p-6 sm:p-8 lg:col-span-3" aria-labelledby="form-title">
          <h2 id="form-title" className="mb-6 text-xl font-bold">
            {c.formTitle}
          </h2>
          <ContactForm t={c} services={t.services.items.map((s) => ({ id: s.id, title: s.title }))} email={site.email} />
        </section>

        <aside className="space-y-6 lg:col-span-2">
          <section className="card" aria-labelledby="info-title">
            <h2 id="info-title" className="text-lg font-bold">
              {c.infoTitle}
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center gap-3">
                <span className="icon-tile size-10">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-muted">{c.email}</p>
                  <a href={`mailto:${site.email}`} className="ltr-nums font-semibold hover:text-brand">
                    {site.email}
                  </a>
                </div>
              </li>
            </ul>
            <a href={`mailto:${site.email}`} className="btn-primary mt-6 w-full">
              <Mail className="size-4" aria-hidden="true" />
              {c.emailUs}
            </a>
          </section>

          <section className="card" aria-labelledby="address-title">
            <h2 id="address-title" className="flex items-center gap-2 text-lg font-bold">
              <MapPin className="size-5 text-brand" aria-hidden="true" />
              {c.addressTitle}
            </h2>
            <address className="mt-4 text-sm not-italic leading-7 text-ink/85">{site.address[locale]}</address>
            <p className="mt-3 text-sm text-muted">
              {c.shortAddress}: <span className="ltr-nums font-bold text-ink">{site.address.short}</span>
            </p>
          </section>
        </aside>
      </div>

      <section className="container-x pb-16" aria-labelledby="map-title">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 id="map-title" className="text-xl font-bold">
            {c.mapTitle}
          </h2>
          <a href={site.mapOpenUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <ExternalLink className="size-4" aria-hidden="true" />
            {c.openInMaps}
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <iframe
            src={site.mapEmbedUrl}
            title={`${c.mapTitle} — ${site.name[locale]}`}
            className="block h-[360px] w-full sm:h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
