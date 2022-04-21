import { pay as payRequest } from "@/fetch";
import { useCheckout } from "@/hooks/useCheckout";
import { useFetch } from "@/hooks/useFetch";
import { extractMutationErrors } from "@/lib/utils";
import { useErrors } from "@/providers/ErrorsProvider";
import { useAuth, useAuthState } from "@saleor/sdk";
import { FormData } from "./types";

export const useCheckoutFinalize = () => {
  const { checkout } = useCheckout();
  const { register } = useAuth();
  const { user } = useAuthState();
  const [, pay] = useFetch(payRequest, { opts: { skip: true } });
  const { setApiErrors, errors } = useErrors<FormData>("userRegister");

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

  const handleUserRegister = async (formData: FormData) => {
    // adding redirect url becuase api is broken and requires it
    // despite te types saying otherwise
    const result = await register({ ...formData, redirectUrl: "" });

    const [hasErrors, errors] = extractMutationErrors(result);

    if (hasErrors) {
      setApiErrors(errors);
    }
  };

  const checkoutFinalize = async (formData: FormData) => {
    if (!user && formData.createAccount) {
      await handleUserRegister(formData);
    }

    if (!errors) {
      checkoutPay();
    }
  };

  return { checkoutFinalize };
};
