import { FetchResponse } from "@/checkout-frontstore/hooks/useFetch";
import {} from "@/checkout-frontstore/lib/utils";
import { AppConfig } from "@/checkout-frontstore/providers/AppConfigProvider/types";
import { PayRequestBody } from "checkout-app/types/api/pay";
import { PaymentStatusResponse } from "checkout-app/types/api/payment-status";
import { PayResult } from "./types";
import { ChannelActivePaymentProvidersByChannel } from "checkout-app/types";
import urlJoin from "url-join";

export type PaymentMethodsRequestArgs = {
  channelId: string;
  checkoutApiUrl: string;
};

export const getPaymentMethods = ({
  checkoutApiUrl,
  channelId,
}: PaymentMethodsRequestArgs): FetchResponse<ChannelActivePaymentProvidersByChannel> =>
  fetch(urlJoin(checkoutApiUrl, "active-payment-providers", channelId));

export const pay = ({
  checkoutApiUrl,
  ...body
}: PayRequestBody): FetchResponse<PayResult> =>
  fetch(urlJoin(checkoutApiUrl, "pay"), {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getAppConfig = ({
  checkoutApiUrl,
}: {
  checkoutApiUrl: string;
}): FetchResponse<AppConfig> =>
  fetch(urlJoin(checkoutApiUrl, "customization-settings"));

export const getOrderPaymentStatus = ({
  orderId,
  checkoutApiUrl,
}: {
  orderId: string;
  checkoutApiUrl: string;
}): FetchResponse<PaymentStatusResponse> =>
  fetch(urlJoin(checkoutApiUrl, "payment-status", orderId));
