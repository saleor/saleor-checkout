import { getClient } from "@/saleor-app-checkout/backend/client";
import {
  OrderTransactionsDocument,
  OrderTransactionsQuery,
  OrderTransactionsQueryVariables,
} from "@/saleor-app-checkout/graphql";

export const getOrderTransactions = async (
  args: OrderTransactionsQueryVariables
) => {
  const { data, error } = await getClient()
    .query<OrderTransactionsQuery, OrderTransactionsQueryVariables>(
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
