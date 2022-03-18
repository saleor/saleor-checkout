// https://docs.mollie.com/overview/webhooks

import { NextApiRequest, NextApiResponse } from "next";

import { verifyPayment } from "@backend/payments/providers/mollie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("WEBHOOK CALLED", req.body);
  if ("id" in req.body) {
    const paid = await verifyPayment(req.body.id);

    res.status(200).json(paid);

    if (paid) {
      // create payment
    }

    return;
  }

  res.status(400).json({ error: "invalid request body" });
}
