const mainConfig = require("../tailwind.config");

module.exports = {
  ...mainCongif,
  safelist: [{ pattern: /.*/ }],
};
