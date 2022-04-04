import { CountryCode } from "@graphql";
import React, { useState } from "react";
import { AddressFormData } from "./types";
import { UserAddressForm } from "./UserAddressForm";
import { UserAddressSectionContainer } from "./UserAddressSectionContainer";

interface GuestAddressSectionProps {
  onSubmit: (address: AddressFormData) => void;
  title: string;
}

export const GuestAddressSection: React.FC<GuestAddressSectionProps> = ({
  onSubmit,
  title,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCode>("PL");

  return (
    <UserAddressSectionContainer
      title={title}
      displayCountrySelect
      selectedCountryCode={selectedCountryCode}
      onCountrySelect={setSelectedCountryCode}
    >
      <UserAddressForm onSave={onSubmit} countryCode={selectedCountryCode} />
    </UserAddressSectionContainer>
  );
};
