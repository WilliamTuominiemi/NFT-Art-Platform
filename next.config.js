/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "sv", "fi"],
    defaultLocale: "en",
  },
  images: { remotePatterns: [{ hostname: "lh3.googleusercontent.com" }] },
};
