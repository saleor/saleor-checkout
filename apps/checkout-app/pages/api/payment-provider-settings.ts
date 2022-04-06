import { allowCors } from "@/backend/utils";
import { paymentProviderSettingsValues } from "mocks/app";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(paymentProviderSettingsValues);
}
export default allowCors(handler);
