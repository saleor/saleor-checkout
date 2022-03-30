import { AddressFragment, CountryCode } from "@graphql";
import React, { useState } from "react";
import { UserAddressForm } from "./UserAddressForm";
import { UserAddressSectionContainer } from "./UserAddressSectionContainer";

interface GuestAddressSectionProps {
  onSubmit: (address: AddressFragment) => void;
}

export const GuestAddressSection: React.FC<GuestAddressSectionProps> = ({
  onSubmit,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCode>("PL");

  return (
    <UserAddressSectionContainer
      title="shipping"
      displayCountrySelect
      selectedCountryCode={selectedCountryCode}
      onCountrySelect={setSelectedCountryCode}
    >
      <UserAddressForm onSave={onSubmit} countryCode={selectedCountryCode} />
    </UserAddressSectionContainer>
  );
};
