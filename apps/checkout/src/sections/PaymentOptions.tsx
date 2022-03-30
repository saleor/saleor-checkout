import { Title } from "@components/Title";
import { useCheckout } from "@hooks/useCheckout";
import React, { useState } from "react";

interface PaymentOptionsProps {}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({}) => {
  const { checkout } = useCheckout();

  const [selectedOptionId, setSelectedOptionId] = useState();

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
    </div>
  );
};
