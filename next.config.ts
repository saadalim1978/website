import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // موقع ثابت بالكامل يُنشر من مجلد out
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
