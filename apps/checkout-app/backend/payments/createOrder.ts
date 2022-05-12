import { client } from "@/backend/client";
import {
  OrderCreateDocument,
  OrderCreateMutation,
  OrderCreateMutationVariables,
  OrderFragment,
} from "@/graphql";

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
  const { data, error } = await client
    .mutation<OrderCreateMutation, OrderCreateMutationVariables>(
      OrderCreateDocument,
      { id: checkoutId },
      {
        fetchOptions: {
          headers: {
            "authorization-bearer": process.env.SALEOR_APP_TOKEN || "",
          },
        },
      }
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

  if (data.orderCreateFromCheckout.order.total.gross.amount !== totalAmount) {
    return {
      errors: ["TOTAL_AMOUNT_MISMATCH"],
    };
  }

  // demo.saleor.io
  if (process.env.DEMO_MODE === "true") {
    return {
      data: {
        ...data.orderCreateFromCheckout.order,
        userEmail: "checkout@example.com",
      },
    };
  }

  return { data: data.orderCreateFromCheckout.order };
};
