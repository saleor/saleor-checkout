import {
  getPrivateSettings,
  setPrivateSettings,
} from "@/backend/configuration/settings";
import { allowCors, requireAuthorization } from "@/backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  console.log("data:", data); // for deployment debug pusposes

  if (!data) {
    return res.status(400).json({
      error: {
        message: "Submitted data is incorrect",
      },
    });
  }

  try {
    const settings = await getPrivateSettings(true);

    console.log(settings); // for deployment debug pusposes

    const updatedSettings = await setPrivateSettings(
      {
        ...settings,
        paymentProviders: {
          ...settings.paymentProviders,
          ...JSON.parse(data),
        },
      },
      true
    );

    return res.status(200).json({
      data: updatedSettings.paymentProviders,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
export default allowCors(requireAuthorization(handler));
