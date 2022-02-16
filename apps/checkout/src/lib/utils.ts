import queryString from "query-string";

export const getToken = (): string | undefined | null => {
  // eslint-disable-next-line no-restricted-globals
  return (queryString.parse(location.search) as { token?: string | null })
    ?.token;
};
export const getDataWithToken = <T extends {}>(data: T = {} as T) => ({
  ...data,
  token: getToken() as string,
});
