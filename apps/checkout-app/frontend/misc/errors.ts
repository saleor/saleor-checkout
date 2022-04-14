import { MetadataErrorCode } from "@/graphql";
import { IntlShape } from "react-intl";
import { commonErrorMessages } from "./errorMessages";

export const getMetadataErrorMessage = (
  code: MetadataErrorCode,
  intl: IntlShape
) => {
  switch (code) {
    case "INVALID":
      return intl.formatMessage(commonErrorMessages.invalid);
    case "REQUIRED":
      return intl.formatMessage(commonErrorMessages.required);
    case "NOT_FOUND":
      return intl.formatMessage(commonErrorMessages.notFound);
    case "NOT_UPDATED":
      return intl.formatMessage(commonErrorMessages.notUpdated);
    case "GRAPHQL_ERROR":
      return intl.formatMessage(commonErrorMessages.graphQLError);
    default:
      return intl.formatMessage(commonErrorMessages.unknown);
  }
};
