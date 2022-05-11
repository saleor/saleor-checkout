import { useIntl } from "react-intl";
import {
  Customization,
  PaymentMethod,
  PaymentProvider,
  PaymentProviderSettings,
  CustomizationSettings,
} from "types/common";
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
import MollieIcon from "./icons/Mollie";
import AdyenIcon from "./icons/Adyen";

const paymentMethods: Omit<PaymentMethod, "name">[] = [
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
];

const molliePaymentProviderSettings: Omit<
  PaymentProviderSettings<"mollie">,
  "label"
>[] = [
  {
    id: "partnerId",
    type: "string",
    isPublic: false,
  },
  {
    id: "liveApiKey",
    type: "string",
    isPublic: false,
  },
  {
    id: "testApiKey",
    type: "string",
    isPublic: false,
  },
];

const adyenPaymentProviderSettings: Omit<
  PaymentProviderSettings<"adyen">,
  "label"
>[] = [
  {
    id: "merchantAccount",
    type: "string",
    isPublic: false,
  },
  {
    id: "clientKey",
    type: "string",
    isPublic: false,
  },
  {
    id: "supportedCurrencies",
    type: "string",
    isPublic: true,
  },
];

const brandingCustomizationSettings: Omit<
  CustomizationSettings<"branding">,
  "label"
>[] = [
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
];

const sectionsCustomizationSettings: Omit<
  CustomizationSettings<"productSettings">,
  "label"
>[] = [
  {
    id: "lowStockThreshold",
    type: "string",
  },
];

export const usePaymentMethods = (): PaymentMethod[] => {
  const intl = useIntl();

  return withNames(intl, paymentMethodsMessages, paymentMethods);
};

export const useMolliePaymentProvider = (): PaymentProvider<"mollie"> => {
  const intl = useIntl();

  return {
    id: "mollie",
    label: intl.formatMessage(paymentProvidersMessages.mollie),
    logo: MollieIcon,
    settings: withLabels(
      intl,
      molliePaymentProviderMessages,
      molliePaymentProviderSettings
    ),
  };
};

export const useAdyenPaymentProvider = (): PaymentProvider<"adyen"> => {
  const intl = useIntl();

  return {
    id: "adyen",
    label: intl.formatMessage(paymentProvidersMessages.adyen),
    logo: AdyenIcon,
    settings: withLabels(
      intl,
      adyenPaymentProviderMessages,
      adyenPaymentProviderSettings
    ),
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
    settings: withLabels(
      intl,
      brandingCustomizationMessages,
      brandingCustomizationSettings
    ),
  };
};

export const useSectionsCustomization =
  (): Customization<"productSettings"> => {
    const intl = useIntl();

    return {
      id: "productSettings",
      label: intl.formatMessage(customizationMessages.productSettings),
      settings: withLabels(
        intl,
        sectionsCustomizationMessages,
        sectionsCustomizationSettings
      ),
    };
  };

export const useCustomizations = () => [
  useBrandingCustomization(),
  useSectionsCustomization(),
];
