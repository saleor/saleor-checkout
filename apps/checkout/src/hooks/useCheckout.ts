import { useCheckoutQuery } from "@/graphql";
import { getDataWithToken } from "@/lib/utils";
import { useEnvContext } from "@/providers/EnvProvider";
import { useAuthState } from "@saleor/sdk";

export const useCheckout = () => {
  const { authenticating } = useAuthState();

  const envContext = useEnvContext();

  const [{ data, fetching: loading }] = useCheckoutQuery({
    variables: getDataWithToken(envContext),
    pause: authenticating,
  });

  return { checkout: data?.checkout!, loading };
};
