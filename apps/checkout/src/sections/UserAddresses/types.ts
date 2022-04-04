import { AddressField } from "@lib/globalTypes";

export type AddressFormData = Omit<Record<AddressField, string>, "country">;
