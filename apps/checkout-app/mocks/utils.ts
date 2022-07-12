import { RouteHandler } from "@pollyjs/core";
import {
  OperationDefinitionNode,
  OperationTypeNode,
  parse,
} from "graphql/language";

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

export const parseGraphQLRequest = (query: string) => {
  const doc = parse(query);
  const operation = doc.definitions.find(
    (def) => def.kind === "OperationDefinition"
  ) as OperationDefinitionNode | undefined;

  if (operation) {
    return {
      operationType: operation?.operation,
      operationName: operation?.name?.value,
    };
  }

  return null;
};

type PollyFilterFn = Parameters<RouteHandler["filter"]>[0];

export const getFilterPollyRequests = (
  expectedName: string,
  expectedType: `${OperationTypeNode}`
): PollyFilterFn => {
  return (req) => {
    const { query } = req.jsonBody();
    if (!query) {
      return false;
    }
    const operation = parseGraphQLRequest(query);
    if (!operation) {
      return false;
    }
    const { operationName, operationType } = operation;
    return operationName === expectedName && operationType === expectedType;
  };
};

type GraphQLError = {
  message: string;
  errorType: string;
};

export const graphqlError = (errors: GraphQLError[]) => {
  return {
    error: {
      errors: [...errors],
    },
  };
};

export const graphqlResponse = <QueryType extends Record<string, any>>(
  responseData: QueryType
) => {
  return {
    data: responseData,
  };
};
