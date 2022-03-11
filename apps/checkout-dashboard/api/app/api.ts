import { channelList } from "api/saleor/api";
import { customizations, paymentMethods, paymentProviders } from "consts";
import {
  Customization,
  CustomizationID,
  CustomizationSettings,
  PaymentProvider,
  PaymentProviderID,
  PaymentProviderSettings,
} from "types";
import { findById } from "utils";
import {
  ChannelActivePaymentProviders,
  ChannelPaymentOptions,
  CustomizationSettingsValues,
  PaymentOption,
  PaymentProviderSettingsValues,
} from "./types";

// Should be fetched from app backend
export const activePaymentProviders: ChannelActivePaymentProviders = {
  "credit-card": {
    [channelList[0].id]: "mollie",
    [channelList[1].id]: "adyen",
  },
  "apple-pay": {
    [channelList[0].id]: "mollie",
    [channelList[1].id]: "adyen",
  },
  paypal: {
    [channelList[0].id]: "mollie",
    [channelList[1].id]: "adyen",
  },
};

export const useChannelPaymentOptionsList = (): ChannelPaymentOptions[] =>
  channelList.map((channel) => ({
    id: channel.id,
    channel: channel,
    paymentOptions: paymentMethods.map((method) => ({
      id: method.id,
      method,
      availableProviders: paymentProviders,
      activeProvider: findById(
        paymentProviders,
        activePaymentProviders[method.id][channel.id]
      ),
    })),
  }));

export const useChannelPaymentOptions = (channelId: string) =>
  useChannelPaymentOptionsList().find(
    (channelPayments) => channelPayments.channel.id === channelId
  );

// Should be fetched from app backend
export const paymentProviderSettingsValues: PaymentProviderSettingsValues = {
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
export const usePaymentProviderSettings =
  (): PaymentProvider<PaymentProviderID>[] =>
    paymentProviders.map((provider) => ({
      ...provider,
      settings: provider.settings.map(
        (setting: PaymentProviderSettings<PaymentProviderID>) => ({
          ...setting,
          value: paymentProviderSettingsValues[provider.id][setting.id],
        })
      ),
    }));

// Should be fetched from app backend
export const customizationSettingsValues: CustomizationSettingsValues = {
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
export const useCustomizationSettings = (): Customization<CustomizationID>[] =>
  customizations.map((customization) => ({
    ...customization,
    settings: customization.settings.map(
      (setting: CustomizationSettings<CustomizationID>) => ({
        ...setting,
        value: customizationSettingsValues[customization.id][setting.id],
      })
    ),
  }));
