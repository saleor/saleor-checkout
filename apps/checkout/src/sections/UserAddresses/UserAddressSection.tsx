import {
  AddressFragment,
  AddressInput,
  CountryCode,
  useUserAddressUpdateMutation,
} from "@graphql";
import { getById } from "@lib/utils";
import { useAuthState } from "@saleor/sdk";
import { AddressTypeEnum } from "@saleor/sdk/dist/apollo/types";
import React, { Suspense, useEffect, useState } from "react";
import { UserAddressForm } from "./UserAddressForm";
import { UserAddressList } from "./UserAddressList";
import { UserAddressSectionContainer } from "./UserAddressSectionContainer";
import { getAddressInputData } from "./utils";

export interface UserAddressSectionProps {
  defaultAddress?: AddressFragment;
  onAddressSelect: (address: AddressInput) => void;
  addresses: AddressFragment[];
  title: string;
  type: AddressTypeEnum;
}

export const UserAddressSection: React.FC<UserAddressSectionProps> = ({
  defaultAddress,
  addresses = [],
  onAddressSelect,
  title,
}) => {
  const { user } = useAuthState();

  const [editedAddressId, setEditedAddressId] = useState<string | null>();

  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCode>("PL");
  console.log({ selectedCountryCode });
  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultAddress?.id
  );

  const selectedAddress = addresses.find(getById(selectedAddressId));

  const onSelectAddress = (id: string) => setSelectedAddressId(id);

  useEffect(() => {
    if (!!selectedAddress) {
      onAddressSelect(getAddressInputData(selectedAddress));
    }
  }, [selectedAddressId]);

  const isEditing = !!editedAddressId;

  const [, userAddressUpdate] = useUserAddressUpdateMutation();

  const handleAddressUpdate = (address: AddressInput) =>
    userAddressUpdate({
      address: getAddressInputData({
        ...address,
        country: selectedCountryCode,
      }),
      id: user?.id,
    });

  return (
    <Suspense fallback="loaden...">
      <UserAddressSectionContainer
        title={title}
        displayCountrySelect={isEditing}
        selectedCountryCode={selectedCountryCode}
        onCountrySelect={setSelectedCountryCode}
      >
        {isEditing ? (
          <UserAddressForm
            onSave={handleAddressUpdate}
            countryCode={selectedCountryCode}
            defaultValues={addresses.find(getById(editedAddressId as string))}
            onCancel={() => setEditedAddressId(null)}
          />
        ) : (
          <UserAddressList
            addresses={addresses}
            onAddressSelect={onSelectAddress}
            selectedAddressId={selectedAddressId}
            onEditChange={(id: string) => setEditedAddressId(id)}
          />
        )}
      </UserAddressSectionContainer>
    </Suspense>
  );
};
