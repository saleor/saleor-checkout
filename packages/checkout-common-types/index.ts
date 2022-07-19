import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export type SettingType = "string" | "color" | "image";

export type IconComponent = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

/**
 * Payment types
 */
export type PaymentMethodID = "creditCard" | "applePay" | "paypal";
export interface PaymentMethod {
  id: PaymentMethodID;
  name: string;
  logo?: IconComponent;
}
export type PaymentProviderID = "mollie" | "adyen";
export type MollieProviderSettingID = "profileId" | "apiKey";
export type AdyenProviderSettingID =
  | "merchantAccount"
  | "hmac"
  | "username"
  | "password"
  | "apiKey"
  | "clientKey";

export type PaymentProviderSettingID<P extends PaymentProviderID> =
  P extends "mollie"
    ? MollieProviderSettingID
    : P extends "adyen"
    ? AdyenProviderSettingID
    : never;

export interface PaymentProviderSettings<P extends PaymentProviderID> {
  id: PaymentProviderSettingID<P>;
  label: string;
  type: SettingType;
  value?: string;
  encrypt: boolean;
}

export interface PaymentProvider<P extends PaymentProviderID> {
  id: P;
  label: string;
  logo?: IconComponent;
  settings: PaymentProviderSettings<P>[];
}

/**
 * payments api
 */
type BaseBody = {
  checkoutApiUrl: string;
  provider: PaymentProviderID;
  redirectUrl: string;
  // captureAmount?: number; // support for partial payments
};

export type OrderBody = {
  orderId: string;
} & BaseBody;

export type CheckoutBody = {
  checkoutId: string;
  totalAmount: number;
} & BaseBody;

export type PayRequestBody = OrderBody | CheckoutBody;

export type PaymentStatusResponse = {
  status: "PAID" | "PENDING" | "UNPAID";
  sessionLink?: string;
};

export type ChannelActivePaymentProvidersByChannel = {
  [P in PaymentMethodID]: PaymentProviderID | "";
};
