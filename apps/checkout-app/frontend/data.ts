import { ChannelFragment } from "@/graphql";
import { findById } from "@/utils";
import {
  getCustomizations,
  getPaymentMethods,
  getPaymentProviders,
} from "@/config/fields";
import { IntlShape } from "react-intl";
import {
  ChannelActivePaymentProviders,
  ChannelPaymentOptions,
  UnknownSettingsValues,
} from "types/api";
import {
  Customization,
  CustomizationID,
  CustomizationSettings,
  PaymentProvider,
  PaymentProviderID,
  PaymentProviderSettings,
} from "types/common";

export const getCustomizationSettings = (
  intl: IntlShape,
  settingsValues: UnknownSettingsValues
): Customization<CustomizationID>[] =>
  getCustomizations(intl).map((customization) => ({
    ...customization,
    settings: customization.settings.map(
      (setting: CustomizationSettings<CustomizationID>) => ({
        ...setting,
        value: settingsValues[customization.id][setting.id],
      })
    ),
  }));

export const getPaymentProviderSettings = (
  intl: IntlShape,
  settingsValues: UnknownSettingsValues
): PaymentProvider<PaymentProviderID>[] =>
  getPaymentProviders(intl).map((provider) => ({
    ...provider,
    settings: provider.settings.map(
      (setting: PaymentProviderSettings<PaymentProviderID>) => ({
        ...setting,
        value: settingsValues[provider.id][setting.id],
      })
    ),
  }));

export const getChannelPaymentOptionsList = (
  intl: IntlShape,
  channels: ChannelFragment[],
  activePaymentProviders?: ChannelActivePaymentProviders
): ChannelPaymentOptions[] => {
  const paymentMethods = getPaymentMethods(intl);
  const paymentProviders = getPaymentProviders(intl);

  return channels.map((channel) => ({
    id: channel.id,
    channel: channel,
    paymentOptions: paymentMethods.map((method) => {
      const activeProvider =
        (activePaymentProviders?.[channel.id]?.[method.id] &&
          findById(
            paymentProviders,
            activePaymentProviders[channel.id][method.id]
          )) ||
        null;

      return {
        id: method.id,
        method,
        availableProviders: paymentProviders,
        activeProvider,
      };
    }),
  }));
};
export const getChannelPaymentOptions = (
  intl: IntlShape,
  channels: ChannelFragment[],
  activePaymentProviders?: ChannelActivePaymentProviders,
  channelId?: string
) =>
  getChannelPaymentOptionsList(intl, channels, activePaymentProviders).find(
    (channelPayments) => channelPayments.channel.id === channelId
  );
