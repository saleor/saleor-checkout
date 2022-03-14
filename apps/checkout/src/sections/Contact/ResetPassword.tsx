import { Button } from "@components/Button";
import { PasswordInput } from "@components/PasswordInput";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { getQueryVariables } from "@lib/utils";
import { useAuth } from "@saleor/sdk";
import { string } from "yup";
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({});

  console.log({ errors });

  const onSubmit = ({ password }: FormData) =>
    setPassword({
      password,
      email: getQueryVariables().email as string,
      token: getQueryVariables().passwordResetToken as string,
    });

  return (
    <SignInFormContainer
      title={formatMessage("resetPassword")}
      redirectSubtitle={formatMessage("rememberedYourPassword")}
      redirectButtonLabel={formatMessage("signIn")}
      onSectionChange={onSectionChange}
    >
      <PasswordInput
        label={formatMessage("passwordLabel")}
        className="mb-4"
        control={control}
        {...register("password", {})}
      />
      <div className="actions">
        <Button
          onPress={handleSubmit(onSubmit)}
          title={formatMessage("resetPassword")}
        />
      </div>
    </SignInFormContainer>
  );
};
