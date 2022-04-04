import { Button } from "@components/Button";
import { Title } from "@components/Title";
import { useCheckout } from "@hooks/useCheckout";
import React, { useState } from "react";

interface PaymentOptionsProps {}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({}) => {
  const { checkout } = useCheckout();

  const [selectedOptionId, setSelectedOptionId] = useState();

  const finalizeCheckout = async () => {
    const result = await fetch(
      "https://saleor-checkout-app-git-payments-app-saleorcommerce.vercel.app/api/pay",
      {
        method: "POST",
        body: JSON.stringify({
          provider: "mollie",
          checkoutId: checkout?.id,
          totalAmount: checkout?.totalPrice?.gross?.amount,
        }),
      }
    );
    console.log(666, result.json());
  };

  return (
    <div>
      <Title className="mb-4">Payment options</Title>
      {checkout?.availablePaymentGateways?.map(({ id, name }) => (
        <div>
          <input
            type="radio"
            className="mr-2 mt-1"
            checked={selectedOptionId === id}
            onChange={() => setSelectedOptionId(id)}
          />
          <label>{name}</label>
        </div>
      ))}
      <Button title="Pay" onClick={finalizeCheckout} />
    </div>
  );
};
