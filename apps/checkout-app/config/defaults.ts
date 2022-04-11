import {
  ChannelActivePaymentProvidersByChannel,
  CustomizationSettingsValues,
  PaymentProviderSettingsValues,
  SettingsValues,
} from "types/api";

export const defaultActiveChannelPaymentProviders: ChannelActivePaymentProvidersByChannel =
  {
    "apple-pay": "",
    "credit-card": "",
    paypal: "",
  };

export const defaultPaymentProviderSettings: PaymentProviderSettingsValues = {
  mollie: {
    "partner-id": "",
    "live-test-api-key": "",
  },
  adyen: {
    "merchant-account": "",
    "client-key": "",
    "supported-currencies": "",
  },
};

export const defaultCustomizationSettings: CustomizationSettingsValues = {
  branding: {
    active: "#394052",
    text: "#394052",
    bg: "#FAFAFA",
    error: "#B65757",
    success: "#2C9B2A",
    logo: "",
  },
  "product-settings": {
    "low-stock-threshold": "",
  },
};

const defaultSettings: SettingsValues = {
  channelActivePaymentProviders: {},
  paymentProviders: defaultPaymentProviderSettings,
  customizations: defaultCustomizationSettings,
};
export default defaultSettings;
