import { useOrderQuery } from "@/graphql";
import { useAuthState } from "@saleor/sdk";

export const useOrder = () => {
  const { authenticating } = useAuthState();

  const [{ data, fetching: loading }] = useOrderQuery({
    variables: { token: "18b88ff0-cd4a-447e-a31e-41215917ab7c" },
    pause: authenticating,
  });

  return { order: data?.orderByToken!, loading };
};
