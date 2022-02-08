import IconButton from "@components/IconButton";
import React from "react";
import { CloseIcon as DeleteIcon } from "@icons";
import { CheckoutLine } from "./types";
import { useCheckoutLineDeleteMutation } from "@graphql";

interface LineItemDeleteProps {
  line: CheckoutLine;
}

const LineItemDelete: React.FC<LineItemDeleteProps> = ({
  line: { id: lineId },
}) => {
  const [{ fetching }, deleteLine] = useCheckoutLineDeleteMutation();

  const handleLineDelete = () => {};
  // deleteLine({
  //   token: "f683e21b-7171-460d-96bf-50557b2fb5de",
  //   lineId,
  // });

  return (
    <div className="delete-row-button">
      <IconButton className="z-50" onClick={handleLineDelete}>
        <img src={DeleteIcon} />
      </IconButton>
    </div>
  );
};

export default LineItemDelete;
