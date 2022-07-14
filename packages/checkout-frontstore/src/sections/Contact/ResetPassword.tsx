import { Button } from "@/checkout-frontstore/components/Button";
import { PasswordInput } from "@/checkout-frontstore/components/PasswordInput";
import { useAlerts } from "@/checkout-frontstore/hooks/useAlerts";
import { useErrorMessages } from "@/checkout-frontstore/hooks/useErrorMessages";
import { useFormattedMessages } from "@/checkout-frontstore/hooks/useFormattedMessages";
import { useGetInputProps } from "@/checkout-frontstore/hooks/useGetInputProps";
import {
  extractMutationErrors,
  getQueryVariables,
  useValidationResolver,
} from "@/checkout-frontstore/lib/utils";
import { useAuth } from "@saleor/sdk";
import React from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
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
  const { errorMessages } = useErrorMessages();
  const { setPassword: resetPassword } = useAuth();
  const { showErrors, showSuccess } = useAlerts("resetPassword");

  const schema = object({
    password: string().required(errorMessages.required),
  });

  const resolver = useValidationResolver(schema);
  const { handleSubmit, ...rest } = useForm<FormData>({ resolver });
  const getInputProps = useGetInputProps(rest);

  const onSubmit = async ({ password }: FormData) => {
    const { email, passwordResetToken } = getQueryVariables();

    const result = await resetPassword({
      password,
      email: email as string,
      token: passwordResetToken as string,
    });

    const [hasErrors, errors] = extractMutationErrors(result);

    if (hasErrors) {
      showErrors(errors);
      return;
    }

    showSuccess();
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
        {...getInputProps("password")}
      />
      <div className="mt-4 actions">
        <Button
          ariaLabel={formatMessage("resetPasswordLabel")}
          onClick={void handleSubmit(onSubmit)}
          label={formatMessage("resetPassword")}
        />
      </div>
    </SignInFormContainer>
  );
};
