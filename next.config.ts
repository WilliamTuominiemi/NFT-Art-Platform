import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "sv", "fi"],
    defaultLocale: "en",
  },
  images: { remotePatterns: [{ hostname: "lh3.googleusercontent.com" }] },
};

export default nextConfig;
