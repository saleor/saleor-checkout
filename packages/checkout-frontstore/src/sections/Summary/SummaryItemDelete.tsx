import { IconButton } from "@/checkout-frontstore/components/IconButton";
import React from "react";
import { CloseIcon as DeleteIcon } from "@/checkout-frontstore/icons";
import {
  CheckoutLineFragment,
  useCheckoutLineDeleteMutation,
} from "@/checkout-frontstore/graphql";
import { useFormattedMessages } from "@/checkout-frontstore/hooks/useFormattedMessages";
import { useCheckout } from "@/checkout-frontstore/hooks/useCheckout";

interface LineItemDeleteProps {
  line: CheckoutLineFragment;
}

export const SummaryItemDelete: React.FC<LineItemDeleteProps> = ({
  line: { id: lineId },
}) => {
  const formatMessage = useFormattedMessages();
  const [, deleteLine] = useCheckoutLineDeleteMutation();
  const { checkout } = useCheckout();

  const handleLineDelete = () =>
    deleteLine({
      checkoutId: checkout.id,
      lineId,
    });

  return (
    <div className="delete-row-button">
      <IconButton
        variant="bare"
        onClick={void handleLineDelete}
        ariaLabel={formatMessage("deleteItemLabel")}
        icon={<img src={DeleteIcon} alt="delete icon" />}
      />
    </div>
  );
};
