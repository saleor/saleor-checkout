import {
  AddressFragment,
  CountryCode,
  useCheckoutShippingAddressUpdateMutation,
} from "@graphql";
import { getById, getDataWithToken } from "@lib/utils";
import { AddressInput } from "@saleor/sdk/dist/apollo/types";
import { omit } from "lodash";
import React, { useEffect, useState } from "react";
import { UserAddressSection } from "./UserAddressSection";
import { getAddressInputData } from "./utils";

export interface UserAddressSectionProps {
  defaultAddress: AddressFragment;
  addresses: AddressFragment[];
}

export const UserShippingAddress: React.FC<UserAddressSectionProps> = ({
  defaultAddress,
  addresses = [],
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultAddress?.id
  );

  const selectedAddress = addresses.find(
    getById(selectedAddressId)
  ) as AddressFragment;

  const [, checkoutShippingAddressUpdate] =
    useCheckoutShippingAddressUpdateMutation();

  const onSelectAddress = (id: string) => setSelectedAddressId(id);

  useEffect(() => {
    if (!!selectedAddressId) {
      checkoutShippingAddressUpdate(
        getDataWithToken({
          shippingAddress: getAddressInputData(selectedAddress),
        })
      );
    }
  }, [selectedAddressId]);

  return (
    <UserAddressSection
      title="Shipping address"
      addresses={addresses}
      onAddressSelect={onSelectAddress}
      selectedAddressId={selectedAddressId}
    />
  );
};
