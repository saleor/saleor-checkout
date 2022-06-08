import { CheckoutLineFragment, OrderLineFragment } from "@/graphql";
import React from "react";
import { Text } from "@saleor/ui-kit";
import { SummaryItemMoneySection } from "./SummaryItemMoneySection";
import { SummaryItemMoneyEditableSection } from "./SummaryItemMoneyEditableSection";
import { SummaryItemDelete } from "./SummaryItemDelete";
import { PhotoIcon } from "@/icons";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { getSummaryLineProps, isCheckoutLine, constructJSONAttributes } from "./utils";

interface LineItemProps {
  line: CheckoutLineFragment | OrderLineFragment;
}

export const SummaryItem: React.FC<LineItemProps> = ({ line }) => {
  const readOnly = !isCheckoutLine(line);
  //Summary Item is used before Paying and after Paying - each time is a different data layout and behavior
  const { productName, productImage, allAttributes } = getSummaryLineProps(line);
  const formatMessage = useFormattedMessages();
  
  //all attributes does not exist after paying

  const priceItem = allAttributes?.filter(attr => attr.name == 'Price Items')[0].richText[0]
 
  console.log(allAttributes)
  const remainingAttributesToDisplay = ['Cabin Grade Name', 'Cabin Grade Description', 
                                        'Deck Code', 'Deck Level', 'Disembark Date', 
                                        'Duration', 'Line Name', 'Ship Name']
  const remainingAttributes: Record<string, any> = {}
  allAttributes?.forEach((attribute) => {
    attribute.name && remainingAttributesToDisplay.includes(attribute.name) ? remainingAttributes[attribute?.name] = attribute.value[0] : 'N/A'
  })

    console.log(remainingAttributes)


  const { breakdownItemsPerPassenger, priceItems }: {breakdownItemsPerPassenger: Record<string, Record<string, any>> | null, priceItems: Record<string, any> | null} = priceItem && constructJSONAttributes(priceItem)

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
            {remainingAttributesToDisplay.map((attr, index) => {
              return <span key={`${attr}-${index}`} style={{display: 'block'}}>{`${attr}: ${remainingAttributes[attr]}`}</span>
            })}
            <br />
            {Object.keys(breakdownItemsPerPassenger).map((passenger, index) => {
              return( <>
                        <span key={`${passenger}-${index}`} style={{display: 'block'}}>
                          {`guest ${passenger} fare: ${breakdownItemsPerPassenger[passenger]['AMCT']['price']}`}
                        </span>
                        <span key={`${passenger}-${index}`} style={{display: 'block'}}>
                          {`guest ${passenger} taxes fees and port expenses: ${breakdownItemsPerPassenger[passenger]['TXFS']['price']}`}
                        </span>
                        <br />
                      </>
                    )
            })}
            <br />
            {`total: ${priceItems['totalFarePrice']}`}
          </Text>
        </div>
        {readOnly && (
          <SummaryItemMoneySection line={line as OrderLineFragment} />
        )}
      </div>
    </li>
  );
};
