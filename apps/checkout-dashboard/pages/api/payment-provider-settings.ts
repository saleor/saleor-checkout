import { getPaymentProviderSettings } from "api/app";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const paymentProviderSettingsValues = getPaymentProviderSettings();
  res.status(200).json(paymentProviderSettingsValues);
}
