import { AddressFragment, AddressInput, CountryCode } from "@graphql";
import { omit } from "lodash";

export const getAddressInputData = ({
  country,
  ...rest
}: AddressFragment): AddressInput => ({
  ...omit(rest, ["id", "__typename"]),
  country: country.code as CountryCode,
});
