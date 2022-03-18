// https://docs.mollie.com/overview/webhooks

import { NextApiRequest, NextApiResponse } from "next";

import { verifyPayment } from "../../../payments/providers/mollie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ("id" in req.body) {
    const paid = await verifyPayment(req.body.id);
    console.log(paid);
    res.status(200).json(paid);
  }

  res.status(400).json({ error: "invalid request body" });
}
