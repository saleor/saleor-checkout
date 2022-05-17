import { client } from "@/backend/client";
import {
  OrderTransactionsDocument,
  OrderTransactionsQuery,
  OrderTransactionsQueryVariables,
} from "@/graphql";

export const getOrderTransactions = async (
  args: OrderTransactionsQueryVariables
) => {
  const { data, error } = await client
    .mutation<OrderTransactionsQuery, OrderTransactionsQueryVariables>(
      OrderTransactionsDocument,
      args
    )
    .toPromise();

  console.log(data?.order?.errors, error);

  if (data?.order?.errors.length === 0) {
    return data.order.transactions;
  }

  return [];
};
