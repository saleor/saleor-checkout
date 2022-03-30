import { client } from "@graphql/client";
import {
  OrderCreateDocument,
  OrderCreateMutation,
  OrderCreateMutationVariables,
} from "@graphql";

export const createOrder = async (checkoutId: string, totalAmount: number) => {
  const { data } = await client
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

  if (!data?.orderCreateFromCheckout?.order) {
    throw Error("Checkout does not exist");
  }

  if (data.orderCreateFromCheckout.order.total.gross.amount !== totalAmount) {
    throw Error("Total amount mismatch");
  }

  return data.orderCreateFromCheckout.order;
};
