import { Divider } from "@components/Divider";
import { useForm } from "@hooks/useCheckoutForm";
import { Suspense } from "react";
import { FormProvider } from "../providers/FormProvider";
import { Contact } from "./Contact";

export const CheckoutForm = () => {
  // will be used for e.g. account creation at checkout finalization
  const methods = useForm();

  return (
    <Suspense fallback="loaden">
      <FormProvider {...methods}>
        <div className="checkout-form">
          <Contact />
          <Divider className="mt-4" />
        </div>
      </FormProvider>
    </Suspense>
  );
};
