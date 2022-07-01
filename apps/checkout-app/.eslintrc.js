module.exports = {
  extends: ["checkout", "next"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  rules: {
    "require-await": ["error"],
  },
};
