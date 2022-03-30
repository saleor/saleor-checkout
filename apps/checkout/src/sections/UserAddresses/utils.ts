import { AddressFragment, AddressInput, CountryCode } from "@graphql";
import { omit } from "lodash";

export const getAddressInputData = ({
  country,
  ...rest
}: AddressFragment): AddressInput => ({
  ...omit(rest, [
    "id",
    "__typename",
    /* TMP because api breaks when receiving this in mutations ->*/ "name",
  ]),
  country: country.code as CountryCode,
});
