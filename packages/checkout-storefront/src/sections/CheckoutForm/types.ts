import { PaymentProviderID } from "checkout-common";

export interface FormData {
  email: string;
  password: string;
  createAccount: boolean;
  paymentProviderId: PaymentProviderID;
}
