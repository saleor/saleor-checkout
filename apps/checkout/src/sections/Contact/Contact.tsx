import { useCheckout } from "@/checkout/hooks/useCheckout";
import { extractMutationErrors, getQueryVariables } from "@/checkout/lib/utils";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignedInUser } from "./SignedInUser";
import { useAuthState } from "@saleor/sdk";
import { ResetPassword } from "./ResetPassword";
import { GuestUserForm } from "./GuestUserForm";
import {
  useCheckoutCustomerAttachMutation,
  useCheckoutEmailUpdateMutation,
} from "@/checkout/graphql";
import { useAlerts } from "@/checkout/hooks/useAlerts";

type Section = "signedInUser" | "guestUser" | "signIn" | "resetPassword";

export const Contact = () => {
  const [currentSection, setCurrentSection] = useState<Section>("guestUser");
  const [{ fetching: attachingCustomer }, customerAttach] =
    useCheckoutCustomerAttachMutation();
  const [{ fetching: updatingEmail }, updateEmail] =
    useCheckoutEmailUpdateMutation();
  const { showErrors, showSuccess } = useAlerts();
  const { authenticated, user } = useAuthState();
  const hasAuthenticated = useRef(false);
  const { checkout, loading } = useCheckout();

  const changeSection = (section: Section) => () => {
    if (isCurrentSection(section)) {
      return;
    }

    setCurrentSection(section);
  };

  const isCurrentSection = (section: Section) => currentSection === section;

  const [passwordResetShown, setPasswordResetShown] = useState(false);

  const passwordResetToken = getQueryVariables().passwordResetToken;

  const handleEmailUpdate = async () => {
    if (user?.email === checkout?.email || updatingEmail) {
      return;
    }

    const result = await updateEmail({
      email: user?.email as string,
      checkoutId: checkout.id,
    });

    const [hasErrors, errors] = extractMutationErrors(result);

    if (hasErrors) {
      showErrors(errors, "checkoutEmailUpdate");
      return;
    }

    showSuccess("checkoutEmailUpdate");
  };

  const handleCustomerAttatch = async () => {
    if (checkout?.user?.id === user?.id || attachingCustomer) {
      return;
    }

    customerAttach({
      checkoutId: checkout.id,
      customerId: user?.id as string,
    });
  };

  useEffect(() => {
    if (authenticated && !hasAuthenticated.current) {
      handleEmailUpdate();
      handleCustomerAttatch();
      hasAuthenticated.current = true;
    }
  }, [authenticated]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (authenticated) {
      setCurrentSection("signedInUser");
      hasAuthenticated.current = true;
      return;
    }

    if (passwordResetToken && !passwordResetShown) {
      setCurrentSection("resetPassword");
      setPasswordResetShown(true);
      return;
    }

    setCurrentSection("guestUser");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, checkout?.user, authenticated, passwordResetToken]);

  return (
    <div>
      {isCurrentSection("guestUser") && (
        <GuestUserForm onSectionChange={changeSection("signIn")} />
      )}

      {isCurrentSection("signIn") && (
        <SignInForm onSectionChange={changeSection("guestUser")} />
      )}

      {isCurrentSection("signedInUser") && (
        <SignedInUser onSectionChange={changeSection("guestUser")} />
      )}

      {isCurrentSection("resetPassword") && (
        <ResetPassword onSectionChange={changeSection("signIn")} />
      )}
    </div>
  );
};
