import { useFormattedMessages } from "@/checkout/hooks/useFormattedMessages";
import React from "react";
import {
  SignInFormContainer,
  SignInFormContainerProps,
} from "./SignInFormContainer";
import { Text } from "@saleor/ui-kit";
import { useAuth, useAuthState } from "@saleor/sdk";
import { Button } from "@/checkout/components/Button";
import { useCheckoutCustomerDetachMutation } from "@/checkout/graphql";
import { useCheckout } from "@/checkout/hooks/useCheckout";

type SignedInUserProps = Pick<SignInFormContainerProps, "onSectionChange">;

export const SignedInUser: React.FC<SignedInUserProps> = ({
  onSectionChange,
}) => {
  const formatMessage = useFormattedMessages();

  const { checkout } = useCheckout();
  const { logout } = useAuth();
  const { user } = useAuthState();

  const [, customerDetach] = useCheckoutCustomerDetachMutation();

  const handleLogout = async () => {
    await customerDetach({ checkoutId: checkout.id });
    await logout();
  };

  return (
    <SignInFormContainer
      title={formatMessage("account")}
      onSectionChange={onSectionChange}
    >
      <div className="flex flex-row justify-between">
        <Text weight="bold" size="md">
          {user?.email}
        </Text>
        <Button
          ariaLabel={formatMessage("signOutLabel")}
          variant="tertiary"
          onClick={void handleLogout}
          label={formatMessage("signOut")}
        />
      </div>
    </SignInFormContainer>
  );
};
