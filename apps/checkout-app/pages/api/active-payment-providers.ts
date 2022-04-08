import { getSettings } from "@/backend/configuration/settings";
import { allowCors } from "@/backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const settings = await getSettings(req.body);

  console.log(settings);

  res.status(200).json(settings.channelActivePaymentProviders);
}
export default allowCors(handler);
