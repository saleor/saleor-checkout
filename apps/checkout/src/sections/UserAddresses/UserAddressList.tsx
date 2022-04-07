import React from "react";
import { AddressFragment, useUserAddressDeleteMutation } from "@graphql";
import { RadioGroup } from "@components/RadioGroup";
import { Radio, RadioOptionContentProps } from "@components/Radio";
import { AddressBoxContent } from "@sections/AddressBoxContent";

interface UserAddressListProps {
  onAddressSelect: (id: string) => void;
  addresses: AddressFragment[];
  selectedAddressId?: string;
  onEditChange: (id: string) => void;
}

export const UserAddressList: React.FC<UserAddressListProps> = ({
  onAddressSelect,
  selectedAddressId,
  addresses = [],
  onEditChange,
}) => {
  const [, deleteAddress] = useUserAddressDeleteMutation();

  return (
    <RadioGroup label="user addresses">
      {addresses.map(({ id, ...rest }: AddressFragment) => (
        <Radio
          value={id}
          selectedValue={selectedAddressId}
          onSelect={() => onAddressSelect(id)}
          content={({ htmlFor }: RadioOptionContentProps) => (
            <AddressBoxContent
              htmlFor={htmlFor}
              address={rest}
              onDelete={() => deleteAddress({ id })}
              onEdit={() => onEditChange(id)}
            />
          )}
        />
      ))}
    </RadioGroup>
  );
};
