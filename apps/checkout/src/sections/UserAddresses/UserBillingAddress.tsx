import {
  AddressFragment,
  useCheckoutBillingAddressUpdateMutation,
} from "@graphql";
import { getById, getDataWithToken } from "@lib/utils";
import React, { useEffect, useState } from "react";
import { UserAddressSection } from "./UserAddressSection";
import { UserAddressSectionProps } from "./UserShippingAddress";
import { getAddressInputData } from "./utils";

export const UserBillingAddress: React.FC<UserAddressSectionProps> = ({
  defaultAddress,
  addresses = [],
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultAddress?.id
  );

  const selectedAddress = addresses.find(
    getById(selectedAddressId)
  ) as AddressFragment;

  const [, checkoutBillingAddressUpdate] =
    useCheckoutBillingAddressUpdateMutation();

  const onSelectAddress = (id: string) => setSelectedAddressId(id);

  useEffect(() => {
    if (!!selectedAddressId) {
      checkoutBillingAddressUpdate(
        getDataWithToken({
          billingAddress: getAddressInputData(selectedAddress),
        })
      );
    }
  }, [selectedAddressId]);

  return (
    <UserAddressSection
      title="Billing address"
      addresses={addresses}
      onAddressSelect={onSelectAddress}
      selectedAddressId={selectedAddressId}
    />
  );
};
