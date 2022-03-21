// import { CreateWebhookMutation, WebhookEventTypeEnum } from "@graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { SALEOR_DOMAIN_HEADER } from "../../constants";
// import { createWebhook } from "../../graphql/data/mutations/webhook";
// import { initializeApollo } from "../../graphql/withApollo";
// import { Registration } from "../../saleorApp/entities/Registration.entity";
// import { getOrCreateConnection } from "../../utils/database";

const handler = async (
  request: NextApiRequest,
  res: NextApiResponse
): Promise<undefined> => {
  console.log(request);
  const saleor_domain = request.headers[SALEOR_DOMAIN_HEADER];
  if (!saleor_domain) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        success: false,
        message: "Missing saleor domain token.",
      })
    );
    return;
  }
  const auth_token = request.body?.auth_token as string;
  if (!auth_token) {
    res.statusCode = 400;
    res.end(JSON.stringify({ success: false, message: "Missing auth token." }));
    return;
  }
  // const conn = await getOrCreateConnection();
  // const registrationRepo = conn.getRepository<Registration>(Registration);
  // const newRegistration = new Registration();
  // const domain = saleor_domain.toString();
  // newRegistration.domain = domain;
  // newRegistration.authToken = auth_token;
  // await registrationRepo.insert(newRegistration);
  if (typeof window !== "undefined") {
    window.localStorage.setItem("saleor_domain", saleor_domain.toString());
    window.localStorage.setItem("auth_token", auth_token);
  }

  // async ftw
  res.end(JSON.stringify({ success: true }));

  // // webhook registration
  // const client = initializeApollo();
  // await client.mutate<CreateWebhookMutation>({
  //   mutation: createWebhook,
  //   variables: {
  //     name: "Best app: Product updated",
  //     targetUrl: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/webhooks/product-updated`,
  //     events: WebhookEventTypeEnum.ProductUpdated,
  //     secretKey: process.env.SECRET,
  //   },
  //   context: {
  //     headers: {
  //       Authorization: `Bearer ${newRegistration.authToken}`,
  //     },
  //   },
  // });
};

export default handler;
