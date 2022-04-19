import {
  AdyenProviderSettingID,
  MollieProviderSettingID,
  PaymentProviderID,
} from "@/types/common";
import { defineMessages } from "react-intl";

export const paymentProvidersMessages = defineMessages<PaymentProviderID>({
  mollie: {
    defaultMessage: "Mollie",
    description: "payment provider",
  },
  adyen: {
    defaultMessage: "Adyen",
    description: "payment provider",
  },
});

export const molliePaymentProviderMessages =
  defineMessages<MollieProviderSettingID>({
    partnerId: {
      defaultMessage: "Partner ID",
      description: "payment provider setting",
    },
    liveTestApiKey: {
      defaultMessage: "Live Test API Key",
      description: "payment provider setting",
    },
  });

export const adyenPaymentProviderMessages =
  defineMessages<AdyenProviderSettingID>({
    merchantAccount: {
      defaultMessage: "Merchant Account",
      description: "payment provider setting",
    },
    clientKey: {
      defaultMessage: "Client Key",
      description: "payment provider setting",
    },
    supportedCurrencies: {
      defaultMessage: "Supported Currencies",
      description: "payment provider setting",
    },
  });
