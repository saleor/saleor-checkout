import { CheckoutLine } from "@graphql";
import React from "react";
import kittyCatImg from "@assets/images/kittycat.jpeg";
import { Text } from "@components/Text";
import { SummaryItemMoneySection } from "./SummaryItemMoneySection";
import { SummaryItemDelete } from "./SummaryItemDelete";

interface LineItemProps {
  line: CheckoutLine;
}

export const SummaryItem: React.FC<LineItemProps> = ({ line }) => {
  const {
    variant: {
      name: variantName,
      product: { name: productName },
      media,
    },
  } = line;

  const productImage = media?.find(({ type }) => type === "IMAGE");

  return (
    <li className="flex flex-row px-6 mb-6">
      <div className="relative flex flex-row">
        <SummaryItemDelete line={line} />
        <div className="summary-item-image mr-4 z-1">
          {productImage ? (
            <img
              className="object-contain"
              alt={productImage?.alt}
              src={productImage?.url}
            />
          ) : (
            <img
              className="summary-item-image object-cover"
              alt="product image"
              src={kittyCatImg}
            />
          )}
        </div>
      </div>
      <div className="summary-row w-full">
        <div className="flex flex-col">
          <Text bold className="mb-2">
            {productName}
          </Text>
          <Text>{variantName}</Text>
        </div>
        <SummaryItemMoneySection line={line} />
      </div>
    </li>
  );
};
