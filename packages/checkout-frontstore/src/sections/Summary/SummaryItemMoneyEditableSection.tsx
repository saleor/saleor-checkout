import clsx from "clsx";
import { debounce } from "lodash-es";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { IconButton } from "@/checkout-frontstore/components/IconButton";
import { MinusIcon, PlusIcon } from "@/checkout-frontstore/icons";
import { Text } from "@saleor/ui-kit";
import {
  CheckoutLineFragment,
  CheckoutLinesUpdateMutationVariables,
  useCheckoutLinesUpdateMutation,
} from "@/checkout-frontstore/graphql";
import { useFormattedMessages } from "@/checkout-frontstore/hooks/useFormattedMessages";
import { useFormattedMoney } from "@/checkout-frontstore/hooks/useFormattedMoney";
import { Money } from "@/checkout-frontstore/components/Money";
import { useCheckout } from "@/checkout-frontstore/hooks/useCheckout";
import { useAlerts } from "@/checkout-frontstore/hooks/useAlerts";
import { extractMutationErrors } from "@/checkout-frontstore/lib/utils";

interface LineItemQuantitySelectorProps {
  line: CheckoutLineFragment;
}

interface FormData {
  quantity: number;
}

export const SummaryItemMoneyEditableSection: React.FC<
  LineItemQuantitySelectorProps
> = ({ line }) => {
  const {
    unitPrice,
    undiscountedUnitPrice,
    variant: { id: variantId, pricing },
  } = line;

  const [quantity, setQuantity] = useState(line.quantity);
  const previousQuantity = useRef(line.quantity);
  const [, updateLines] = useCheckoutLinesUpdateMutation();
  const { checkout } = useCheckout();
  const { showErrors, showSuccess } = useAlerts("checkoutLinesUpdate");

  const getUpdateLineVars = ({
    quantity,
  }: FormData): CheckoutLinesUpdateMutationVariables => ({
    checkoutId: checkout.id,
    lines: [
      {
        quantity,
        variantId,
      },
    ],
  });

  const handleSubmit = async ({ quantity }: FormData) => {
    const result = await updateLines(getUpdateLineVars({ quantity }));

    const [hasErrors, errors] = extractMutationErrors(result);

    if (!hasErrors) {
      showSuccess();
      return;
    }

    showErrors(errors);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce((quantity) => handleSubmit({ quantity }), 250),
    []
  );

  useEffect(() => {
    if (quantity === previousQuantity.current) {
      return;
    }

    previousQuantity.current = quantity;

    void debouncedSubmit(quantity);
  }, [quantity, debouncedSubmit]);

  const piecePrice = unitPrice.gross;
  const formatMessage = useFormattedMessages();
  const formattedPiecePrice = useFormattedMoney(piecePrice);

  const multiplePieces = quantity > 1;

  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-row mb-3">
        <IconButton
          variant="bare"
          ariaLabel={formatMessage("addItemQuantityLabel")}
          onClick={() => {
            setQuantity(quantity - 1);
          }}
          icon={<img src={MinusIcon} alt="remove" />}
        />
        <Text weight="bold" className="mx-3">
          {quantity}
        </Text>
        <IconButton
          variant="bare"
          ariaLabel={formatMessage("subtractItemQuantityLabel")}
          onClick={() => {
            setQuantity(quantity + 1);
          }}
          icon={<img src={PlusIcon} alt="add" />}
        />
      </div>
      <div className="flex flex-row justify-end">
        {pricing?.onSale && (
          <Money
            ariaLabel={formatMessage("undiscountedPriceLabel")}
            money={{
              currency: undiscountedUnitPrice.currency,
              amount: undiscountedUnitPrice.amount * quantity,
            }}
            className="line-through mr-1"
          />
        )}
        <Money
          ariaLabel={formatMessage("totalPriceLabel")}
          money={{
            currency: piecePrice?.currency as string,
            amount: (piecePrice?.amount || 0) * quantity,
          }}
          weight="bold"
          className={clsx({
            "text-text-error": pricing?.onSale,
          })}
        />
      </div>
      {multiplePieces && (
        <Text
          aria-label={formatMessage("singlePiecePriceLabel")}
          size="sm"
          color="secondary"
          className="ml-4"
        >
          {`${formattedPiecePrice} ${formatMessage("each")}`}
        </Text>
      )}
    </div>
  );
};
