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
import {
  ChannelPaymentOptions,
  CustomizationSettingsValues,
  PaymentProviderSettingsValues,
} from "./types";

export const channelPaymentOptionsList: ChannelPaymentOptions[] = [
  {
    id: "1",
    channel: channelList[0],
    paymentOptions: [
      {
        id: "1",
        method: paymentMethods[0],
        availableProviders: paymentProviders,
        activeProvider: paymentProviders[0],
      },
      {
        id: "2",
        method: paymentMethods[1],
        availableProviders: paymentProviders,
        activeProvider: paymentProviders[0],
      },
      {
        id: "3",
        method: paymentMethods[2],
        availableProviders: paymentProviders,
        activeProvider: null,
      },
    ],
  },
  {
    id: "2",
    channel: channelList[1],
    paymentOptions: [
      {
        id: "1",
        method: paymentMethods[0],
        availableProviders: paymentProviders,
        activeProvider: paymentProviders[1],
      },
      {
        id: "2",
        method: paymentMethods[1],
        availableProviders: paymentProviders,
        activeProvider: paymentProviders[1],
      },
      {
        id: "3",
        method: paymentMethods[2],
        availableProviders: paymentProviders,
        activeProvider: null,
      },
    ],
  },
];
export const useChannelPaymentOptions = (channelId: string) =>
  channelPaymentOptionsList.find(
    (channelPayments) => channelPayments.channel.id === channelId
  );

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
