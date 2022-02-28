import { channelList } from "api/saleor/api";
import { customizations, paymentMethods, paymentProviders } from "consts";
import {
  Customization,
  CustomizationID,
  CustomizationSettings,
  PaymentMethod,
  PaymentMethodID,
  PaymentProvider,
  PaymentProviderID,
  PaymentProviderSettings,
} from "types";
import {
  ChannelActivePaymentProviders,
  ChannelPaymentOptions,
  CustomizationSettingsValues,
  PaymentOption,
  PaymentProviderSettingsValues,
} from "./types";

// Should be fetched from app backend
export const activePaymentProviders: ChannelActivePaymentProviders = {
  "payment-method-1": {
    [channelList[0].id]: "mollie",
    [channelList[1].id]: "example",
  },
  "payment-method-2": {
    [channelList[0].id]: "mollie",
    [channelList[1].id]: "example",
  },
  "payment-method-3": {
    [channelList[0].id]: "mollie",
    [channelList[1].id]: "example",
  },
};

const getPaymentProvider = (id: string): PaymentProvider<PaymentProviderID> =>
  paymentProviders.find((provider) => provider.id === id);

export const useChannelPaymentOptionsList = () =>
  channelList.map(
    (channel) =>
      ({
        id: channel.id,
        channel: channel,
        paymentOptions: paymentMethods.map(
          (method) =>
            ({
              id: method.id,
              method,
              availableProviders: paymentProviders,
              activeProvider: getPaymentProvider(
                activePaymentProviders[method.id][channel.id]
              ),
            } as PaymentOption)
        ),
      } as ChannelPaymentOptions)
  );

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
  example: {
    "key-1": "",
    "key-2": "",
  },
};
export const usePaymentProviderSettings = () =>
  paymentProviders.map(
    (provider) =>
      ({
        ...provider,
        settings: provider.settings.map(
          (setting: PaymentProviderSettings<PaymentProviderID>) =>
            ({
              ...setting,
              value: paymentProviderSettingsValues[provider.id][setting.id],
            } as PaymentProviderSettings<PaymentProviderID>)
        ),
      } as PaymentProvider<PaymentProviderID>)
  );

// Should be fetched from app backend
export const customizationSettingsValues: CustomizationSettingsValues = {
  branding: {
    active: "#394052",
    text: "#394052",
    bg: "#FAFAFA",
    error: "#B65757",
    success: "#2C9B2A",
  },
  "product-settings": {
    "low-stock-threshold": "",
  },
};
export const useCustomizationSettings = () =>
  customizations.map(
    (customization) =>
      ({
        ...customization,
        settings: customization.settings.map(
          (setting: CustomizationSettings<CustomizationID>) =>
            ({
              ...setting,
              value: customizationSettingsValues[customization.id][setting.id],
            } as CustomizationSettings<CustomizationID>)
        ),
      } as Customization<CustomizationID>)
  );
