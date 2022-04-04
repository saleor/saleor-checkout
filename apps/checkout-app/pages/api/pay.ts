import { NextApiRequest, NextApiResponse } from "next";

import { createMolliePayment } from "@backend/payments/providers/mollie";
import { createOrder } from "@backend/payments/createOrder";
import { allowCors } from "@backend/utils";

type PaymentProviders = "mollie";

type Body = {
  provider: PaymentProviders;
  checkoutId: string;
  totalAmount: number;
  captureAmount?: number; // support for partial payments
};

type MollieResponse = {
  provider: "mollie";
  data: {
    checkoutUrl: string;
  };
};

type Response = {
  provider: PaymentProviders;
  ok: boolean;
} & MollieResponse;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const orderData = await createOrder(
    req.body.checkoutId,
    req.body.totalAmount
  );

  let data: Response;

  if (req.body.provider === "mollie") {
    const url = await createMolliePayment(orderData);

    if (url) {
      data = {
        ok: true,
        provider: "mollie",
        data: {
          checkoutUrl: url.href,
        },
      };

      return res.status(200).json(data);
    }
  }

  res.status(400).json({ ok: false });
}

export default allowCors(handler);
