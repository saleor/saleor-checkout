import { Channel } from "api/saleor/types";
import { PaymentMethod, PaymentProvider } from "types";

export interface PaymentOption {
  id: string;
  method: PaymentMethod;
  availableProviders: PaymentProvider[];
  activeProvider: PaymentProvider | null;
}
export interface ChannelPaymentOptions {
  id: string;
  channel: Channel;
  paymentOptions: PaymentOption[];
}
export interface DesignOption {
  id: string;
  name: string;
}
