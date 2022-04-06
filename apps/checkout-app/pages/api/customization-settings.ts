import { allowCors } from "@/backend/utils";
import { customizationSettingsValues } from "mocks/app";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(customizationSettingsValues);
}
export default allowCors(handler);
