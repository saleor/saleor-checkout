/* eslint-disable no-restricted-globals */

export type EnvVar =
  | "checkoutAppUrl"
  | "apiUrl"
  | "devCheckoutToken"
  | "configAppUrl";

export interface EnvVars
  extends Omit<Record<EnvVar, string>, "devCheckoutToken"> {
  devCheckoutToken?: string;
}

export const getEnvVars = (): EnvVars => {
  const envVars = process.env;

  return {
    checkoutAppUrl: envVars.REACT_APP_CHECKOUT_APP_URL,
    apiUrl: envVars.REACT_APP_API_URL,
    devCheckoutToken: envVars.TEST_CHECKOUT_TOKEN,
    configAppUrl: envVars.REACT_APP_CONFIG_APP_URL,
  } as EnvVars;
};
