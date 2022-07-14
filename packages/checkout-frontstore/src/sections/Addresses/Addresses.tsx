import { CountryCode, useUserQuery } from "@/checkout-frontstore/graphql";
import { useCheckout } from "@/checkout-frontstore/hooks/useCheckout";
import { BillingSameAsShippingProvider } from "@/checkout-frontstore/providers/BillingSameAsShippingProvider";
import { CountrySelectProvider } from "@/checkout-frontstore/providers/CountrySelectProvider";
import { useAuthState } from "@saleor/sdk";
import React from "react";
import { BillingAddressSection } from "./BillingAddressSection";
import { ShippingAddressSection } from "./ShippingAddressSection";

export const Addresses: React.FC = () => {
  const { user: authUser } = useAuthState();
  const { checkout } = useCheckout();

  const [{ data }] = useUserQuery({
    pause: !authUser?.id,
  });

  const user = data?.me;
  const userAddresses = user?.addresses;

  return (
    <BillingSameAsShippingProvider>
      {checkout.isShippingRequired && (
        <CountrySelectProvider
          selectedCountryCode={
            checkout?.shippingAddress?.country?.code as CountryCode
          }
        >
          <ShippingAddressSection
            addresses={userAddresses}
            defaultShippingAddress={user?.defaultShippingAddress}
          />
        </CountrySelectProvider>
      )}
      <CountrySelectProvider
        selectedCountryCode={
          checkout?.billingAddress?.country?.code as CountryCode
        }
      >
        <BillingAddressSection
          addresses={userAddresses}
          defaultBillingAddress={user?.defaultBillingAddress}
        />
      </CountrySelectProvider>
    </BillingSameAsShippingProvider>
  );
};
