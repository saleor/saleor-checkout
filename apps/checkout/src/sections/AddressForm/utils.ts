import { dropRight, last } from "lodash";
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

// some fields should ideally be full width and others shouldn't.
// this is only "ideally" because with dynamic forms this can be
// overriden because of the fields order
export const isFullWidthAddressField = (fieldId: AddressField) =>
  !halfWidthAddressFields.includes(fieldId);

// api doesn't order the fields but we want to
export const getSortedAddressFields = (addressFields: AddressField[] = []) =>
  addressFieldsOrder.reduce((result, orderedAddressField) => {
    if (!addressFields.includes(orderedAddressField)) {
      return result;
    }

    return [...result, orderedAddressField];
  }, [] as AddressField[]);

// need to dynamically devide inputs into rows to later style them correctly
export const getAddressFieldsRows = (sortedAddressFields: AddressField[]) =>
  sortedAddressFields.reduce((result, addressField: AddressField, index) => {
    const prevField = sortedAddressFields[index - 1];
    const prevRow = last(result) || [];
    const isPrevFieldFullWidth = isFullWidthAddressField(prevField);
    const isLastRowFull = prevRow.length > 1;

    if (
      !prevField ||
      isFullWidthAddressField(addressField) ||
      isPrevFieldFullWidth ||
      isLastRowFull
    ) {
      return [...result, [addressField]];
    }

    const resultWithoutLastRow = dropRight(result, 1);
    const lastRow = [...prevRow, addressField];

    return [...resultWithoutLastRow, lastRow];
  }, [] as Array<AddressField[]>);

// because the form is dynamic we need to assign
// spacing based on order
export const shouldHaveHorizontalSpacing = (
  addressFieldsRows: AddressField[][],
  fieldId: AddressField
) =>
  addressFieldsRows.some((row: AddressField[]) => {
    if (!row.includes(fieldId)) {
      return false;
    }

    return row.length > 1 && row[0] === fieldId;
  });
