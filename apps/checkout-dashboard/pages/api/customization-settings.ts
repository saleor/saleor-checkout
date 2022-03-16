import { getCustomizationSettings } from "api/app";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const customizationSettingsValues = getCustomizationSettings();
  res.status(200).json(customizationSettingsValues);
}
