import { HardDrive, Laptop, Monitor, MonitorSmartphone, Server, Boxes, Cpu, type LucideIcon } from "lucide-react";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, PageHero } from "@/components/ui";
import PartnerBadge from "@/components/PartnerBadge";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "products");
}

const productIcons: Record<string, LucideIcon> = {
  ThinkPad: Laptop,
  ThinkBook: Laptop,
  ThinkCentre: Cpu,
  ThinkStation: HardDrive,
  ThinkVision: Monitor,
  ThinkSystem: Server,
  ThinkAgile: Boxes,
};
const categoryIcons: Record<string, LucideIcon> = { idg: MonitorSmartphone, isg: Server };

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const p = t.products;

  return (
    <>
      <PageHero title={p.title} subtitle={p.subtitle} eyebrow={p.partnerName} />

      <section className="container-x py-12">
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm text-muted">{t.home.partnersText}</p>
            <p lang="en" className="mt-1 text-2xl font-bold">
              {p.partnerName}
            </p>
          </div>
          {/* شعار Lenovo — يظهر تلقائياً عند وجود public/partners/lenovo-logo.png */}
          <PartnerBadge locale={locale} size="lg" />
        </div>
      </section>

      {p.categories.map((c) => {
        const CIcon = categoryIcons[c.id] ?? Server;
        return (
          <section key={c.id} id={c.id} className="container-x pb-14" aria-labelledby={`${c.id}-title`}>
            <div className="flex items-start gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                <CIcon className="size-7" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h2 id={`${c.id}-title`} lang="en" className="text-2xl font-bold">
                  {c.title}
                </h2>
                <p className="mt-1 font-medium text-olive">{c.subtitle}</p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{c.description}</p>
              </div>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.products.map((prod) => {
                const Icon = productIcons[prod.name] ?? Laptop;
                return (
                  <li key={prod.name} className="card flex items-start gap-4 hover:border-brand/40">
                    <span className="icon-tile">
                      <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 lang="en" className="text-lg font-bold">
                        {prod.name}
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-muted">{prod.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <p className="container-x text-xs leading-6 text-muted">{p.note}</p>

      <CtaBand
        title={p.ctaTitle}
        text={p.ctaText}
        primary={{ href: `${localePath(locale, "contact")}?service=hardware`, label: t.common.requestQuote }}
      />
    </>
  );
}
