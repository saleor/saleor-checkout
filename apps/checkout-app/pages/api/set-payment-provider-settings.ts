import {
  getPrivateSettings,
  isAuthorized,
  setPrivateSettings,
} from "@/backend/configuration/settings";
import { allowCors } from "@/backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await isAuthorized(req);
  console.log(authorized ? "JWT check: authorized" : "JWT check: unauthorized");

  if (!authorized) {
    return res.status(401).json({ ok: false });
  }

  const settings = await getPrivateSettings();

  console.log(settings); // for deployment debug pusposes

  const data = req.body?.data;

  if (!data) {
    return res.status(400).json({ ok: false });
  }

  const updatedSettings = await setPrivateSettings(
    {
      paymentProviders: {
        ...settings.paymentProviders,
        ...data,
      },
    },
    true
  );

  res.status(200).json(updatedSettings.paymentProviders);
}
export default allowCors(handler);
