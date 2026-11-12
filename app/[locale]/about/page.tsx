import { Compass, Eye, Flag, Gem, Handshake, Lock, ShieldCheck, Sparkles, Target } from "lucide-react";
import { site, localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "about");
}

const valueIcons = [ShieldCheck, Eye, Sparkles, Handshake, Lock];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const a = t.about;

  const facts = [
    { label: a.facts.founded, value: String(site.founded), ltr: true },
    { label: a.facts.sector, value: a.facts.sectorValue },
    { label: a.facts.hq, value: a.facts.hqValue },
  ];

  return (
    <>
      <PageHero title={a.title} subtitle={t.meta.pages.about.description} eyebrow={site.name[locale]} />

      <section className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-5">
        <div className="space-y-5 text-base leading-8 text-ink/85 lg:col-span-3">
          <p>{a.intro}</p>
          <p>{a.intro2}</p>
        </div>
        <aside className="lg:col-span-2">
          <div className="card bg-surface">
            <h2 className="text-lg font-bold">{a.factsTitle}</h2>
            <dl className="mt-4 divide-y divide-line">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className={`font-semibold ${f.ltr ? "ltr-nums" : ""}`}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <article className="card">
            <span className="icon-tile">
              <Target className="size-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold">{a.visionTitle}</h2>
            <p className="mt-3 leading-8 text-muted">{a.vision}</p>
          </article>
          <article className="card">
            <span className="icon-tile">
              <Compass className="size-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-xl font-bold">{a.missionTitle}</h2>
            <p className="mt-3 leading-8 text-muted">{a.mission}</p>
          </article>
        </div>
      </section>

      <section className="container-x py-16 sm:py-20">
        <SectionHeading title={a.valuesTitle} center />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {a.values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length] ?? Gem;
            return (
              <li key={v.title} className="card text-center">
                <span className="icon-tile mx-auto">
                  <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{v.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container-x pb-4">
        <div className="flex flex-col gap-5 rounded-2xl border border-gold/60 bg-gold-soft p-6 sm:flex-row sm:items-start sm:p-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-olive ring-1 ring-gold/60">
            <Flag className="size-6" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold">{a.vision2030Title}</h2>
            <p className="mt-2 leading-8 text-ink/80">{a.vision2030}</p>
          </div>
        </div>
      </section>

      <CtaBand
        title={t.home.ctaTitle}
        text={t.home.ctaText}
        primary={{ href: localePath(locale, "contact"), label: t.common.contactUs }}
      />
    </>
  );
}
