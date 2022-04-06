import { Button } from "@components/Button";
import { useCheckout } from "@hooks/useCheckout";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import React from "react";
import { pay } from "./requests";

interface PaymentOptionsProps {}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({}) => {
  const formatMessage = useFormattedMessages();
  const { checkout } = useCheckout();

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
    <div className="mb-10 flex flex-row justify-end">
      <Button
        ariaLabel={formatMessage("finalizeCheckoutLabel")}
        title="Pay"
        onClick={finalizeCheckout}
        className="min-w-28"
      />
    </div>
  );
};
