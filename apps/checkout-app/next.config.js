const withTM = require("next-transpile-modules")();

module.exports = withTM({
  i18n: {
    locales: ["en-US", "pl-PL"],
    defaultLocale: "en-US",
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/channels",
        permanent: true,
      },
    ];
  },
  images: { domains: ["localhost"] },
  experimental: {
    esmExternals: false,
  },
  env: {
    PREVIEW_URL: process.env.PREVIEW_URL,
    PREVIEW_CHECKOUT_TOKEN: process.env.PREVIEW_CHECKOUT_TOKEN,
  },
});
