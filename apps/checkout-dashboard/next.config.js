const withTM = require("next-transpile-modules")(["@saleor/checkout"]);

module.exports = withTM({
  i18n: {
    locales: ["en-US", "pl-PL"],
    defaultLocale: "en-US",
  },
  reactStrictMode: true,
  env: {
    APP_ID: process.env.APP_ID,
    API_URL: process.env.API_URL,
  },
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
});
