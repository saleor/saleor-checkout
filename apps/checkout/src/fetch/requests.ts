import { FetchResponse } from "@/hooks/useFetch";
import { envVars } from "@/lib/utils";
import { AppConfig } from "@/providers/AppConfigProvider/types";

export const getPaymentProviders = (configAppUrl?: string) =>
  fetch(
    `${envVars.configAppUrl || configAppUrl}/active-payment-providers/channel-1`
  );

export interface PayResult {
  data: {
    checkoutUrl: string;
  };
}

export const pay = (
  {
    checkoutId,
    totalAmount,
    provider,
  }: {
    checkoutId: string;
    totalAmount: number;
    provider: string;
  },
  configAppUrl?: string
): FetchResponse<PayResult> =>
  fetch(`${envVars.checkoutAppUrl || configAppUrl}/pay`, {
    method: "POST",
    body: JSON.stringify({
      provider,
      checkoutId,
      totalAmount,
    }),
  });

export const getAppConfig = (configAppUrl?: string): FetchResponse<AppConfig> =>
  fetch(`${envVars.configAppUrl || configAppUrl}/customization-settings`);
