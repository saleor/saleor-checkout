import { MetadataErrorCode } from "@/graphql";
import { IntlShape } from "react-intl";
import { metadataErrorMessages } from "./errorMessages";

export const getMetadataErrorMessage = (
  code: MetadataErrorCode,
  intl: IntlShape
) => {
  switch (code) {
    case "INVALID":
      return intl.formatMessage(metadataErrorMessages.invalid);
    case "REQUIRED":
      return intl.formatMessage(metadataErrorMessages.required);
    case "NOT_FOUND":
      return intl.formatMessage(metadataErrorMessages.notFound);
    case "NOT_UPDATED":
      return intl.formatMessage(metadataErrorMessages.notUpdated);
    case "GRAPHQL_ERROR":
      return intl.formatMessage(metadataErrorMessages.graphQLError);
    default:
      return intl.formatMessage(metadataErrorMessages.unknown);
  }
};
