import { encryptSetting } from "@/checkout-app/backend/configuration/encryption";

const testingVars = {
  mollieKey: process.env.TEST_MOLLIE_KEY ?? "",
  mollieProfileId: process.env.TEST_MOLLIE_PROFILE_ID ?? "",
};

export const paymentProviders = {
  mollie: {
    apiKey: encryptSetting(testingVars.mollieKey),
    profileId: {
      encrypted: false,
      value: "pfl_G6PauFyC84",
    },
  },
  adyen: {
    merchantAccount: {
      encrypted: false,
      value: "",
    },
    clientKey: {
      encrypted: false,
      value: "",
    },
    apiKey: {
      encrypted: false,
      value: "",
    },
    hmac: {
      encrypted: false,
      value: "",
    },
    password: {
      encrypted: false,
      value: "",
    },
    username: {
      encrypted: false,
      value: "",
    },
  },
};

export const appPrivateMetafields = {
  paymentProviders,
};
