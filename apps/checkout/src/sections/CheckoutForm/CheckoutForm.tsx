import { Divider } from "@/components/Divider";
import { useCheckout } from "@/hooks/useCheckout";
import { Contact } from "@/sections/Contact";
import { ShippingMethods } from "@/sections/ShippingMethods";
import { UserAddresses } from "@/sections/UserAddresses";
import { useErrorMessages } from "@/hooks/useErrorMessages";
import { useValidationResolver } from "@/lib/utils";
import { Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { Button } from "@/components/Button";
import { useCheckoutFinalize } from "./useCheckoutFinalize";

export const CheckoutForm = () => {
  const { errorMessages } = useErrorMessages();
  const { checkout } = useCheckout();
  const { checkoutFinalize } = useCheckoutFinalize();

  // TMP
  // const [selectedPaymentProvider, setSelectedPaymentProvider] =
  //   useState<string>();

  const schema = object({
    password: string().required(errorMessages.requiredValue),
    email: string()
      .email(errorMessages.invalidValue)
      .required(errorMessages.requiredValue),
  });

  const resolver = useValidationResolver(schema);
  // will be used for e.g. account creation at checkout finalization
  const methods = useForm<FormData>({
    resolver,
    mode: "onBlur",
    defaultValues: { email: checkout?.email || "" },
  });

  const { setValue, watch, handleSubmit } = methods;

  const handleEmailChange = (value: string) => setValue("email", value);

  return (
    <Suspense fallback="loaden">
      <FormProvider {...methods}>
        <div className="checkout-form">
          <Contact onEmailChange={handleEmailChange} email={watch("email")} />
          <Divider className="mt-4" />
          <UserAddresses />
          <ShippingMethods />
          {/* TMP */}
          {/* <PaymentProviders
            onSelect={setSelectedPaymentProvider}
            selectedValue={selectedPaymentProvider}
          /> */}
          <Button
            ariaLabel="finaliza checkout"
            title="Pay"
            onClick={handleSubmit(checkoutFinalize)}
            className="min-w-28"
          />
        </div>
      </FormProvider>
    </Suspense>
  );
};
