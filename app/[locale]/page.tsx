import Link from "next/link";
import { CheckCircle2, Handshake, Layers, Landmark, MapPin, ShieldCheck } from "lucide-react";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, Decor, DirArrow, SectionHeading, serviceIcon } from "@/components/ui";
import PartnerBadge from "@/components/PartnerBadge";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "home");
}

const whyIcons = [ShieldCheck, Layers, Landmark, MapPin];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const h = t.home;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white">
        <Decor />
        <div className="container-x relative py-16 sm:py-24 lg:py-28">
          <p className="eyebrow animate-fade-up">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            {h.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl animate-fade-up text-3xl font-bold leading-[1.3] sm:text-5xl sm:leading-[1.25]">
            {h.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">{h.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localePath(locale, "contact")} className="btn-primary px-6">
              {t.common.requestQuote}
              <DirArrow locale={locale} />
            </Link>
            <Link href={localePath(locale, "services")} className="btn-outline px-6">
              {t.common.exploreServices}
            </Link>
          </div>
          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            {h.heroPoints.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-ink/80">
                <CheckCircle2 className="size-5 text-brand" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services summary */}
      <section className="container-x py-16 sm:py-20" aria-labelledby="services-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div id="services-heading">
            <SectionHeading title={h.servicesTitle} subtitle={h.servicesSubtitle} />
          </div>
          <Link href={localePath(locale, "services")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            {t.common.learnMore}
            <DirArrow locale={locale} />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s) => {
            const Icon = serviceIcon(s.id);
            return (
              <li key={s.id}>
                <Link
                  href={`${localePath(locale, "services")}#${s.id}`}
                  className="card group flex h-full flex-col hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
                >
                  <span className="icon-tile transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold leading-8">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{s.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Partnerships strip */}
      <section className="border-y border-line bg-surface" aria-labelledby="partners-heading">
        <div className="container-x flex flex-col items-start gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="icon-tile bg-white ring-1 ring-line">
              <Handshake className="size-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div>
              <h2 id="partners-heading" className="text-lg font-bold">
                {h.partnersTitle}
              </h2>
              <p className="mt-1 text-sm text-muted">{h.partnersText}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <PartnerBadge locale={locale} />
            <Link href={localePath(locale, "products")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
              {t.common.viewProducts}
              <DirArrow locale={locale} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-x py-16 sm:py-20" aria-labelledby="why-heading">
        <div id="why-heading">
          <SectionHeading title={h.whyTitle} subtitle={h.whySubtitle} center />
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {h.why.map((w, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <li key={w.title} className="card flex gap-4">
                <span className="icon-tile">
                  <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{w.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaBand
        title={h.ctaTitle}
        text={h.ctaText}
        primary={{ href: localePath(locale, "contact"), label: t.common.contactUs }}
      />
    </>
  );
}
