import { FetchResponse } from "@/hooks/useFetch";
import { envVars } from "@/lib/utils";
import { AppConfig } from "@/providers/AppConfigProvider/types";

export const getPaymentProviders = () =>
  fetch(`${envVars.checkoutAppUrl}/active-payment-providers/channel-1`);

export interface PayResult {
  data: {
    paymentUrl: string;
  };
}

export const pay = ({
  checkoutId,
  totalAmount,
  provider,
  redirectUrl,
}: {
  checkoutId: string;
  totalAmount: number;
  provider: string;
  redirectUrl: string;
}): FetchResponse<PayResult> =>
  fetch(`${envVars.checkoutAppUrl}/pay`, {
    method: "POST",
    body: JSON.stringify({
      provider,
      checkoutId,
      totalAmount,
      redirectUrl,
    }),
  });

export const getAppConfig = (): FetchResponse<AppConfig> =>
  fetch(`${envVars.checkoutAppUrl}/customization-settings`);
