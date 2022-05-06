import { client } from "@/backend/client";
import {
  PaymentCreateDocument,
  PaymentCreateMutation,
  PaymentCreateMutationVariables,
} from "@/graphql";

export const createPayment = async (args: PaymentCreateMutationVariables) => {
  const { data, error } = await client
    .mutation<PaymentCreateMutation, PaymentCreateMutationVariables>(
      PaymentCreateDocument,
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

  console.log(data?.paymentCreate?.errors, error);

  if (
    data?.paymentCreate?.payment?.id &&
    data.paymentCreate.errors.length === 0
  ) {
    return true;
  }

  return false;
};
