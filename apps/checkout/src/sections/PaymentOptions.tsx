import { Button } from "@components/Button";
import { useCheckout } from "@hooks/useCheckout";
import React from "react";

interface PaymentOptionsProps {}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({}) => {
  const { checkout } = useCheckout();

  const finalizeCheckout = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_CHECKOUT_APP_URL}/pay`,
      {
        method: "POST",
        body: JSON.stringify({
          provider: "mollie",
          checkoutId: checkout?.id,
          totalAmount: checkout?.totalPrice?.gross?.amount,
        }),
      }
    );

    const { data } = await result.json();

    if (data?.checkoutUrl) {
      window.location.replace(data.checkoutUrl);
    }
  };

  return (
    <div className="mb-10">
      <Button
        ariaLabel="finaliza checkout"
        title="Pay"
        onClick={finalizeCheckout}
        className="min-w-28"
      />
    </div>
  );
};
