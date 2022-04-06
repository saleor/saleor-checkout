import { client } from "@/graphql/client";
import {
  OrderCreateDocument,
  OrderCreateMutation,
  OrderCreateMutationVariables,
  OrderFragment,
} from "@/graphql";

export const createOrder = async (
  checkoutId: string,
  totalAmount: number
): Promise<
  | {
      data: OrderFragment;
    }
  | {
      errors: string[];
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

  return { data: data.orderCreateFromCheckout.order };
};
