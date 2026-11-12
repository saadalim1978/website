import type { Metadata } from "next";
import { site } from "@/config/site";

// الصفحة الجذرية "/" تحوّل إلى النسخة العربية الافتراضية.
// Render يطبّق أيضاً إعادة توجيه من "/" إلى "/ar/" (انظر render.yaml).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name.ar,
  alternates: { canonical: "/ar/" },
  robots: { index: false, follow: true },
};

export default function RootRedirect() {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta httpEquiv="refresh" content="0; url=/ar/" />
      </head>
      <body style={{ fontFamily: "system-ui, sans-serif", padding: 24, textAlign: "center" }}>
        <p>
          <a href="/ar/">{site.name.ar}</a> · <a href="/en/">{site.name.en}</a>
        </p>
      </body>
    </html>
  );
}
