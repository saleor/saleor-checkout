import { Divider } from "@components/Divider";
import { useCheckout } from "@hooks/useCheckout";
import { useErrorMessages } from "@hooks/useErrorMessages";
import { useValidationResolver } from "@lib/utils";
import { PaymentOptions } from "./PaymentOptions";
import { ShippingMethods } from "./ShippingMethods";
import { UserAddresses } from "./UserAddresses";
import { Suspense, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { Contact } from "./Contact";
import { pay } from "./requests";
import { Button } from "@components/Button";

interface FormData {
  email: string;
  password: string;
}

export const CheckoutForm = () => {
  const errorMessages = useErrorMessages();
  const { checkout } = useCheckout();

  const [selectedPaymentProvider, setSelectedPaymentProvider] =
    useState<string>();

  const schema = object({
    password: string().required(errorMessages.requiredField),
    email: string()
      .email(errorMessages.invalidValue)
      .required(errorMessages.requiredField),
  });

  const resolver = useValidationResolver(schema);
  // will be used for e.g. account creation at checkout finalization
  const methods = useForm<FormData>({
    resolver,
    mode: "onBlur",
    defaultValues: { email: checkout?.email || "" },
  });

  const { setValue, watch } = methods;

  const handleEmailChange = (value: string) => setValue("email", value);

  const finalizeCheckout = async () => {
    const result = await pay({
      provider: "mollie",
      checkoutId: checkout?.id,
      totalAmount: checkout?.totalPrice?.gross?.amount as number,
    });

    const { data } = await result.json();

    if (data?.checkoutUrl) {
      window.location.replace(data.checkoutUrl);
    }
  };

  return (
    <Suspense fallback="loaden">
      <FormProvider {...methods}>
        <div className="checkout-form">
          <Contact onEmailChange={handleEmailChange} email={watch("email")} />
          <Divider className="mt-4" />
          <UserAddresses />
          <ShippingMethods />
          <PaymentOptions
            onSelect={setSelectedPaymentProvider}
            selectedValue={selectedPaymentProvider}
          />
          <Button
            ariaLabel="finaliza checkout"
            title="Pay"
            onClick={finalizeCheckout}
            className="min-w-28"
          />
        </div>
      </FormProvider>
    </Suspense>
  );
};
