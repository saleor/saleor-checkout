import { getSettings } from "@/backend/configuration/settings";
import { allowCors } from "@/backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const settings = await getSettings();

  console.log(settings); // for deployment debug pusposes

  res.status(200).json(settings.paymentProviders);
}
export default allowCors(handler);
