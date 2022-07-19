import { PaymentProviderID } from "@saleor/checkout-common-types";

export interface FormData {
  email: string;
  password: string;
  createAccount: boolean;
  paymentProviderId: PaymentProviderID;
}
