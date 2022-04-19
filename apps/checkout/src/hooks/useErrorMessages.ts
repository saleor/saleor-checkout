import { ValidationErrorCode } from "@/lib/globalTypes";
import { useFormattedMessages } from "./useFormattedMessages";

export const useErrorMessages = () => {
  const formatMessage = useFormattedMessages();

  const errorMessages = {
    invalidValue: formatMessage("invalid"),
    requiredField: formatMessage("required"),
    requiredValue: formatMessage("required"),
  };

  const getMessageByErrorCode = (errorCode: ValidationErrorCode) => {
    switch (errorCode) {
      case "required":
        return errorMessages.requiredValue;

      case "invalid":
        return errorMessages.invalidValue;

      case "missing":
        return errorMessages.requiredField;

      default:
        break;
    }
  };

  return {
    errorMessages,
    getMessageByErrorCode,
  };
};
