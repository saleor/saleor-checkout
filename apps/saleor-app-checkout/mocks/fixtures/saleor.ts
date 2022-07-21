import { encryptSetting } from "@/saleor-app-checkout/backend/configuration/encryption";
import { testingVars } from "../consts";

export const paymentProviders = {
  mollie: {
    apiKey: encryptSetting(testingVars.mollieKey),
    profileId: {
      encrypted: false,
      value: testingVars.mollieProfileId,
    },
  },
  adyen: {
    merchantAccount: {
      encrypted: false,
      value: testingVars.adyenMarchantAccount,
    },
    clientKey: {
      encrypted: false,
      value: testingVars.adyenClientKey,
    },
    apiKey: encryptSetting(testingVars.adyenApiKey),
    hmac: encryptSetting(testingVars.adyenHmac),
    password: encryptSetting(testingVars.adyenWebhookPassword),
    username: encryptSetting(testingVars.adyenWebhookUsername),
  },
};

export const appPrivateMetafields = {
  paymentProviders,
};
