import { IntlShape, useIntl } from "react-intl";
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

export const usePaymentMethods = (): PaymentMethod[] => {
  const intl = useIntl();

  return withNames(intl, paymentMethodsMessages, [
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
};

export const useMolliePaymentProvider = (): PaymentProvider<"mollie"> => {
  const intl = useIntl();

  return {
    id: "mollie",
    label: intl.formatMessage(paymentProvidersMessages.mollie),
    settings: withLabels(intl, molliePaymentProviderMessages, [
      {
        id: "partnerId",
        type: "string",
      },
      {
        id: "liveApiKey",
        type: "string",
      },
      {
        id: "testApiKey",
        type: "string",
      },
    ]),
  };
};

export const useAdyenPaymentProvider = (): PaymentProvider<"adyen"> => {
  const intl = useIntl();

  return {
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
  };
};

export const usePaymentProviders = () => [
  useMolliePaymentProvider(),
  useAdyenPaymentProvider(),
];

export const useBrandingCustomization = (): Customization<"branding"> => {
  const intl = useIntl();

  return {
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
  };
};

export const useSectionsCustomization =
  (): Customization<"productSettings"> => {
    const intl = useIntl();

    return {
      id: "productSettings",
      label: intl.formatMessage(customizationMessages.productSettings),
      settings: withLabels(intl, sectionsCustomizationMessages, [
        {
          id: "lowStockThreshold",
          type: "string",
        },
      ]),
    };
  };

export const useCustomizations = () => [
  useBrandingCustomization(),
  useSectionsCustomization(),
];
