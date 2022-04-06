import { allowCors } from "@/backend/utils";
import { getActivePaymentProvidersByChannel } from "@/frontend/data";
import { activePaymentProviders } from "mocks/app";
import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channelId } = req.query;
  const activePaymentProvidersForChannel = getActivePaymentProvidersByChannel(
    activePaymentProviders,
    channelId?.toString()
  );
  res.status(200).json(activePaymentProvidersForChannel);
}
export default allowCors(handler);
