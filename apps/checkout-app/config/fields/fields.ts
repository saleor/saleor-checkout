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
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AppleIcon from "@material-ui/icons/Apple";
import PayPalIcon from "./icons/PayPal";
import mollieLogoLight from "./images/payment-provider-mollie-light.png";
import mollieLogoDark from "./images/payment-provider-mollie-dark.png";
import adyenLogoLight from "./images/payment-provider-adyen-light.png";
import adyenLogoDark from "./images/payment-provider-adyen-dark.png";

export const usePaymentMethods = (): PaymentMethod[] => {
  const intl = useIntl();

  return withNames(intl, paymentMethodsMessages, [
    {
      id: "creditCard",
      logo: CreditCardIcon,
    },
    {
      id: "applePay",
      logo: AppleIcon,
    },
    {
      id: "paypal",
      logo: PayPalIcon,
    },
  ]);
};

export const useMolliePaymentProvider = (): PaymentProvider<"mollie"> => {
  const intl = useIntl();

  return {
    id: "mollie",
    label: intl.formatMessage(paymentProvidersMessages.mollie),
    logo: {
      light: mollieLogoLight,
      dark: mollieLogoDark,
    },
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
    logo: {
      light: adyenLogoLight,
      dark: adyenLogoDark,
    },
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
