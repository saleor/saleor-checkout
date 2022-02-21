import { useCheckoutQuery } from "@graphql";
import { getToken } from "@lib/utils";

export const useCheckout = () => {
  const token = getToken();

  const [{ data, fetching: loading }] = useCheckoutQuery({
    variables: { token: token as string },
    pause: !token,
  });

  return { checkout: data!.checkout!, loading };
};
