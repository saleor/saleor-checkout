import { ErrorCode } from "@/checkout/lib/globalTypes";
import { MessageKey, useFormattedMessages } from "./useFormattedMessages";

export const useErrorMessages = () => {
  const formatMessage = useFormattedMessages();

  const errorMessages = {
    invalidValue: formatMessage("invalid"),
    requiredValue: formatMessage("required"),
  };

  const getMessageByErrorCode = (errorCode: ErrorCode) => {
    switch (errorCode) {
      case "required":
        return errorMessages.requiredValue;

      case "invalid":
        return errorMessages.invalidValue;

      default:
        formatMessage(errorCode as MessageKey);
    }
  };

  return {
    errorMessages,
    getMessageByErrorCode,
  };
};
