import IconButton from "@components/IconButton";
import { MinusIcon, PlusIcon } from "@icons";
import { Text } from "@components/Text";

import React from "react";
import { CheckoutLine } from "./types";
import {
  CheckoutLinesUpdateMutationVariables,
  useCheckoutLinesUpdateMutation,
} from "@graphql";

interface LineItemQuantitySelectorProps {
  line: CheckoutLine;
}

const LineItemQuantitySelector: React.FC<LineItemQuantitySelectorProps> = ({
  line: {
    quantity,
    variant: { id: variantId },
  },
}) => {
  const [{ fetching }, updateLines] = useCheckoutLinesUpdateMutation();

  const getUpdateLineVars = (
    quantity: number
  ): CheckoutLinesUpdateMutationVariables => ({
    token: "f683e21b-7171-460d-96bf-50557b2fb5de",
    lines: [
      {
        quantity,
        variantId,
      },
    ],
  });

  if (fetching) {
    return <div>Updating...</div>;
  }

  return (
    <div className="flex flex-row mb-3">
      <IconButton onClick={() => updateLines(getUpdateLineVars(quantity - 1))}>
        <img src={MinusIcon} alt="remove" />
      </IconButton>
      <Text bold className="mx-3">
        {quantity}
      </Text>
      <IconButton onClick={() => updateLines(getUpdateLineVars(quantity + 1))}>
        <img src={PlusIcon} alt="add" />
      </IconButton>
    </div>
  );
};

export default LineItemQuantitySelector;
