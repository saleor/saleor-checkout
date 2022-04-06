import { allowCors } from "@/backend/utils";
import { activePaymentProviders } from "mocks/app";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(activePaymentProviders);
}
export default allowCors(handler);
