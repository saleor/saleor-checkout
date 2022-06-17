import {
  CheckoutLineFragment,
  Money,
  OrderLineFragment,
} from "@/checkout/graphql";

export const getTaxPercentage = (taxCost: Money, totalPrice: Money): string => {
  if (!totalPrice?.amount || !taxCost?.amount) {
    return (0).toFixed(2);
  }

  return (taxCost.amount / totalPrice.amount).toFixed(2);
};

export const isCheckoutLine = (
  line: CheckoutLineFragment | OrderLineFragment
): line is CheckoutLineFragment => line.__typename === "CheckoutLine";

export const getThumbnailFromLine = (line: CheckoutLineFragment) =>
  line.variant.media?.find(({ type }) => type === "IMAGE") ||
  line.variant.product.media?.find(({ type }) => type === "IMAGE");

export const getSummaryLineProps = (
  line: OrderLineFragment | CheckoutLineFragment
) =>
  isCheckoutLine(line)
    ? {
        variantName: line.variant.name,
        productName: line.variant.product.name,
        productImage: getThumbnailFromLine(line),
        allAttributes: line.variant.attributes.map((attribute) => {
          return {
            name: attribute.attribute.name,
            value: attribute.values.map(valueObj => valueObj.name ),
            richText: attribute.values.map(valueObj => valueObj.richText ),
          }
        })
        
      }
    : {
        variantName: line.variantName,
        productName: line.productName,
        productImage: line.thumbnail,
        allAttributes: line.variant.attributes.map((attribute) => {
          return {
            name: attribute.attribute.name,
            value: attribute.values.map(valueObj => valueObj.name ),
            richText: attribute.values.map(valueObj => valueObj.richText ),
          }
        })
      };


type BreakdownItem = {
  code: string
  currency: string
  description: string
  fareType: string
  name: string
  passengerNumber: string
  price: string
  __typename: string
}

export const constructJSONAttributes = (
  (priceItemRichText: string): any => {

  const priceItemJSON = JSON.parse(priceItemRichText ? priceItemRichText : "{}")

  if(priceItemJSON){
    //priceItem full information is parsed through rich text attribute from query
    console.log(JSON.parse(priceItemJSON.blocks[0].data.text))
    const priceItemDataJSON = JSON.parse(priceItemJSON.blocks[0].data.text)
   
    const nbOfGuests = priceItemDataJSON.breakdownItems.filter((breakdown: BreakdownItem) => breakdown.code === 'AMCT').length
    console.log(nbOfGuests)

    //full breakdown of each single passenger for easy accessibility and easy display
    const breakdownItems: any = {}
    let breakdownPerPassenger: Record<string, any> = {}
    for(let i = 1; i <= nbOfGuests; i++){
      priceItemDataJSON.breakdownItems.filter((breakdown: BreakdownItem) => 
        parseInt(breakdown.passengerNumber) === i
      ).forEach((breakdown: BreakdownItem) => 
        breakdownPerPassenger[breakdown.code] = {
          code: breakdown.code,
          currency: breakdown.currency,
          description: breakdown.description,
          fareType: breakdown.fareType,
          name: breakdown.name,
          passengerNumber: breakdown.passengerNumber,
          price: breakdown.price,
          __typename: breakdown.__typename
        }
      )
      breakdownItems[i] = breakdownPerPassenger
      breakdownPerPassenger = {}
    }
    
    console.log(breakdownItems)

    return {
      breakdownItemsPerPassenger: breakdownItems,
      priceItems: priceItemDataJSON,
    }
  } else {
    return {
    breakdownItemsPerPassenger: null,
    priceItems: null,
  }
}
})

