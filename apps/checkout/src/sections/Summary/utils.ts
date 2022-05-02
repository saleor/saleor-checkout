import { Money } from "@/graphql";

export const getTaxPercentage = (taxCost: Money, totalPrice: Money): string => {
  if (!totalPrice || !taxCost) {
    return (0).toFixed(2);
  }

  return (taxCost.amount / totalPrice.amount).toFixed(2);
};
