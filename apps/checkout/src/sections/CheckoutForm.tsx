import React from "react";

interface CheckoutFormProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
  return (
    <div className="checkout-form" style={{ border: "1px solid red" }}>
      Checkout here
    </div>
  );
};

export default CheckoutForm;
