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
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  let body: Body =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const orderData = await createOrder(body.checkoutId, body.totalAmount);

  let data: Response;

  if (body.provider === "mollie") {
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
