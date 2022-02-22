import { useAddressValidationRulesQuery } from "@graphql";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { Text } from "@components/Text";
import React from "react";
import { TextInput, TextInputProps } from "@components/TextInput";
import compact from "lodash/compact";
import { Controller, useForm, UseFormRegisterReturn } from "react-hook-form";
import { AddressField } from "./types";
import {
  getAddressFieldsRows,
  getSortedAddressFields,
  shouldHaveHorizontalSpacing,
} from "./utils";
import clsx from "clsx";

interface AddressFormProps {
  onSubmit: () => void;
}

type AddressFieldsPropsData = Record<
  AddressField,
  Pick<TextInputProps, "label" | "required"> & UseFormRegisterReturn
>;

export const AddressForm: React.FC<AddressFormProps> = ({}) => {
  const formatMessage = useFormattedMessages();

  const { register, /* handleSubmit ,*/ control } = useForm();

  const [{ data }] = useAddressValidationRulesQuery({
    variables: { countryCode: "PL" },
  });

  const { allowedFields, requiredFields } = data?.addressValidationRules || {};

  const sortedAllowedFields = getSortedAddressFields(
    compact(allowedFields as AddressField[])
  );

  const addressFieldsRows = getAddressFieldsRows(sortedAllowedFields);

  const addressFieldsProps = sortedAllowedFields.reduce(
    (result, fieldId: AddressField) => {
      const required = requiredFields?.includes(fieldId);

      const classes = clsx(
        "mb-3",
        shouldHaveHorizontalSpacing(addressFieldsRows, fieldId) &&
          "narrow-address-field-left-col"
      );

      const newFieldData = {
        label: formatMessage(`${fieldId}TextInputLabel`),
        required,
        ...register(fieldId, { required }),
        className: classes,
      };

      return {
        ...result,
        [fieldId]: newFieldData,
      };
    },
    {} as AddressFieldsPropsData
  );

  return (
    <div className="mb-8">
      <Text title className="mb-4">
        {formatMessage("shippingAddress")}
      </Text>
      <div className="flex flex-col">
        {addressFieldsRows.map((rowAddressFields: AddressField[]) => (
          <div className="address-form-row">
            {rowAddressFields.map((fieldId: AddressField) => (
              <Controller
                control={control}
                name={fieldId}
                render={({ field }) => (
                  <TextInput
                    {...addressFieldsProps[fieldId as AddressField]}
                    {...field}
                  />
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
