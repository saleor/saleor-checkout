import { getClient } from "@/checkout-app/backend/client";
import {
  CheckoutDocument,
  CheckoutQuery,
  CheckoutQueryVariables,
  OrderCreateDocument,
  OrderCreateMutation,
  OrderCreateMutationVariables,
  OrderFragment,
} from "@/checkout-app/graphql";

import { Errors } from "./types";

export const createOrder = async (
  checkoutId: string,
  totalAmount: number
): Promise<
  | {
    data: OrderFragment;
  }
  | {
    errors: Errors;
  }
> => {
  // Start by checking if total amount is correct
  const client = getClient();
  const checkout = await client
    .query<CheckoutQuery, CheckoutQueryVariables>(CheckoutDocument, {
      id: checkoutId,
    })
    .toPromise();

  if (checkout.error) {
    throw checkout.error;
  }

  if (!checkout.data?.checkout) {
    return {
      errors: ["CHECKOUT_NOT_FOUND"],
    };
  }

  if (checkout.data?.checkout?.totalPrice.gross.amount !== totalAmount) {
    return {
      errors: ["TOTAL_AMOUNT_MISMATCH"],
    };
  }

  const { data, error } = await client
    .mutation<OrderCreateMutation, OrderCreateMutationVariables>(
      OrderCreateDocument,
      { id: checkoutId }
    )
    .toPromise();

  if (error) {
    throw error;
  }

  if (!data?.orderCreateFromCheckout?.order) {
    return {
      errors: data?.orderCreateFromCheckout?.errors.map((e) => e.code!) || [
        "COULD_NOT_CREATE_ORDER_FROM_CHECKOUT",
      ],
    };
  }

  return { data: data.orderCreateFromCheckout.order };
};
