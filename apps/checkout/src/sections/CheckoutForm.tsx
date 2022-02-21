import { Divider } from "@components/Divider";
import { RadioGroup } from "@components/RadioGroup";
import React from "react";
import { Contact } from "./Contact";
import { useRadioGroupState } from "@react-stately/radio";

interface CheckoutFormProps {}

const options = [
  {
    title: "International Polish Post - $12.25",
    subtitle: "3-4 business days",
    id: "1",
  },
  {
    title: "DPD standard shipping - $17.25",
    id: "2",
  },
  {
    title: "DPD express shipping - $23.25",
    subtitle: "1-2 business days",
    id: "3",
  },
];
const CheckoutForm: React.FC<CheckoutFormProps> = ({}) => {
  const radioGroupState = useRadioGroupState({});

  return (
    <div className="checkout-form">
      <Contact />
      <Divider className="my-8" />
      <RadioGroup
        label="delivery methods"
        state={radioGroupState}
        options={options}
      />
    </div>
  );
};

export default CheckoutForm;
