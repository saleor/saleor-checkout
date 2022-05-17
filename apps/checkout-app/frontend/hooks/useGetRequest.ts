import { useEffect, useState } from "react";
import { CombinedError } from "urql";
import { getAuthHeaders } from "../misc/auth";

export interface GetRequestOpts {
  pause?: boolean;
}

export const useGetRequest = <T>(input: RequestInfo, opts?: GetRequestOpts) => {
  const [error, setError] = useState<CombinedError>();
  const [data, setData] = useState<T>();
  const [initialized, setInitialized] = useState(false);
  const [fetching, setFetching] = useState(true);

  const makeRequest = async () => {
    setInitialized(true);
    setError(undefined);

    const res = await fetch(input, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const resData = await res.json();

    if (resData.error) {
      setError(resData.error);
    } else {
      setData(resData.data);
    }
    setFetching(false);
  };

  useEffect(() => {
    if (!opts?.pause) {
      makeRequest();
    }
  }, []);

  useEffect(() => {
    if (!opts?.pause && !initialized) {
      makeRequest();
    }
  }, [opts?.pause]);

  return { data, fetching, error };
};
