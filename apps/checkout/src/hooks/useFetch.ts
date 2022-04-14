import { useEffect, useState } from "react";

export type FetchResponse<TData> = Promise<
  Response & {
    json: () => Promise<TData>;
  }
>;

export type UseFetchResult<TError, TData, TArgs> = [
  { data?: TData | null; loading: boolean; error?: TError | null },
  () => Promise<void>
];

type GetArgsType<TFetchFn> = TFetchFn extends (args: infer ArgsType) => any
  ? ArgsType
  : never;

export const useFetch = <
  TData extends {},
  TError,
  TFetchFn = (args: Record<string, any> | never) => FetchResponse<TData>,
  TArgs = GetArgsType<TFetchFn>
>(
  fetchFn: TFetchFn,
  args: TArgs,
  opts: { skip?: boolean } = { skip: false }
): UseFetchResult<TError, TData, TArgs> => {
  const { skip } = opts;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);

  const useFetchDeps = args ? Object.values(args) : [];

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetchFn(args);
      const result = await response.json();
      setResult(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skip) {
      return;
    }

    fetchData();
  }, useFetchDeps);

  return [{ data: result, loading, error }, fetchData];
};
