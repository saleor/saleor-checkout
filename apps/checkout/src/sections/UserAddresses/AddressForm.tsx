import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { CountryCode, useAddressValidationRulesQuery } from "@/graphql";
import { useErrorMessages } from "@/hooks/useErrorMessages";
import { MessageKey, useFormattedMessages } from "@/hooks/useFormattedMessages";
import { useGetInputProps } from "@/hooks/useGetInputProps";
import { AddressField } from "@/lib/globalTypes";
import {
  ensureArray,
  getRequiredAddressFields,
  getSortedAddressFields,
  useValidationResolver,
} from "@/lib/utils";
import { useErrorsContext } from "@/providers/ErrorsProvider";
import forEach from "lodash/forEach";
import { useEffect } from "react";
import {
  DefaultValues,
  Path,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from "react-hook-form";
import { object, string } from "yup";
import { AddressFormData } from "./types";

interface AddressFormProps<TFormData extends AddressFormData> {
  countryCode: CountryCode;
  defaultValues?: DefaultValues<TFormData>;
  onCancel?: () => void;
  onSave: SubmitHandler<TFormData>;
}

export const AddressForm = <TFormData extends AddressFormData>({
  countryCode,
  defaultValues,
  onCancel,
  onSave,
}: AddressFormProps<TFormData>) => {
  const formatMessage = useFormattedMessages();
  const { errorMessages } = useErrorMessages();
  const {
    errors,
    hasErrors,
    clearErrors: clearContextErrors,
  } = useErrorsContext();

  const schema = object({
    firstName: string().required(errorMessages.requiredField),
    lastName: string().required(errorMessages.requiredField),
    streetAddress1: string().required(errorMessages.requiredField),
    postalCode: string().required(errorMessages.requiredField),
    city: string().required(errorMessages.requiredField),
  });

  const resolver = useValidationResolver(schema);

  const {
    handleSubmit,
    watch,
    getValues,
    setError,
    formState,
    clearErrors,
    ...rest
  } = useForm<TFormData>({
    resolver,
    mode: "onBlur",
    defaultValues,
  });

  useEffect(() => {
    if (hasErrors) {
      forEach(errors, ({ message }, key) => {
        setError(key as Path<TFormData>, { message });
      });
    }
  }, [errors]);

  const getInputProps = useGetInputProps({ ...rest, formState });

  const [{ data }] = useAddressValidationRulesQuery({
    variables: { countryCode },
  });

  const validationRules = data?.addressValidationRules;

  const isFieldOptional = (field: AddressField) =>
    !getRequiredAddressFields(
      ensureArray(validationRules?.requiredFields)
    ).includes(field);

  const handleCancel = () => {
    clearErrors();
    clearContextErrors();

    if (onCancel) {
      onCancel();
    }
  };

  const handleSave = (address: UnpackNestedValue<TFormData>) => {
    clearContextErrors();
    onSave(address);
  };

  return (
    <div>
      {getSortedAddressFields(ensureArray(validationRules?.allowedFields))?.map(
        (field: AddressField) => (
          <TextInput
            label={formatMessage(field as MessageKey)}
            {...getInputProps(field)}
            optional={isFieldOptional(field)}
          />
        )
      )}
      <div>
        {onCancel && (
          <Button
            className="mr-4"
            ariaLabel={formatMessage("cancelLabel")}
            variant="secondary"
            onClick={handleCancel}
            title={formatMessage("cancel")}
          />
        )}
        <Button
          ariaLabel={formatMessage("saveLabel")}
          onClick={handleSubmit(handleSave)}
          title={formatMessage("saveAddress")}
        />
      </div>
    </div>
  );
};
