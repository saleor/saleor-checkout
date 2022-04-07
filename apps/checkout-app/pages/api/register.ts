import { NextApiRequest, NextApiResponse } from "next";

import { SALEOR_DOMAIN_HEADER } from "../../constants";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<undefined> => {
  console.log(request);

  const saleor_domain = request.headers[SALEOR_DOMAIN_HEADER];
  if (!saleor_domain) {
    response
      .status(400)
      .json({ success: false, message: "Missing saleor domain token." });
    return;
  }

  const auth_token = request.body?.auth_token as string;
  if (!auth_token) {
    response
      .status(400)
      .json({ success: false, message: "Missing auth token." });
    return;
  }

  // await fetch(process.env.SALEOR_MARKETPLACE_REGISTER_URL as string, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     auth_token,
  //     marketplace_token: process.env.SALEOR_MARKETPLACE_TOKEN,
  //   }),
  // });

  response.json({ success: true });
};

export default handler;
