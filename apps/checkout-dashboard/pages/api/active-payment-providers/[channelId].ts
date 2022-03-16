import { getChannelPaymentOptions } from "api/app";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channelId } = req.query;
  const activePaymentProviders = getChannelPaymentOptions(
    channelId?.toString()
  );
  res.status(200).json(activePaymentProviders);
}
