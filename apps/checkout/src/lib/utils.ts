/* eslint-disable no-restricted-globals */
import queryString from "query-string";

export const extractTokenFromUrl = (): string => {
  const token =
    (queryString.parse(location.search) as { token?: string | null })?.token ||
    // for development & preview purposes
    process.env.REACT_APP_TEST_CHECKOUT_TOKEN;

  if (typeof token !== "string") {
    throw new Error("Checkout token does not exist");
  }

  return token;
};

export const getDataWithToken = <TData extends {} = {}>(
  data: TData = {} as TData
) => ({
  token: extractTokenFromUrl(),
  ...data,
});

export type QueryVariables = Record<
  "token" | "passwordResetToken" | "email",
  string
>;

export const getQueryVariables = (): Partial<QueryVariables> =>
  queryString.parse(location.search);

export const getCurrentHref = () => location.origin;
