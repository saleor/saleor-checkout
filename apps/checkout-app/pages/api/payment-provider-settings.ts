import { getPrivateSettings } from "@/backend/configuration/settings";
import { allowCors, requireAuthorization } from "@/backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const settings = await getPrivateSettings({
      returnEncryptedSettings: true,
    });

    console.log(settings); // for deployment debug pusposes

    res.status(200).json({
      data: settings.paymentProviders,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
export default allowCors(requireAuthorization(handler));
