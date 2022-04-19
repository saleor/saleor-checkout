import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { CountryCode, useAddressValidationRulesQuery } from "@/graphql";
import { MessageKey, useFormattedMessages } from "@/hooks/useFormattedMessages";
import { useGetInputProps } from "@/hooks/useGetInputProps";
import { AddressField } from "@/lib/globalTypes";
import {
  ensureArray,
  getRequiredAddressFields,
  getSortedAddressFields,
} from "@/lib/utils";
import { useErrorsContext } from "@/providers/ErrorsProvider";
import forEach from "lodash/forEach";
import { useEffect } from "react";
import {
  DefaultValues,
  FieldError,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
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
  const { errors, hasErrors } = useErrorsContext();

  const { handleSubmit, watch, getValues, setError, formState, ...rest } =
    useForm<TFormData>({
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
            onClick={onCancel}
            title={formatMessage("cancel")}
          />
        )}
        <Button
          ariaLabel={formatMessage("saveLabel")}
          onClick={handleSubmit(onSave)}
          title={formatMessage("saveAddress")}
        />
      </div>
    </div>
  );
};
