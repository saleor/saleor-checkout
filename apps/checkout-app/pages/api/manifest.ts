import { APP_NAME, APP_URL } from "../../constants";
import { NextApiRequest, NextApiResponse } from "next";
import { version } from "../../package.json";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const manifest = {
    id: "saleor.checkout.app",
    version: version,
    name: APP_NAME,
    permissions: ["HANDLE_PAYMENTS", "HANDLE_CHECKOUTS", "MANAGE_ORDERS"],
    appUrl: `${APP_URL}/channels`,
    configurationUrl: `${APP_URL}/channels`,
    tokenTargetUrl: `${APP_URL}/api/register`,
    extensions: [
      {
        label: "Open order confirmation page",
        mount: "ORDER_DETAILS_MORE_ACTIONS",
        target: "POPUP",
        permissions: [],
        url: `${APP_URL}/order-confirmation-redirect`,
      },
    ],
  };
  res.end(JSON.stringify(manifest));
};

export default handler;
