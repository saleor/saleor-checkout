import { ProductMediaType } from "@graphql";
import React from "react";
import kittyCatImg from "@assets/images/kittycat.jpeg";
import { Text } from "@components/Text";
import { PlusIcon, MinusIcon } from "@assets/icons";
import clsx from "clsx";
import { Money } from "@components/Money";
import { useFormattedMessages } from "@lib/messages";
import { useFormattedMoney } from "@lib/money";

export type CheckoutLine = {
  __typename?: "CheckoutLine";
  id: string;
  quantity: number;
  totalPrice?: {
    __typename?: "TaxedMoney";
    gross: { __typename?: "Money"; currency: string; amount: number };
  } | null;
  variant: {
    __typename?: "ProductVariant";
    name: string;
    pricing?: {
      __typename?: "VariantPricingInfo";
      onSale?: boolean | null;
      price?: {
        __typename?: "TaxedMoney";
        gross: { __typename?: "Money"; currency: string; amount: number };
      } | null;
      priceUndiscounted?: {
        __typename?: "TaxedMoney";
        gross: { __typename?: "Money"; currency: string; amount: number };
      } | null;
    } | null;
    product: { __typename?: "Product"; name: string };
    media?: Array<{
      __typename?: "ProductMedia";
      alt: string;
      url: string;
      type: ProductMediaType;
    }> | null;
  };
};

interface CheckoutLineItemProps {
  line: CheckoutLine;
}

export const CheckoutLineItem: React.FC<CheckoutLineItemProps> = ({ line }) => {
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
    <div className="h-18 flex flex-row justify-between mb-6">
      <div className="flex flex-row">
        <div className="h-18 w-18 mr-4">
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
        <div className="flex flex-row mb-3">
          <img src={PlusIcon} alt="add" />
          <Text bold className="mx-3">
            {quantity}
          </Text>
          <img src={MinusIcon} alt="remove" />
        </div>
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
