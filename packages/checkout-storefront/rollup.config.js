import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";

const packageJson = require("./package.json");

const isDev = process.env.NODE_ENV !== "production";

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: !isDev,
      },
      ...(!isDev
        ? [
            {
              file: packageJson.main,
              format: "cjs",
              sourcemap: true,
            },
          ]
        : []),
    ],
    external: ["react", "react-dom", "graphql"],
    plugins: [
      external(),
      resolve({
        browser: true,
      }),
      commonjs({ sourceMap: !isDev }),
      typescript({ tsconfig: "./tsconfig.json" }),
      json(),
      image(),
      ...(!isDev ? [terser()] : []),
      postcss({
        extract: true,
        plugins: [require("tailwindcss")(), require("autoprefixer")()],
      }),
    ],
  },
];
