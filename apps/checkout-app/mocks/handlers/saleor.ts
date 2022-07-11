import {
  PrivateMetafieldsInferedQuery,
  PrivateMetafieldsInferedQueryVariables,
} from "@/checkout-app/graphql";
import { appPrivateMetafields } from "../fixtures/saleor";
import { prepareGraphqlMetafields, saleorApi } from "../utils";

export const saleorHandlers = [
  saleorApi.query<
    PrivateMetafieldsInferedQuery,
    PrivateMetafieldsInferedQueryVariables
  >("PrivateMetafieldsInfered", (req, res, ctx) => {
    const { keys } = req.variables;
    console.log(keys);
    if (!keys || typeof keys === "string" || keys?.length === 0) {
      return res(
        ctx.errors([
          {
            message: "Missing keys",
            errorType: "TestError",
          },
        ])
      );
    }
    console.log(prepareGraphqlMetafields(keys, appPrivateMetafields));
    return res(
      ctx.data({
        app: {
          id: "123",
          privateMetafields: prepareGraphqlMetafields(
            keys,
            appPrivateMetafields
          ),
        },
      })
    );
  }),
];
