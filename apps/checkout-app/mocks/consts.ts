export type TestingEnvVar =
  | "mollieKey"
  | "mollieProfileId"
  | "adyenMarchantAccount"
  | "adyenClientKey"
  | "adyenApiKey"
  | "adyenHmac"
  | "adyenWebhookPassword"
  | "adyenWebhookUsername";

export type TestingEnvVars = Record<TestingEnvVar, string>;

export const testingVars: TestingEnvVars = {
  mollieKey: process.env.TEST_MOLLIE_KEY ?? "",
  mollieProfileId: process.env.TEST_MOLLIE_PROFILE_ID ?? "",

  adyenMarchantAccount: process.env.TEST_ADYEN_MERCHANT_ACCOUNT ?? "",
  adyenClientKey: process.env.TEST_ADYEN_CLIENT_KEY ?? "",
  adyenApiKey: process.env.TEST_ADYEN_API_KEY ?? "",
  adyenHmac: process.env.TEST_ADYEN_HMAC ?? "",
  adyenWebhookPassword: process.env.TEST_ADYEN_WEBHOOK_PASSWORD ?? "",
  adyenWebhookUsername: process.env.TEST_ADYEN_WEBHOOK_USERNAME ?? "",
};
