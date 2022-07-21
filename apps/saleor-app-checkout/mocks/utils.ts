import { envVars } from "@/checkout-app/constants";
import { graphql } from "msw";

export const saleorApi = graphql.link(envVars.apiUrl);

export const prepareGraphqlMetafields = (
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
