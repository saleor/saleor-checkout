// @ts-check
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import packageJson from "./package.json";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: 3001,
    },
    plugins: [react(), tsconfigPaths(), dts()],
    define: {
      "process.env": {
        SALEOR_API_URL: env.SALEOR_API_URL,
        CHECKOUT_APP_URL: env.CHECKOUT_APP_URL,
        NEXT_PUBLIC_SALEOR_API_URL: env.SALEOR_API_URL,
        NEXT_PUBLIC_CHECKOUT_APP_URL: env.CHECKOUT_APP_URL,
        REACT_APP_SALEOR_API_URL: env.SALEOR_API_URL,
        REACT_APP_CHECKOUT_APP_URL: env.CHECKOUT_APP_URL,
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.tsx"),
        formats: ["es", "cjs"],
        name: "checkout-storefront",
        fileName: "index",
      },
      rollupOptions: {
        external: ["react", "react-dom", "graphql"],
      },
    },
  };
});
