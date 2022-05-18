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
export type PaymentProviderSettingsValues = {
  [P in PaymentProviderID]: {
    [K in PaymentProviderSettingID<P>]: string | Encrypted<string>;
  };
};
export type CustomizationSettingsValues = {
  [P in CustomizationID]: {
    [K in CustomizationSettingID<P>]: string | Encrypted<string>;
  };
};
export type UnknownSettingsValues<T = string | Encrypted<string>> = {
  [P in string]: {
    [K in string]: T;
  };
};

export type PublicSettingsValues = {
  [P in PublicSettingID[number]]: P extends "customizations"
    ? CustomizationSettingsValues
    : P extends "channelActivePaymentProviders"
    ? ChannelActivePaymentProviders
    : UnknownSettingsValues;
};
export type PrivateSettingsValues = {
  [P in PrivateSettingID[number]]: P extends "paymentProviders"
    ? PaymentProviderSettingsValues
    : UnknownSettingsValues;
};
export type SettingsValues<T extends SettingsType> = T extends "public"
  ? PublicSettingsValues
  : PrivateSettingsValues;
