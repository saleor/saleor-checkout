import { CheckoutLine } from "@graphql";
import React, { Suspense } from "react";
import kittyCatImg from "@assets/images/kittycat.jpeg";
import { Text } from "@components/Text";
import clsx from "clsx";
import { Money } from "@components/Money";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { useFormattedMoney } from "@hooks/useFormattedMoney";
import LineItemQuantitySelector from "./LineItemQuantitySelector";
import LineItemDelete from "./LineItemDelete";

interface LineItemProps {
  line: CheckoutLine;
}

export const LineItem: React.FC<LineItemProps> = ({ line }) => {
  const {
    quantity,
    totalPrice,
    variant: {
      pricing,
      name: variantName,
      product: { name: productName },
      media,
    },
  } = line;

  const formatMessage = useFormattedMessages();
  const formattedPiecePrice = useFormattedMoney(pricing?.price?.gross);

  const productImage = media?.find(({ type }) => type === "IMAGE");

  const multiplePieces = quantity > 1;

  return (
    <div className="h-18 summary-row mb-6">
      <div className="relative flex flex-row">
        <LineItemDelete line={line} />
        <div className="h-18 w-18 mr-4 z-1">
          {productImage ? (
            <img
              className="object-contain"
              alt={productImage?.alt}
              src={productImage?.url}
            />
          ) : (
            <img
              className="h-18 w-18 object-cover"
              alt="product image"
              src={kittyCatImg}
            />
          )}
        </div>
        <div className="flex flex-col">
          <Text bold className="mb-2">
            {productName}
          </Text>
          <Text>{variantName}</Text>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Suspense fallback="Loading lol xD">
          <LineItemQuantitySelector line={line} />
        </Suspense>
        <div className="flex flex-row justify-end">
          {pricing?.onSale && (
            <Money
              money={{
                currency: pricing?.priceUndiscounted?.gross?.currency as string,
                amount: pricing?.priceUndiscounted?.gross?.amount * quantity,
              }}
              className="line-through mr-1"
            />
          )}
          <Money
            money={totalPrice?.gross}
            bold
            className={clsx({
              "text-text-error": pricing?.onSale,
            })}
          />
        </div>
        {multiplePieces && (
          <Text size="sm" color="secondary" className="ml-4">
            {`${formattedPiecePrice} ${formatMessage("each")}`}
          </Text>
        )}
      </div>
    </div>
  );
};
