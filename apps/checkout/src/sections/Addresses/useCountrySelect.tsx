import { CountryCode } from "@/graphql";
import { useState } from "react";

const defaultCountryCode: CountryCode = "PL";

export interface CountrySelectProps {
  countryCode: CountryCode;
  setCountryCode: (code?: CountryCode) => void;
}

export const useCountrySelect = (): CountrySelectProps => {
  const [countryCode, handleSetCountryCode] =
    useState<CountryCode>(defaultCountryCode);

  const setCountryCode = (code: CountryCode = defaultCountryCode) =>
    handleSetCountryCode(code);

  return { countryCode, setCountryCode };
};
