import { FetchResponse } from "@/checkout/hooks/useFetch";
import { envVars } from "@/checkout/lib/utils";
import { AppConfig } from "@/checkout/providers/AppConfigProvider/types";
import { Body } from "checkout-app/types/api/pay";
import { PaymentStatusResponse } from "checkout-app/types/api/payment-status";

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

export const getOrderPaymentStatus = ({
  orderId,
}: {
  orderId: string;
}): FetchResponse<PaymentStatusResponse> =>
  fetch(`${envVars.checkoutAppUrl}/payment-status/${orderId}`);
