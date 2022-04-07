import { getSettings } from "@/backend/configuration/settings";
import { allowCors } from "@/backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channelId } = req.query;

  const settings = await getSettings(req.body);

  res
    .status(200)
    .json(settings.channelActivePaymentProviders?.[channelId?.toString()]);
}
export default allowCors(handler);
