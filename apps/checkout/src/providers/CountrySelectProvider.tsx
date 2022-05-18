import React, { PropsWithChildren, useState } from "react";
import { createSafeContext } from "@/providers/createSafeContext";
import { AddressFragment, CountryCode } from "@/graphql";

const defaultCountryCode: CountryCode = "PL";

interface CountrySelectProviderProps {
  selectedCountryCode?: CountryCode;
}

export interface CountrySelectContextConsumerProps {
  countryCode: CountryCode;
  setCountryCode: (code?: CountryCode) => void;
  setCountryCodeFromAddress: (address?: AddressFragment | null) => void;
}

export const [useCountrySelect, Provider] =
  createSafeContext<CountrySelectContextConsumerProps>();

export const CountrySelectProvider: React.FC<
  PropsWithChildren<CountrySelectProviderProps>
> = ({ children, selectedCountryCode }) => {
  const [countryCode, handleSetCountryCode] = useState<CountryCode>(
    selectedCountryCode || defaultCountryCode
  );

  const setCountryCode = (code: CountryCode = defaultCountryCode) =>
    handleSetCountryCode(code);

  const setCountryCodeFromAddress = (address?: AddressFragment | null) =>
    setCountryCode(address?.country?.code as CountryCode);

  const providerValues: CountrySelectContextConsumerProps = {
    countryCode,
    setCountryCode,
    setCountryCodeFromAddress,
  };

  return <Provider value={providerValues}>{children}</Provider>;
};
