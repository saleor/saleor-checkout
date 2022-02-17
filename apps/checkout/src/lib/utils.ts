import queryString from "query-string";

export const extractTokenFromUrl = (): string | undefined | null => {
  return (
    // eslint-disable-next-line no-restricted-globals
    (queryString.parse(location.search) as { token?: string | null })?.token
    // for development & preview purposes
    // || process.env.REACT_APP_CHECKOUT_TOKEN
  );
};
export const getDataWithToken = <T extends {}>(data: T = {} as T) => ({
  ...data,
  token: extractTokenFromUrl() as string,
});
