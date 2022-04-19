import { IntlShape } from "react-intl";
import { Customization, PaymentMethod, PaymentProvider } from "types/common";
import {
  brandingCustomizationMessages,
  customizationMessages,
  sectionsCustomizationMessages,
} from "./messages/customization";
import { paymentMethodsMessages } from "./messages/paymentMethods";
import {
  adyenPaymentProviderMessages,
  molliePaymentProviderMessages,
  paymentProvidersMessages,
} from "./messages/paymentProviders";
import { withLabels, withNames } from "./utils";

export const getPaymentMethods = (intl: IntlShape): PaymentMethod[] =>
  withNames(intl, paymentMethodsMessages, [
    {
      id: "creditCard",
    },
    {
      id: "applePay",
    },
    {
      id: "paypal",
    },
  ]);

export const getMolliePaymentProvider = (
  intl: IntlShape
): PaymentProvider<"mollie"> => ({
  id: "mollie",
  label: intl.formatMessage(paymentProvidersMessages.mollie),
  settings: withLabels(intl, molliePaymentProviderMessages, [
    {
      id: "liveTestApiKey",
      type: "string",
    },
    {
      id: "liveTestApiKey",
      type: "string",
    },
  ]),
});
export const getAdyenPaymentProvider = (
  intl: IntlShape
): PaymentProvider<"adyen"> => ({
  id: "adyen",
  label: intl.formatMessage(paymentProvidersMessages.adyen),
  settings: withLabels(intl, adyenPaymentProviderMessages, [
    {
      id: "merchantAccount",
      type: "string",
    },
    {
      id: "clientKey",
      type: "string",
    },
    {
      id: "supportedCurrencies",
      type: "string",
    },
  ]),
});
export const getPaymentProviders = (intl: IntlShape) => [
  getMolliePaymentProvider(intl),
  getAdyenPaymentProvider(intl),
];

export const getBrandingCustomization = (
  intl: IntlShape
): Customization<"branding"> => ({
  id: "branding",
  label: intl.formatMessage(customizationMessages.branding),
  settings: withLabels(intl, brandingCustomizationMessages, [
    {
      id: "buttonBgColorPrimary",
      type: "color",
    },
    {
      id: "buttonBgColorHover",
      type: "color",
    },
    {
      id: "borderColorPrimary",
      type: "color",
    },
    {
      id: "errorColor",
      type: "color",
    },
    {
      id: "successColor",
      type: "color",
    },
    {
      id: "buttonTextColor",
      type: "color",
    },
    {
      id: "textColor",
      type: "color",
    },
    {
      id: "logoUrl",
      type: "image",
    },
  ]),
});
export const getSectionsCustomization = (
  intl: IntlShape
): Customization<"productSettings"> => ({
  id: "productSettings",
  label: intl.formatMessage(customizationMessages.productSettings),
  settings: withLabels(intl, sectionsCustomizationMessages, [
    {
      id: "lowStockThreshold",
      type: "string",
    },
  ]),
});
export const getCustomizations = (intl: IntlShape) => [
  getBrandingCustomization(intl),
  getSectionsCustomization(intl),
];
