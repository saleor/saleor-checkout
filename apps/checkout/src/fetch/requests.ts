import { FetchResponse } from "@/hooks/useFetch";
import { envVars } from "@/lib/utils";
import { AppConfig } from "@/providers/AppConfigProvider/types";
import { Body } from "checkout-app/types/api/pay";

export const getPaymentProviders = () =>
  fetch(`${envVars.checkoutAppUrl}/active-payment-providers/channel-1`);

export interface PayResult {
  orderId: string;
  data: {
    paymentUrl: string;
  };
}

export const pay = (body: Body): FetchResponse<PayResult> =>
  fetch(`${envVars.checkoutAppUrl}/pay`, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getAppConfig = (): FetchResponse<AppConfig> =>
  fetch(`${envVars.checkoutAppUrl}/customization-settings`);
