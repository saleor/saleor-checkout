import { Button } from "@components/Button";
import {
  AddressFragment,
  AddressInput,
  CountryCode,
  useUserAddressCreateMutation,
  useUserAddressUpdateMutation,
} from "@graphql";
import { extractMutationErrors, getById } from "@lib/utils";
import { useAuthState } from "@saleor/sdk";
import { AddressTypeEnum } from "@saleor/sdk/dist/apollo/types";
import { reduce } from "lodash";
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
  type,
}) => {
  const { user } = useAuthState();

  const [addAddressOpened, setAddAddressOpened] = useState(false);

  const [editedAddressId, setEditedAddressId] = useState<string | null>();

  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCode>("PL");

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

  const editAddressOpened = !!editedAddressId;

  const [, userAddressUpdate] = useUserAddressUpdateMutation();
  const [, userAddressAdd] = useUserAddressCreateMutation();

  const handleAddressUpdate = async (address: AddressFragment) => {
    const result = await userAddressUpdate({
      address: getAddressInputData({
        ...address,
        country: { code: selectedCountryCode },
      }),
      id: user?.id,
    });

    const [hasErrors] = extractMutationErrors(result);

    if (!hasErrors) {
      setEditedAddressId(null);
    }
  };

  const handleAddressAdd = async (address: AddressFragment) => {
    const result = await userAddressAdd({
      address: getAddressInputData({
        ...address,
        country: { code: selectedCountryCode },
      }),
      type,
      id: user?.id,
    });

    const [hasErrors] = extractMutationErrors(result);

    if (!hasErrors) {
      setAddAddressOpened(false);
    }
  };

  return (
    <Suspense fallback="loaden...">
      <UserAddressSectionContainer
        title={title}
        displayCountrySelect={editAddressOpened || addAddressOpened}
        selectedCountryCode={selectedCountryCode}
        onCountrySelect={setSelectedCountryCode}
      >
        {addAddressOpened ? (
          <UserAddressForm
            onSave={handleAddressAdd}
            countryCode={selectedCountryCode}
            onCancel={() => setAddAddressOpened(false)}
          />
        ) : (
          <Button
            onClick={() => setAddAddressOpened(true)}
            title="Add new address"
            className="mb-4"
          />
        )}

        {editAddressOpened ? (
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
