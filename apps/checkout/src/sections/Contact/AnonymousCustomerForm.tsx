import { useCheckoutEmailUpdateMutation } from "@graphql";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { getDataWithToken, useValidationResolver } from "@lib/utils";
import { useToggleState } from "@react-stately/toggle";
import React from "react";
import { Checkbox } from "@components/Checkbox";
import { TextInput } from "@components/TextInput";
import { PasswordInput } from "@components/PasswordInput";
import {
  SignInFormContainer,
  SignInFormContainerProps,
} from "./SignInFormContainer";
import { object, string } from "yup";
import { useForm, useFormContext } from "react-hook-form";
import { useGetInputProps } from "@hooks/useGetInputProps";
import { useErrorMessages } from "@hooks/useErrorMessages";

type AnonymousCustomerFormProps = Pick<
  SignInFormContainerProps,
  "onSectionChange"
>;

interface FormData {
  email: string;
}

export const AnonymousCustomerForm: React.FC<AnonymousCustomerFormProps> = ({
  onSectionChange,
}) => {
  const formatMessage = useFormattedMessages();
  const errorMessages = useErrorMessages();
  const {
    isSelected: createAccountSelected,
    setSelected: setCreateAccountSelected,
  } = useToggleState();

  const schema = object({
    email: string()
      .email(errorMessages.invalidValue)
      .required(errorMessages.requiredField),
  });

  const resolver = useValidationResolver(schema);
  const contextFormProps = useFormContext();
  const { handleSubmit, ...rest } = useForm<FormData>({ resolver });
  const getInputProps = useGetInputProps(rest);
  const getContextInputProps = useGetInputProps(contextFormProps);

  const [, updateEmail] = useCheckoutEmailUpdateMutation();

  const onSubmit = ({ email }: FormData) =>
    updateEmail(getDataWithToken({ email }));

  return (
    <SignInFormContainer
      title={formatMessage("contact")}
      redirectSubtitle={formatMessage("haveAccount")}
      redirectButtonLabel={formatMessage("signIn")}
      onSectionChange={onSectionChange}
    >
      <TextInput
        label={formatMessage("emailLabel")}
        {...getInputProps("email", {
          onBlur: handleSubmit(onSubmit),
        })}
      />
      <Checkbox
        value="createAccount"
        label={formatMessage("wantToCreateAccountLabel")}
        checked={createAccountSelected}
        onChange={setCreateAccountSelected}
      />
      {createAccountSelected && (
        <PasswordInput
          label={formatMessage("passwordLabel")}
          {...getContextInputProps("password")}
        />
      )}
    </SignInFormContainer>
  );
};
