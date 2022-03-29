import { customizations, paymentProviders } from "consts";
import { UnknownSettingsValues } from "types/api";
import {
  Customization,
  CustomizationID,
  CustomizationSettings,
  PaymentProvider,
  PaymentProviderID,
  PaymentProviderSettings,
} from "types/common";

export const getCustomizationSettings = (
  settingsValues: UnknownSettingsValues
): Customization<CustomizationID>[] =>
  customizations.map((customization) => ({
    ...customization,
    settings: customization.settings.map(
      (setting: CustomizationSettings<CustomizationID>) => ({
        ...setting,
        value:
          settingsValues[customization.id] &&
          settingsValues[customization.id][setting.id]
            ? settingsValues[customization.id][setting.id]
            : setting.value,
      })
    ),
  }));

export const getPaymentProviderSettings = (
  settingsValues: UnknownSettingsValues
): PaymentProvider<PaymentProviderID>[] =>
  paymentProviders.map((provider) => ({
    ...provider,
    settings: provider.settings.map(
      (setting: PaymentProviderSettings<PaymentProviderID>) => ({
        ...setting,
        value:
          settingsValues[provider.id] && settingsValues[provider.id][setting.id]
            ? settingsValues[provider.id][setting.id]
            : setting.value,
      })
    ),
  }));
