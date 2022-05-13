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
    SALEOR_APP_ID: process.env.SALEOR_APP_ID,
    SALEOR_APP_TOKEN: process.env.SALEOR_APP_TOKEN,
  },
});
