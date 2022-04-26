import { authExchange } from "@urql/exchange-auth";
import {
  createClient,
  makeOperation,
  cacheExchange,
  ClientOptions,
  dedupExchange,
  fetchExchange,
  Operation,
} from "urql";
import { AppBridge } from "../components/elements/AppProvider";

interface AuthState {
  token: string;
}

const getAuth =
  (app?: AppBridge) =>
  async ({ authState }: { authState?: AuthState | null }) => {
    if (!authState) {
      if (typeof window === "undefined") {
        return null;
      }
      const token = app?.getState().token;
      if (token) {
        return { token };
      }
    }

    return null;
  };

const addAuthToOperation = ({
  authState,
  operation,
}: {
  authState?: AuthState | null;
  operation: Operation<any, any>;
}) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.token}`,
      },
    },
  });
};

const getAuthConfig = (apiUrl: string, app?: AppBridge): ClientOptions => ({
  url: apiUrl,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth: getAuth(app),
      addAuthToOperation,
    }),
    fetchExchange,
  ],
});

export const getClient = (apiUrl: string, app?: AppBridge) =>
  createClient(getAuthConfig(apiUrl, app));
