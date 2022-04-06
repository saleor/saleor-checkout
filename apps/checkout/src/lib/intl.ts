import { createIntl, createIntlCache } from "@formatjs/intl";

const cache = createIntlCache();

const { formatNumber } = createIntl(
  {
    locale: "en-GB",
    messages: {},
  },
  cache
);

export { formatNumber };
