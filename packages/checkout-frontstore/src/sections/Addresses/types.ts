import { CountryCode } from "@/checkout-frontstore/graphql";
import { AddressField } from "@/checkout-frontstore/lib/globalTypes";

export interface AddressFormData
  extends Omit<
    Record<AddressField, string>,
    "country" | "countryCode" | "name"
  > {
  countryCode: CountryCode;
}

export interface UserAddressFormData extends AddressFormData {
  id: string;
}

export type UserDefaultAddressFragment =
  | null
  | undefined
  | { __typename?: "Address"; id: string };
