import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Code2,
  Cpu,
  Network,
  Server,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/config/site";

/** أيقونة لكل خدمة حسب المعرّف */
export const serviceIcons: Record<string, LucideIcon> = {
  hardware: Cpu,
  software: Code2,
  consulting: Settings2,
  hosting: Server,
  networking: Network,
  professional: Briefcase,
};

export function serviceIcon(id: string): LucideIcon {
  return serviceIcons[id] ?? BadgeCheck;
}

/** سهم يتجه حسب اتجاه اللغة */
export function DirArrow({ locale, className = "size-4" }: { locale: Locale; className?: string }) {
  const Icon = locale === "ar" ? ArrowLeft : ArrowRight;
  return <Icon className={className} aria-hidden="true" />;
}

/** ترويسة الصفحات الداخلية */
export function PageHero({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <Decor />
      <div className="container-x relative py-14 sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl animate-fade-up text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  center = false,
  as: Tag = "h2",
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`mb-3 block h-1 w-12 rounded-full bg-gold ${center ? "mx-auto" : ""}`} aria-hidden="true" />
      <Tag className="text-2xl font-bold sm:text-3xl">{title}</Tag>
      {subtitle && <p className="mt-3 leading-8 text-muted">{subtitle}</p>}
    </div>
  );
}

/** شريط دعوة للتواصل */
export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { href: string; label: ReactNode };
  secondary?: { href: string; label: ReactNode };
}) {
  return (
    <section className="container-x py-16">
      <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-12 text-white sm:px-12">
        <div
          className="pointer-events-none absolute -end-16 -top-16 size-64 rounded-full border-[18px] border-gold/40"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -bottom-20 end-24 size-48 rounded-full bg-white/5" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className="mt-3 leading-8 text-white/85">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={primary.href} className="btn-light">
              {primary.label}
            </Link>
            {secondary && (
              <a href={secondary.href} className="btn border border-white/40 text-white hover:bg-white/10">
                {secondary.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** زخرفة هندسية مستوحاة من أقواس الشعار */
export function Decor() {
  return (
    <svg
      className="pointer-events-none absolute -end-24 -top-24 hidden h-[420px] w-[420px] opacity-70 md:block lg:-end-10"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="150" stroke="#F8D858" strokeWidth="18" strokeDasharray="420 600" strokeLinecap="round" />
      <circle cx="200" cy="200" r="118" stroke="#1F6F4F" strokeWidth="14" strokeDasharray="300 600" strokeDashoffset="-220" strokeLinecap="round" opacity="0.85" />
      <circle cx="200" cy="200" r="190" stroke="#0A0A0A" strokeOpacity="0.06" strokeWidth="1" />
    </svg>
  );
}
