import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import { CountryCode, useAddressValidationRulesQuery } from "@graphql";
import { useGetInputProps } from "@hooks/useGetInputProps";
import { AddressField } from "@lib/globalTypes";
import React from "react";
import { useForm } from "react-hook-form";
import { AddressFormData } from "./types";

export interface UserAddressFormData extends AddressFormData {
  id: string;
}

interface UserAddressFormProps {
  countryCode: CountryCode;
  defaultValues?: UserAddressFormData;
  onCancel?: () => void;
  onSave: (formData: UserAddressFormData) => void;
}

export const UserAddressForm: React.FC<UserAddressFormProps> = ({
  countryCode,
  defaultValues,
  onCancel,
  onSave,
}) => {
  const { handleSubmit, watch, getValues, ...rest } =
    useForm<UserAddressFormData>({
      mode: "onBlur",
      defaultValues,
    });

  const getInputProps = useGetInputProps(rest);

  const [{ data }] = useAddressValidationRulesQuery({
    variables: { countryCode },
  });

  const validationRules = data?.addressValidationRules;

  return (
    <div>
      {/* TMP */}
      {(validationRules?.allowedFields as Partial<AddressField>[])?.map(
        (field: AddressField) => (
          <TextInput
            label={field}
            // @ts-ignore TMP
            {...getInputProps(field)}
            optional={!validationRules?.requiredFields?.includes(field)}
          />
        )
      )}
      <div className="boo">
        {onCancel && (
          <Button
            ariaLabel="cancel"
            variant="secondary"
            onClick={onCancel}
            title="cancel"
          />
        )}
        <Button ariaLabel="save" onClick={handleSubmit(onSave)} title="Save" />
      </div>
    </div>
  );
};
