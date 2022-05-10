import { defineMessages } from "react-intl";

export const messages = defineMessages({
  paymentProviderSettings: {
    defaultMessage: "Payment provider settings",
    description: "section title",
  },
  secretSettingNotice: {
    defaultMessage: "These information will not be published to users",
    description: "notice for private settings",
  },
  publicSettingNotice: {
    defaultMessage: "These information will be accessible on checkout frontend",
    description: "notice for private settings",
  },
});
