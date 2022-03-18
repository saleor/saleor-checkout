import { NextApiRequest, NextApiResponse } from "next";

import { createMolliePayment } from "@backend/payments/providers/mollie";
import { createOrder } from "@backend/payments/createOrder";

type PaymentProviders = "mollie";

type Body = {
  provider: PaymentProviders;
  checkoutId: string;
  totalAmount: number;
  captureAmount?: number; // support for partial payments
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const orderData = await createOrder(
    req.body.checkoutId,
    req.body.totalAmount
  );
  const redirectUrl = await createMolliePayment(orderData);
  res.status(200).json(redirectUrl);
}
