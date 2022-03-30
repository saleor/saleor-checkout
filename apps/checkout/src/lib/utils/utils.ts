/* eslint-disable no-restricted-globals */
import { reduce } from "lodash";
import queryString from "query-string";

export const getById =
  <T extends { id: string }>(idToCompare: string) =>
  (obj: T) =>
    obj.id === idToCompare;

export const getDataWithToken = <TData extends {} = {}>(
  data: TData = {} as TData
) => ({
  token: extractCheckoutTokenFromUrl(),
  ...data,
});

export type QueryVariables = Record<
  "checkoutToken" | "passwordResetToken" | "email",
  string
>;

export const getQueryVariables = (): Partial<QueryVariables> => {
  const vars = queryString.parse(location.search);
  return { ...vars, passwordResetToken: vars.token as string | undefined };
};

export const getCurrentHref = () => location.href;

const extractCheckoutTokenFromUrl = (): string => {
  const { checkoutToken } = getQueryVariables();

  // for development & preview purposes
  const token = checkoutToken || process.env.REACT_APP_TEST_CHECKOUT_TOKEN;

  if (typeof token !== "string") {
    throw new Error("Checkout token does not exist");
  }

  return token;
};

export const extractMutationErrors = (result): [boolean, any[]] => {
  const urqlErrors = result.error ? [result.error] : [];

  const graphqlErrors = reduce(
    result.data,
    (result, { errors }) => {
      return [...result, ...errors];
    },
    []
  );

  const errors = [...urqlErrors, ...graphqlErrors];

  return [errors.length > 0, errors];
};
