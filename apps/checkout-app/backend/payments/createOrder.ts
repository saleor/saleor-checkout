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

  console.log(data?.orderFromCheckoutCreate?.errors);

  if (!data?.orderFromCheckoutCreate?.order) {
    throw Error("Checkout does not exist");
  }

  if (data.orderFromCheckoutCreate.order.total.gross.amount !== totalAmount) {
    throw Error("Total amount mismatch");
  }

  return data.orderFromCheckoutCreate.order;
};
