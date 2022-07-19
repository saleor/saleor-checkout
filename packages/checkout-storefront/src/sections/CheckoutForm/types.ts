import { PaymentProviderID } from "@saleor/checkout-common";

export interface FormData {
  email: string;
  password: string;
  createAccount: boolean;
  paymentProviderId: PaymentProviderID;
}
