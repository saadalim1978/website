import type { Metadata } from "next";
import "./globals.css";
import { plex } from "@/lib/fonts";
import { site } from "@/config/site";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `404 | ${site.name.ar}`,
  robots: { index: false, follow: false },
};

// صفحة 404 ثنائية اللغة (تُصدَّر إلى out/404.html)
export default function NotFound() {
  return (
    <html lang="ar" dir="rtl" className={plex.variable}>
      <body className="flex min-h-screen items-center justify-center bg-surface px-4">
        <main className="w-full max-w-lg rounded-2xl border border-line bg-white p-8 text-center">
          <a href="/ar/" className="mx-auto mb-6 block w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt={site.name.ar} width={530} height={341} className="h-auto w-full" />
          </a>
          <p className="text-5xl font-bold text-brand">404</p>
          <h1 className="mt-4 text-xl font-bold">{ar.notFound.title}</h1>
          <p className="mt-2 text-muted">{ar.notFound.text}</p>
          <div lang="en" dir="ltr" className="mt-6 border-t border-line pt-6">
            <h2 className="text-lg font-semibold">{en.notFound.title}</h2>
            <p className="mt-1 text-sm text-muted">{en.notFound.text}</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/ar/" className="btn-primary">
              {ar.notFound.back}
            </a>
            <a href="/en/" lang="en" className="btn-outline">
              {en.notFound.back}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
