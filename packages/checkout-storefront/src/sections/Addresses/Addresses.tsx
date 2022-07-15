import { CountryCode, useUserQuery } from "@/checkout-storefront/graphql";
import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { BillingSameAsShippingProvider } from "@/checkout-storefront/providers/BillingSameAsShippingProvider";
import { CountrySelectProvider } from "@/checkout-storefront/providers/CountrySelectProvider";
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
