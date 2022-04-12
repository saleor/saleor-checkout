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
    "button-bg-color-primary": "#394052",
    "button-bg-color-hover": "#394052",
    "border-color-primary": "#FAFAFA",
    "error-color": "#B65757",
    "success-color": "#2C9B2A",
    "button-text-color": "#ffffff",
    "text-color": "#000000",
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
