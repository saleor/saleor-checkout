import { useOrderQuery } from "@/graphql";
import { useAuthState } from "@saleor/sdk";

export const useOrder = (id: string) => {
  const { authenticating } = useAuthState();

  const [{ data, fetching: loading }] = useOrderQuery({
    variables: { id },
    pause: authenticating,
  });

  return { order: data?.order!, loading };
};
