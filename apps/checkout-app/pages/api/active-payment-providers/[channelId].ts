import { allowCors } from "@backend/utils";
import { activePaymentProviders } from "mocks/app";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channelId } = req.query;
  res.status(200).json(activePaymentProviders[channelId?.toString()]);
}
export default allowCors(handler);
