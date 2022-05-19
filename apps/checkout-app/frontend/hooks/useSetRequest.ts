import { useState } from "react";
import { CombinedError } from "urql";
import { getAuthHeaders } from "../misc/auth";

export const useSetRequest = <T, S>(input: RequestInfo) => {
  const [error, setError] = useState<Partial<CombinedError>>();
  const [data, setData] = useState<T>();
  const [fetching, setFetching] = useState(false);

  const request = async (data: S): Promise<T> => {
    setFetching(true);
    setError(undefined);

    const res = await fetch(input, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setError({ message: res.statusText });
      setFetching(false);
    }

    const resData = await res.json();

    if (resData.error) {
      setError(resData.error);
    } else {
      setData(resData.data);
    }
    setFetching(false);

    return resData;
  };

  return [{ data, fetching, error }, request] as const;
};
