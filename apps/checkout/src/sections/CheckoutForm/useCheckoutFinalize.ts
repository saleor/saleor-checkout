import { pay as payRequest } from "@/fetch";
import { useCheckout } from "@/hooks/useCheckout";
import { useFetch } from "@/hooks/useFetch";
import { extractMutationErrors } from "@/lib/utils";
import { useAuth } from "@saleor/sdk";
import { FormData } from "./types";

export const useCheckoutFinalize = () => {
  const { checkout } = useCheckout();
  const { register } = useAuth();
  const [, pay] = useFetch(payRequest, { opts: { skip: true } });

  const checkoutPay = async () => {
    const data = await pay({
      provider: "mollie",
      checkoutId: checkout?.id,
      totalAmount: checkout?.totalPrice?.gross?.amount as number,
    });

    if (data!.checkoutUrl) {
      window.location.replace(data!.checkoutUrl);
    }
  };

  const checkoutFinalize = async (formData: FormData) => {
    const result = await register(formData);

    const [hasErrors, errors] = extractMutationErrors(result);

    if (!hasErrors) {
      checkoutPay();
    }
  };

  return { checkoutFinalize };
};
