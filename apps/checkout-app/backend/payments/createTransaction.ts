import { client } from "@/graphql/client";
import {
  TransactionCreateDocument,
  TransactionCreateMutation,
  TransactionCreateMutationVariables,
} from "@/graphql";

export const createTransaction = async (
  args: TransactionCreateMutationVariables
) => {
  const { data, error } = await client
    .mutation<TransactionCreateMutation, TransactionCreateMutationVariables>(
      TransactionCreateDocument,
      args,
      {
        fetchOptions: {
          headers: {
            "authorization-bearer": process.env.SALEOR_APP_TOKEN || "",
          },
        },
      }
    )
    .toPromise();

  console.log(data?.transactionCreate?.errors, error);

  if (
    data?.transactionCreate?.transaction?.id &&
    data.transactionCreate.errors.length === 0
  ) {
    return true;
  }

  return false;
};
