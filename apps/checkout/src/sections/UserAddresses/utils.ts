import { AddressFragment, AddressInput, CountryCode } from "@graphql";
import { omit } from "lodash";

export const getAddressInputData = ({
  country,
  name,
  firstName,
  lastName,
  ...rest
}: AddressFragment): AddressInput => ({
  ...omit(rest, ["id", "__typename"]),
  firstName: firstName || name?.split(" ")[0] || "",
  lastName: lastName || name?.split(" ")[1] || "",
  country: country.code as CountryCode,
});
