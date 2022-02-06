import { ProductMediaType } from "@graphql";

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
