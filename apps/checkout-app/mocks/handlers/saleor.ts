import { envVars } from "@/checkout-app/constants";
import {
  PrivateMetafieldsInferedQuery,
  PrivateMetafieldsInferedQueryVariables,
} from "@/checkout-app/graphql";
import { graphql } from "msw";
import { appPrivateMetafields } from "../fixtures/saleor";

const saleor = graphql.link(envVars.apiUrl);

const prepareGraphqlMetafields = (
  keys: string[],
  metafields: Record<string, any>
) => {
  return keys.reduce(
    (allKeys, key) => ({
      ...allKeys,
      [key]: JSON.stringify(metafields[key]),
    }),
    {}
  );
};

export const saleorHandlers = [
  saleor.query<
    PrivateMetafieldsInferedQuery,
    PrivateMetafieldsInferedQueryVariables
  >("PrivateMetafieldsInfered", (req, res, ctx) => {
    const { keys } = req.variables;
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
