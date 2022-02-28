export type SettingType = "string" | "color";

/**
 * Payment types
 */
export type PaymentMethodID =
  | "payment-method-1"
  | "payment-method-2"
  | "payment-method-3";
export interface PaymentMethod {
  id: PaymentMethodID;
  name: string;
}

export type PaymentProviderID = "mollie" | "example";
export type MollieProviderSettingID = "partner-id" | "live-test-api-key";
export type ExampleProviderSettingID = "key-1" | "key-2";
export type PaymentProviderSettingID<P extends PaymentProviderID> =
  P extends "mollie"
    ? MollieProviderSettingID
    : P extends "example"
    ? ExampleProviderSettingID
    : never;

export interface PaymentProviderSettings<P extends PaymentProviderID> {
  id: PaymentProviderSettingID<P>;
  label: string;
  type: SettingType;
  value?: string;
}
export interface PaymentProvider<P extends PaymentProviderID> {
  id: P;
  label: string;
  settings: PaymentProviderSettings<P>[];
}

/**
 * Customization types
 */
export type CustomizationID = "branding" | "product-settings";
export type BrandingCustomizationSettingID =
  | "active"
  | "text"
  | "bg"
  | "error"
  | "success";
export type ProductCustomizationSettingID = "low-stock-threshold";
export type CustomizationSettingID<P extends CustomizationID> =
  P extends "branding"
    ? BrandingCustomizationSettingID
    : P extends "product-settings"
    ? ProductCustomizationSettingID
    : never;

export interface CustomizationSettings<P extends CustomizationID> {
  id: CustomizationSettingID<P>;
  label: string;
  type: SettingType;
  value?: string;
}
export interface Customization<P extends CustomizationID> {
  id: P;
  label: string;
  settings: CustomizationSettings<P>[];
}
