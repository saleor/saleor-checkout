import { getPublicSettings } from "@/saleor-app-checkout/backend/configuration/settings";
import { allowCors } from "@/saleor-app-checkout/backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const settings = await getPublicSettings();

  console.log(settings); // for deployment debug pusposes

  res.status(200).json(settings.customizations);
}
export default allowCors(handler);
