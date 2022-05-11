import { intersection, uniq } from "lodash-es";
import { AddressField, ApiAddressField } from "../globalTypes";

export type AddressFieldsOrder = Array<AddressField | AddressField[]>;

const addressFieldsOrder: AddressFieldsOrder = [
  ["firstName", "lastName"],
  "companyName",
  "phone",
  "streetAddress1",
  "streetAddress2",
  ["city", "postalCode"],
  "cityArea",
  "countryArea",
];

// api doesn't approve of "name" so we replace it with "firstName"
// and "lastName"
export const getFilteredAddressFields = (
  addressFields: ApiAddressField[]
): AddressField[] => {
  const filteredAddressFields = addressFields.filter(
    (addressField: ApiAddressField) => addressField !== "name"
  ) as AddressField[];

  return uniq([...filteredAddressFields, "firstName", "lastName"]);
};

// api doesn't order the fields but we want to
export const getSortedAddressFields = (addressFields: AddressField[] = []) => {
  const filteredAddressFields = getFilteredAddressFields(addressFields);

  return addressFieldsOrder.reduce((result, orderedAddressField) => {
    const isFieldRow = Array.isArray(orderedAddressField);

    const shouldIncludeAddressField = isFieldRow
      ? !!intersection(filteredAddressFields, orderedAddressField).length
      : filteredAddressFields.includes(orderedAddressField as AddressField);

    if (shouldIncludeAddressField) {
      return [...result, orderedAddressField];
    }

    return result;
  }, [] as AddressFieldsOrder);
};

export const getSortedAddressFieldsFromAddress = (
  address: Partial<Record<AddressField, any>>
) => getSortedAddressFields(Object.keys(address) as AddressField[]);

export const getRequiredAddressFields = (
  requiredFields: AddressField[]
): AddressField[] => [...requiredFields, "firstName", "lastName"];
