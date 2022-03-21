import { NextApiRequest, NextApiResponse } from "next";
import { version, name } from "../../package.json";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const manifest = {
    id: "saleor.checkout.app",
    version: version,
    name: name,
    permissions: ["MANAGE_APPS"],
    appUrl: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/channels`,
    configurationUrl: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/channels`,
    tokenTargetUrl: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/register`,
  };
  res.end(JSON.stringify(manifest));
};

export default handler;
