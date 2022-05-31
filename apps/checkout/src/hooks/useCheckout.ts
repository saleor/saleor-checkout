import { useCheckoutQuery } from "@/graphql";
import { getDataWithToken } from "@/lib/utils";
import { useAuthState } from "@saleor/sdk";

export const useCheckout = () => {
  const { authenticating } = useAuthState();
  console.log("AUTH", authenticating);

  const [{ data, fetching: loading }] = useCheckoutQuery({
    variables: getDataWithToken(),

    // pause: authenticating,
  });

  console.log("DATA", data);
  console.log("LOADING", loading);

  return { checkout: data?.checkout!, loading: loading || authenticating };
};
