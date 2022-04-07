const mainCongif = require("../tailwind.config");

module.exports = {
  ...mainCongif,
  safelist: [{ pattern: /.*/ }],
};
