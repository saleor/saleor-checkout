import { client } from "@graphql/client";
import {
  OrderCreateDocument,
  OrderCreateMutation,
  OrderCreateMutationVariables,
} from "@graphql";

export const createOrder = async (checkoutId: string, totalAmount: number) => {
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

  console.log("Order id: ", data?.orderCreateFromCheckout?.order?.id);

  if (error) {
    throw error;
  }

  if (!data?.orderCreateFromCheckout?.order) {
    throw Error(
      `Could not create order from checkout. Saleor errors: ${data?.orderCreateFromCheckout?.errors
        .map((e) => e.message)
        .join()}`
    );
  }

  if (data.orderCreateFromCheckout.order.total.gross.amount !== totalAmount) {
    throw Error("Total amount mismatch");
  }

  return data.orderCreateFromCheckout.order;
};
