import { ChannelFragment } from "@/graphql";
import {
  CustomizationID,
  CustomizationSettingID,
  PaymentMethod,
  PaymentMethodID,
  PaymentProvider,
  PaymentProviderID,
  PaymentProviderSettingID,
  PrivateSettingID,
  PublicSettingID,
  SettingsType,
} from "./common";

export interface Encrypted<T> {
  encrypted: T;
}
export type EncryptionType = "encrypted" | "unencrypted";
export type SettingsField<E extends EncryptionType> = E extends "unencrypted"
  ? string | undefined
  : string | Encrypted<string>;

export interface PaymentOption {
  id: string;
  method: PaymentMethod;
  availableProviders: PaymentProvider<PaymentProviderID>[];
  activeProvider: PaymentProvider<PaymentProviderID> | null;
}
export interface ChannelPaymentOptions {
  id: string;
  channel: ChannelFragment;
  paymentOptions: PaymentOption[];
}

export type ChannelActivePaymentProviders = {
  [P in string]: {
    [K in PaymentMethodID]: PaymentProviderID | "";
  };
};
export type ChannelActivePaymentProvidersByChannel = {
  [P in PaymentMethodID]: PaymentProviderID | "";
};
export type PaymentProviderSettingsValues<E extends EncryptionType> = {
  [P in PaymentProviderID]: E extends "unencrypted"
    ? Partial<{
        [K in PaymentProviderSettingID<P>]: SettingsField<"unencrypted">;
      }>
    : {
        [K in PaymentProviderSettingID<P>]: SettingsField<"encrypted">;
      };
};
export type CustomizationSettingsValues = {
  [P in CustomizationID]: {
    [K in CustomizationSettingID<P>]: SettingsField<"unencrypted">;
  };
};
export type UnknownSettingsValues<E extends EncryptionType> = {
  [P in string]: E extends "unencrypted"
    ? Partial<{
        [K in string]: SettingsField<"unencrypted">;
      }>
    : {
        [K in string]: SettingsField<"encrypted">;
      };
};

export type PublicSettingsValues = {
  [P in PublicSettingID[number]]: P extends "customizations"
    ? CustomizationSettingsValues
    : P extends "channelActivePaymentProviders"
    ? ChannelActivePaymentProviders
    : UnknownSettingsValues<"unencrypted">;
};
export type PrivateSettingsValues<E extends EncryptionType> = {
  [P in PrivateSettingID[number]]: P extends "paymentProviders"
    ? PaymentProviderSettingsValues<E>
    : UnknownSettingsValues<E>;
};
export type SettingsValues<
  T extends SettingsType,
  E extends EncryptionType
> = T extends "public" ? PublicSettingsValues : PrivateSettingsValues<E>;
