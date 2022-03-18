import { NextApiRequest, NextApiResponse } from "next";

import { createMolliePayment } from "../../payments/providers/mollie";

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
  const redirectUrl = await createMolliePayment();
  res.status(200).json(redirectUrl);
}
