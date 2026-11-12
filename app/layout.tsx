import type { ReactNode } from "react";

/**
 * التخطيط الجذري يمرر المحتوى فقط؛ وسم <html> مع lang/dir يُعرَّف في app/[locale]/layout.tsx
 * حتى تُبنى الصفحات العربية (RTL) والإنجليزية (LTR) بشكل صحيح في HTML الثابت.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
