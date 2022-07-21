import { ErrorCode } from "@/checkout-storefront/lib/globalTypes";
import { MessageKey, useFormattedMessages } from "./useFormattedMessages";
import { warnAboutMissingTranslation } from "./useFormattedMessages/utils";

export type ErrorMessages = Record<ErrorCode, string>;

interface UseErrorMessages {
  errorMessages: ErrorMessages;
  getMessageByErrorCode: (code: ErrorCode) => string;
}

export const useErrorMessages = (): UseErrorMessages => {
  const formatMessage = useFormattedMessages();

  const errorMessageKeys: ErrorCode[] = ["invalid", "required", "unique"];

  const getMessageByErrorCode = (errorCode: ErrorCode) => {
    try {
      const formattedMessage = formatMessage(errorCode as MessageKey);
      return formattedMessage;
    } catch (e) {
      warnAboutMissingTranslation(errorCode);
      return "";
    }
  };

  const errorMessages: ErrorMessages = errorMessageKeys.reduce(
    (result, key) => ({
      ...result,
      [key]: getMessageByErrorCode(key),
    }),
    {} as ErrorMessages
  );

  return {
    errorMessages,
    getMessageByErrorCode,
  };
};
