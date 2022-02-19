import { Divider } from "@components/Divider";
import React from "react";
import { Contact } from "./Contact";

interface CheckoutFormProps {}

const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
  return (
    <div className="checkout-form">
      <Contact />
      <Divider className="my-8" />
    </div>
  );
};

export default CheckoutForm;
