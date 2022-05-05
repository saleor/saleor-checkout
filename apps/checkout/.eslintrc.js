module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks"],
  extends: ["../../packages/config/eslint-preset"],
  env: {
    node: true,
  },
  // rules: {
  //   "no-require-imports": true,
  // },
};
