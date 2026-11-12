import Link from "next/link";
import { Check } from "lucide-react";
import { site, localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, PageHero, serviceIcon } from "@/components/ui";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const s = t.services;

  return (
    <>
      <PageHero title={s.title} subtitle={s.subtitle} eyebrow={site.name[locale]} />

      {/* فهرس سريع */}
      <nav aria-label={s.title} className="border-b border-line bg-white">
        <ul className="container-x flex gap-2 overflow-x-auto py-3 text-sm [scrollbar-width:none]">
          {s.items.map((item, i) => (
            <li key={item.id} className="shrink-0">
              <a href={`#${item.id}`} className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 hover:border-brand hover:text-brand">
                <span className="ltr-nums text-xs font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                {item.short}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-x divide-y divide-line">
        {s.items.map((item, i) => {
          const Icon = serviceIcon(item.id);
          return (
            <section key={item.id} id={item.id} className="grid gap-8 py-14 lg:grid-cols-12 lg:gap-12" aria-labelledby={`${item.id}-title`}>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-white">
                    <Icon className="size-7" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="ltr-nums text-4xl font-bold text-line" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 id={`${item.id}-title`} className="mt-5 text-2xl font-bold leading-10">
                  {item.title}
                </h2>
                <p className="mt-2 font-medium text-olive">{item.summary}</p>
              </div>
              <div className="lg:col-span-7">
                <p className="leading-8 text-ink/85">{item.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-3 rounded-xl bg-surface p-4 text-sm leading-6">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={`${localePath(locale, "contact")}?service=${item.id}`} className="mt-6 inline-flex text-sm font-semibold text-brand hover:underline">
                  {t.common.requestQuote}
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand
        title={t.home.ctaTitle}
        text={t.home.ctaText}
        primary={{ href: localePath(locale, "contact"), label: t.common.contactUs }}
      />
    </>
  );
}
