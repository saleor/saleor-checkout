import React, { useEffect } from "react";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { useToggleState } from "@react-stately/toggle";
import { AddressFragment, useUserAddressDeleteMutation } from "@graphql";
import { Title } from "@components/Title";

interface UserAddressSectionProps {
  title: string;
  onAddressSelect: (id: string) => void;
  addresses: AddressFragment[];
  selectedAddressId: string;
}

export const UserAddressSection: React.FC<UserAddressSectionProps> = ({
  title,
  onAddressSelect,
  selectedAddressId,
  addresses = [],
}) => {
  const [, deleteAddress] = useUserAddressDeleteMutation();

  const { isSelected: isEditing, setSelected: setIsEditing } = useToggleState({
    defaultSelected: false,
  });

  return (
    <div className="my-6">
      <Title className="mb-4">{title}</Title>
      {addresses.map(
        ({
          id,
          firstName,
          lastName,
          country,
          phone,
          streetAddress1,
          streetAddress2,
          postalCode,
          countryArea,
          city,
        }: AddressFragment) => (
          <div className="mb-4 flex flex-row justify-between">
            <div className="flex flex-row">
              <input
                type="radio"
                className="mr-2 mt-1"
                checked={selectedAddressId === id}
                onChange={() => onAddressSelect(id)}
              />
              <div>
                <Text weight="bold">{firstName + " " + lastName}</Text>
                <p>{streetAddress1}</p>
                <p>{streetAddress2}</p>
                <p>{postalCode + " " + city}</p>
                <p>{country.country}</p>
                <p>{countryArea}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div>
              <Button title="edit" onClick={() => setIsEditing(!isEditing)} />
              <Button
                variant="secondary"
                title="delete"
                onClick={() => deleteAddress({ id })}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};
