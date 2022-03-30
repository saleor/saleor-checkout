import { Checkbox } from "@components/Checkbox";
import {
  AddressInput,
  useCheckoutBillingAddressUpdateMutation,
  useCheckoutShippingAddressUpdateMutation,
  useUserQuery,
} from "@graphql";
import { getDataWithToken } from "@lib/utils";
import { useAuthState } from "@saleor/sdk";
import React, { useState } from "react";
import { UserAddressSection } from "./UserAddressSection";

interface UserAddressesProps {}

export const UserAddresses: React.FC<UserAddressesProps> = ({}) => {
  const { user: authUser } = useAuthState();
  const [useShippingAsBillingAddress, setUseShippingAsBillingAddressSelected] =
    useState(true);

  const [{ data }] = useUserQuery({
    pause: !authUser?.id,
    variables: { id: authUser?.id as string },
  });
  const user = data?.user;
  const addresses = user?.addresses;

  const [, checkoutShippingAddressUpdate] =
    useCheckoutShippingAddressUpdateMutation();

  const handleShippingUpdate = (shippingAddress: AddressInput) =>
    checkoutShippingAddressUpdate(getDataWithToken({ shippingAddress }));

  const [, checkoutBillingAddressUpdate] =
    useCheckoutBillingAddressUpdateMutation();

  const handleBillingUpdate = (billingAddress: AddressInput) =>
    checkoutBillingAddressUpdate(getDataWithToken({ billingAddress }));

  return (
    <div>
      <UserAddressSection
        title="shipping"
        type="SHIPPING"
        onAddressSelect={handleShippingUpdate}
        addresses={addresses}
        defaultAddress={user?.defaultShippingAddress}
      />
      <Checkbox
        value="useShippingAsBilling"
        checked={useShippingAsBillingAddress}
        onChange={setUseShippingAsBillingAddressSelected}
        label="use shipping address as billing address"
      />
      {!useShippingAsBillingAddress && (
        <UserAddressSection
          title="Billing"
          type="BILLING"
          onAddressSelect={handleBillingUpdate}
          addresses={addresses}
          defaultAddress={user?.defaultBillingAddress}
        />
      )}
    </div>
  );
};
