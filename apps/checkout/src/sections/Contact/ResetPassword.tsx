import { Button } from "@components/Button";
import { PasswordInput } from "@components/PasswordInput";
import { useCheckoutEmailUpdateMutation } from "@graphql";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { useGetInputProps } from "@hooks/useGetInputProps";
import { getQueryVariables } from "@lib/utils";
import { useAuth } from "@saleor/sdk";
import React from "react";
import { useForm } from "react-hook-form";
import {
  SignInFormContainer,
  SignInFormContainerProps,
} from "./SignInFormContainer";

type ResetPasswordProps = Pick<SignInFormContainerProps, "onSectionChange">;

interface FormData {
  password: string;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  onSectionChange,
}) => {
  const formatMessage = useFormattedMessages();
  const { setPassword } = useAuth();
  const { handleSubmit, ...rest } = useForm<FormData>({});
  const getInputProps = useGetInputProps(rest);

  const onSubmit = ({ password }: FormData) => {
    const { email, passwordResetToken } = getQueryVariables();

    setPassword({
      password,
      email: email as string,
      token: passwordResetToken as string,
    });
  };

  return (
    <SignInFormContainer
      title={formatMessage("resetPassword")}
      redirectSubtitle={formatMessage("rememberedYourPassword")}
      redirectButtonLabel={formatMessage("signIn")}
      onSectionChange={onSectionChange}
      subtitle={formatMessage("providePassword")}
    >
      <PasswordInput
        label={formatMessage("passwordLabel")}
        className="mb-4"
        {...getInputProps("password")}
      />
      <div className="actions">
        <Button
          onClick={() => handleSubmit(onSubmit)}
          title={formatMessage("resetPassword")}
        />
      </div>
    </SignInFormContainer>
  );
};
