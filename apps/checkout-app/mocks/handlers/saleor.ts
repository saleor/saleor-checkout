import {
  PrivateMetafieldsInferedQuery,
  PrivateMetafieldsInferedQueryVariables,
} from "@/checkout-app/graphql";
import { InterceptHandler } from "@pollyjs/core";
import { appPrivateMetafields } from "../fixtures/saleor";
import {
  graphqlError,
  graphqlResponse,
  prepareGraphqlMetafields,
} from "../utils";

type GraphQLRequestShape<OperationVariables = {}> = {
  query: string;
  operationName: string;
  variables: OperationVariables;
};

export const handlePrivateMetafieldsInfered: InterceptHandler = (req, res) => {
  const json =
    req.jsonBody() as GraphQLRequestShape<PrivateMetafieldsInferedQueryVariables>;
  const { keys } = json.variables;

  if (!keys || typeof keys === "string" || keys?.length === 0) {
    res.status(400).json(
      graphqlError([
        {
          message: "Missing keys",
          errorType: "TestError",
        },
      ])
    );
    return;
  }

  res.status(200).json(
    graphqlResponse<PrivateMetafieldsInferedQuery>({
      app: {
        id: "123",
        privateMetafields: prepareGraphqlMetafields(keys, appPrivateMetafields),
      },
    })
  );
};
