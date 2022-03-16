import { getChannelPaymentOptionsList } from "api/app";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const activePaymentProviders = getChannelPaymentOptionsList();
  res.status(200).json(activePaymentProviders);
}
