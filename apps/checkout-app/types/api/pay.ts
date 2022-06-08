import { Errors } from "@/checkout-app/backend/payments/types";

import { PaymentProviderID } from "../common";

type BaseBody = {
  provider: PaymentProviderID;
  redirectUrl: string;
  // captureAmount?: number; // support for partial payments
};

export type OrderBody = {
  orderId: string;
} & BaseBody;

export type CheckoutBody = {
  checkoutId: string;
  totalAmount: number;
} & BaseBody;

export type Body = OrderBody | CheckoutBody;

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

export type SuccessResponse = {
  provider: PaymentProviderID;
  ok: true;
  orderId: string;
} & (MollieResponse | AdyenResponse);

export type ErrorResponse = {
  ok: false;
  orderId?: string;
  errors: Errors;
};

export type Response = SuccessResponse | ErrorResponse;
