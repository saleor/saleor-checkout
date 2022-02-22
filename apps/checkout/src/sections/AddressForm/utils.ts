import { AddressField } from "./types";

const addressFieldsOrder: AddressField[] = [
  "name",
  "companyName",
  "streetAddress1",
  "streetAddress2",
  "city",
  "postalCode",
];

export const halfWidthAddressFields: AddressField[] = [
  "companyName",
  "city",
  "postalCode",
];

export const getSortedAddressFields = (addressFields: AddressField[] = []) =>
  addressFieldsOrder.reduce((result, orderedAddressField) => {
    if (!addressFields.includes(orderedAddressField)) {
      return result;
    }

    return [...result, orderedAddressField];
  }, [] as AddressField[]);
