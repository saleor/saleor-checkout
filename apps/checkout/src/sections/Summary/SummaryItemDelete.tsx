import { IconButton } from "@/components/IconButton";
import React from "react";
import { CloseIcon as DeleteIcon } from "@/icons";
import { CheckoutLine, useCheckoutLineDeleteMutation } from "@/graphql";
import { getDataWithToken } from "@/lib/utils";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { useEnvContext } from "@/providers/EnvProvider";

interface LineItemDeleteProps {
  line: CheckoutLine;
}

export const SummaryItemDelete: React.FC<LineItemDeleteProps> = ({
  line: { id: lineId },
}) => {
  const formatMessage = useFormattedMessages();
  const [, deleteLine] = useCheckoutLineDeleteMutation();
  const envContext = useEnvContext();

  const handleLineDelete = () =>
    deleteLine(
      getDataWithToken(envContext, {
        lineId,
      })
    );

  return (
    <div className="delete-row-button">
      <IconButton
        onClick={handleLineDelete}
        ariaLabel={formatMessage("deleteItemLabel")}
      >
        <img src={DeleteIcon} alt="delete icon" />
      </IconButton>
    </div>
  );
};
