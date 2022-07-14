import { AddressFragment } from "@/checkout-frontstore/graphql";
import React from "react";
import { AddressFormData } from "./types";
import { AddressForm } from "./AddressForm";
import { UserAddressSectionContainer } from "./UserAddressSectionContainer";
import { getAddressFormDataFromAddress } from "./utils";
import { useCountrySelect } from "@/checkout-frontstore/providers/CountrySelectProvider";
import { UseErrors } from "@/checkout-frontstore/hooks/useErrors";

interface GuestAddressSectionProps extends UseErrors<AddressFormData> {
  onSubmit: (address: AddressFormData) => void;
  address: AddressFragment;
  title: string;
}

export const GuestAddressSection: React.FC<GuestAddressSectionProps> = ({
  onSubmit,
  address,
  title,
  ...errorProps
}) => {
  const { countryCode } = useCountrySelect();

  const handleSave = (address: AddressFormData) =>
    onSubmit({ ...address, countryCode });

  return (
    <UserAddressSectionContainer title={title} displayCountrySelect>
      <AddressForm
        onSave={handleSave}
        defaultValues={getAddressFormDataFromAddress(address)}
        {...errorProps}
      />
    </UserAddressSectionContainer>
  );
};
