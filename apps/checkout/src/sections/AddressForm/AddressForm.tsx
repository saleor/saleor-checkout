import { useAddressValidationRulesQuery } from "@graphql";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { Text } from "@components/Text";
import React from "react";
import { TextInput, TextInputProps } from "@components/TextInput";
import compact from "lodash/compact";
import { Controller, useForm, UseFormRegisterReturn } from "react-hook-form";
import { AddressField } from "./types";
import { getSortedAddressFields, halfWidthAddressFields } from "./utils";
import clsx from "clsx";

interface AddressFormProps {}

type InputPropsData = Record<
  AddressField,
  Pick<TextInputProps, "label" | "required"> & UseFormRegisterReturn
>;

export const AddressForm: React.FC<AddressFormProps> = ({}) => {
  const formatMessage = useFormattedMessages();

  const { register, handleSubmit, control } = useForm();

  const [{ data }] = useAddressValidationRulesQuery({
    variables: { countryCode: "PL" },
  });

  const { allowedFields, requiredFields } = data?.addressValidationRules || {};

  const sortedAllowedFields = getSortedAddressFields(
    compact(allowedFields as AddressField[])
  );

  const inputPropsData = sortedAllowedFields.reduce(
    (result, fieldId: AddressField) => {
      const required = requiredFields?.includes(fieldId);

      return {
        ...result,
        [fieldId]: {
          label: formatMessage(`${fieldId}TextInputLabel`),
          required,
          ...register(fieldId, { required }),
          className: clsx(
            "mb-3",
            halfWidthAddressFields.includes(fieldId) && "narrow"
          ),
        },
      };
    },
    {} as InputPropsData
  );

  return (
    <div className="mb-8">
      <Text title className="mb-4">
        {formatMessage("shippingAddress")}
      </Text>
      <div className="flex flex-row flex-wrap">
        {sortedAllowedFields.map((fieldId) => (
          <Controller
            control={control}
            name={fieldId}
            render={({ field }) => (
              <TextInput
                {...inputPropsData[fieldId as AddressField]}
                {...field}
              />
            )}
          />
        ))}
      </div>
    </div>
  );
};
