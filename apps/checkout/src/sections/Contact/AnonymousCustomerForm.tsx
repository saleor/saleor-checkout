import { useCheckoutEmailUpdateMutation } from "@graphql";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { getDataWithToken } from "@lib/utils";
import { useToggleState } from "@react-stately/toggle";
import React from "react";
import { Checkbox } from "@components/Checkbox";
import { TextInput } from "@components/TextInput";
import { PasswordInput } from "@components/PasswordInput";
import {
  SignInFormContainer,
  SignInFormContainerProps,
} from "./SignInFormContainer";
import { string } from "yup";
import { useForm } from "@hooks/useCheckoutForm";
import { useFormProvider } from "../../providers/FormProvider";

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

  const contextFormProps = useFormProvider();
  const { handleSubmit, getInputProps, formState } = useForm<FormData>();

  const {
    isSelected: createAccountSelected,
    setSelected: setCreateAccountSelected,
  } = useToggleState();

  const [, updateEmail] = useCheckoutEmailUpdateMutation();

  const onSubmit = ({ email }: FormData) =>
    updateEmail(getDataWithToken({ email }));

  console.log(123, formState.errors);
  return (
    <SignInFormContainer
      title={formatMessage("contact")}
      redirectSubtitle={formatMessage("haveAccount")}
      redirectButtonLabel={formatMessage("signIn")}
      onSectionChange={onSectionChange}
    >
      <TextInput
        label={formatMessage("emailLabel")}
        errorMessage={"Invalid value"}
        {...getInputProps("email", {
          onBlur: () => handleSubmit(onSubmit),
          validate: (value) => string().email().isValid(value),
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
          {...contextFormProps.getInputProps("password")}
        />
      )}
    </SignInFormContainer>
  );
};
