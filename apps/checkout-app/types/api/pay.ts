import { Errors } from "@/checkout-app/backend/payments/types";

import { PaymentProviderID } from "@saleor/checkout-common-types";

type MollieResponse = {
  provider: "mollie";
  data: {
    paymentUrl: string;
  };
};

type AdyenResponse = {
  provider: "adyen";
  data: {
    paymentUrl: string;
  };
};

export type PayRequestSuccessResponse = {
  provider: PaymentProviderID;
  ok: true;
  orderId: string;
} & (MollieResponse | AdyenResponse);

export type PayRequestErrorResponse = {
  ok: false;
  orderId?: string;
  errors: Errors;
};

export type PayRequestResponse =
  | PayRequestSuccessResponse
  | PayRequestErrorResponse;
