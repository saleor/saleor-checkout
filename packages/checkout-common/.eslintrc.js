module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
<<<<<<< HEAD
  plugins: [],
  extends: ["checkout"],
  ignorePatterns: "*.js",
=======
  extends: ["checkout"],
  ignorePatterns: [".eslintrc.js"],
>>>>>>> Fix eslint
};
