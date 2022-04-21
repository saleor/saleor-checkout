import { client } from "@/graphql/client";
import {
  TransactionUpdateDocument,
  TransactionUpdateMutation,
  TransactionUpdateMutationVariables,
} from "@/graphql";

export const updateTransaction = async (
  args: TransactionUpdateMutationVariables
) => {
  const { data, error } = await client
    .mutation<TransactionUpdateMutation, TransactionUpdateMutationVariables>(
      TransactionUpdateDocument,
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

  console.log(data?.transactionUpdate?.errors, error);

  if (
    data?.transactionUpdate?.transaction?.id &&
    data.transactionUpdate.errors.length === 0
  ) {
    return true;
  }

  return false;
};
