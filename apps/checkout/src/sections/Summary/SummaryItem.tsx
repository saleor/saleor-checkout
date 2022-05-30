import { CheckoutLineFragment, OrderLineFragment } from "@/graphql";
import React from "react";
import { Text } from "@saleor/ui-kit";
import { SummaryItemMoneySection } from "./SummaryItemMoneySection";
import { SummaryItemMoneyEditableSection } from "./SummaryItemMoneyEditableSection";
import { SummaryItemDelete } from "./SummaryItemDelete";
import { PhotoIcon } from "@/icons";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { getSummaryLineProps, isCheckoutLine } from "./utils";

interface LineItemProps {
  line: CheckoutLineFragment | OrderLineFragment;
}

export const SummaryItem: React.FC<LineItemProps> = ({ line }) => {
  const readOnly = !isCheckoutLine(line);
  const { productName, productImage, allAttributes } = getSummaryLineProps(line);

  const formatMessage = useFormattedMessages();
  console.log(allAttributes)
  const fieldsToDisplayValue = ['Embark Date', 'Disembark Date', 'Duration', 'Rate Code', 'Ship Name']
  const fieldsToDisplayRichText = ['Price Items']
  const attributesToDisplay: Record<string, any> = {}
  allAttributes?.forEach((attribute) => {
    attribute.name && fieldsToDisplayValue.includes(attribute.name) ? attributesToDisplay[attribute?.name] = attribute.value[0] : 'N/A'
  })
  const priceItem = allAttributes?.filter(attr => attr.name == 'Price Items')[0].richText[0]
  const priceItemJSON = JSON.parse(priceItem ? priceItem : "{}")
  console.log(JSON.parse(priceItemJSON.blocks[0].data.text))
  return (
    <li className="flex flex-row px-6 mb-6">
      <div className="relative flex flex-row">
        {!readOnly && <SummaryItemDelete line={line as CheckoutLineFragment} />}
        <div className="summary-item-image mr-4 z-1">
          {productImage ? (
            <img
              className="object-contain"
              alt={productImage?.alt || undefined}
              src={productImage?.url}
            />
          ) : (
            <img
              className="object-cover"
              alt="product placeholder"
              src={PhotoIcon}
            />
          )}
        </div>
      </div>
      <div className="summary-row w-full">
        <div className="flex flex-col">
          <Text
            weight="bold"
            aria-label={formatMessage("itemNameLabel")}
            className="mb-2"
          >
            {productName}
          </Text>
          <Text aria-label={formatMessage("variantNameLabel")}>
            PlaceHolder
          </Text>
        </div>
        {readOnly && (
          <SummaryItemMoneySection line={line as OrderLineFragment} />
        )}
      </div>
    </li>
  );
};
