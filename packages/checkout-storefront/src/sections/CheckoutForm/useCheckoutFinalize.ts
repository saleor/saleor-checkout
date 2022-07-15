import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { useErrors } from "@/checkout-storefront/hooks/useErrors";
import { extractMutationErrors } from "@/checkout-storefront/lib/utils";
import { useAuth, useAuthState } from "@saleor/sdk";
import { omit } from "lodash-es";

import { FormData } from "./types";
import { usePay } from "@/checkout-storefront/hooks/usePay";
import { useAlerts } from "@/checkout-storefront/hooks/useAlerts";
import { PayErrorResult } from "@/checkout-storefront/fetch";
import { useAppConfig } from "@/checkout-storefront/providers/AppConfigProvider";

export const useCheckoutFinalize = () => {
  const { checkout } = useCheckout();
  const { register } = useAuth();
  const { user } = useAuthState();
  const { checkoutPay, loading } = usePay();
  const {
    env: { checkoutApiUrl },
  } = useAppConfig();
  const { showErrors, showCustomErrors } = useAlerts();
  const { errors, setApiErrors } = useErrors();

  const userRegister = async (formData: FormData): Promise<boolean> => {
    if (user || !formData.createAccount) {
      return true;
    }

    const registerFormData = omit(formData, "createAccount");
    // adding redirect url because some saleor envs require it
    const result = await register({
      ...registerFormData,
      redirectUrl: location.href,
    });

    const [hasErrors, errors] = extractMutationErrors(result);

    if (hasErrors) {
      showErrors(errors, "userRegister");
      setApiErrors(errors);
      return hasErrors;
    }

    return false;
  };

  const checkoutFinalize = async (formData: FormData) => {
    const userRegisterSuccessOrPassed = await userRegister(formData);

    if (userRegisterSuccessOrPassed) {
      const result = await checkoutPay({
        checkoutApiUrl,
        provider: formData.paymentProviderId,
        checkoutId: checkout?.id,
        totalAmount: checkout?.totalPrice?.gross?.amount as number,
      });
      if (!(result as PayErrorResult)?.ok) {
        const { errors } = result as PayErrorResult;
        showCustomErrors(errors, "checkoutPay");
      }
    }
  };

  return {
    checkoutFinalize,
    submitting: loading,
    errors,
  };
};
