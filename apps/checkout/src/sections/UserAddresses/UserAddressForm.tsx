import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import {
  AddressFragment,
  CountryCode,
  useAddressValidationRulesQuery,
} from "@graphql";
import { useGetInputProps } from "@hooks/useGetInputProps";
import React from "react";
import { useForm } from "react-hook-form";

interface UserAddressFormProps {
  countryCode: CountryCode;
  defaultValues?: any;
  onCancel?: () => void;
  onSave: (formData: AddressFragment) => void;
}

export const UserAddressForm: React.FC<UserAddressFormProps> = ({
  countryCode,
  defaultValues,
  onCancel,
  onSave,
}) => {
  const { handleSubmit, watch, getValues, ...rest } = useForm<FormData>({
    mode: "onBlur",
    defaultValues,
  });

  const getInputProps = useGetInputProps(rest);

  const [{ data }] = useAddressValidationRulesQuery({
    variables: { countryCode },
  });

  const validationRules = data?.addressValidationRules;

  return (
    <div className="lol">
      {validationRules?.allowedFields?.map((field) => (
        <TextInput
          label={field}
          {...getInputProps(field)}
          optional={!validationRules.requiredFields?.includes(field)}
        />
      ))}
      <div className="boo">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} title="cancel" />
        )}
        <Button onClick={handleSubmit(onSave)} title="Save" />
      </div>
    </div>
  );
};
