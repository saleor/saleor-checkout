const withTM = require("next-transpile-modules")();
const path = require("path");

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
  env: {
    SALEOR_APP_ID: process.env.SALEOR_APP_ID,
    SALEOR_APP_TOKEN: process.env.SALEOR_APP_TOKEN,
  },
  experimental: {
    // esmExternals: false,
    // esmExternals: "loose",
    esmExternals: true,
  },
  webpack: (config, options) => {
    config.resolve = {
      ...config.resolve,
      // Resolve macaw ui's peer dependencies to our own node_modules
      // to make it work with npm link
      alias: {
        ...config.resolve.alias,
        // Aliases to "react" and "react-dom" fix linking to react packages in @saleor/sdk,
        // needed due to that import of checkout component in customization preview is linked import
        react: path.resolve("./node_modules/react"),
        "react-dom": path.resolve("./node_modules/react-dom"),
      },
      // extensions: [".js", ".jsx", ".ts", ".tsx"],
      // plugins: [pathsPlugin]
    };

    return config;
  },
});
