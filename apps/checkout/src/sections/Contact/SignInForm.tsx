import { Button } from "@components/Button";
import { PasswordInput } from "@components/PasswordInput";
import { TextInput } from "@components/TextInput";
import { Text } from "@components/Text";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { useAuth } from "@saleor/sdk";
import React from "react";
import {
  SignInFormContainer,
  SignInFormContainerProps,
} from "./SignInFormContainer";
import { getCurrentHref } from "@lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetInputProps } from "@hooks/useGetInputProps";

type SignInFormProps = Pick<SignInFormContainerProps, "onSectionChange">;

interface FormData {
  email: string;
  password: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSectionChange }) => {
  const formatMessage = useFormattedMessages();
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const { handleSubmit, getValues, ...rest } = useForm<FormData>();
  const getInputProps = useGetInputProps(rest);
  const { login, requestPasswordReset } = useAuth();

  const onSubmit = ({ email, password }: FormData) =>
    login({
      email,
      password,
    });

  const onPasswordReset = () => {
    if (!passwordResetSent) {
      setPasswordResetSent(true);
    }

    requestPasswordReset({
      email: getValues().email,
      redirectUrl: getCurrentHref(),
    });
  };

  return (
    <SignInFormContainer
      title={formatMessage("signIn")}
      redirectSubtitle={formatMessage("newCustomer")}
      redirectButtonLabel={formatMessage("guestCheckout")}
      onSectionChange={onSectionChange}
    >
      <TextInput
        label={formatMessage("emailLabel")}
        {...getInputProps("email")}
      />
      <PasswordInput
        label={formatMessage("passwordLabel")}
        {...getInputProps("password")}
      />
      <div className="actions">
        {passwordResetSent && <Text>{formatMessage("shouldResendLink")}</Text>}
        <Button
          variant="tertiary"
          title={formatMessage(passwordResetSent ? "resend" : "forgotPassword")}
          className="ml-1 mr-4"
          onPress={onPasswordReset}
        />
        <Button
          onPress={() => handleSubmit(onSubmit)}
          title={formatMessage("signIn")}
        />
      </div>
    </SignInFormContainer>
  );
};
