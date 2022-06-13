import { useErrorMessages } from "@/checkout/hooks/useErrorMessages";
import {
  MessageKey,
  useFormattedMessages,
} from "@/checkout/hooks/useFormattedMessages";
import {
  Alert,
  AlertType,
  AlertErrorData,
  AlertSuccessData,
  CheckoutScope,
} from "./types";
import { toast } from "react-toastify";
import { camelCase } from "lodash-es";
import { ApiErrors, useGetParsedApiErrors } from "@/checkout/hooks/useErrors";

export interface ScopedAlertsProps {
  showSuccess: () => void;
  showErrors: (errors: AlertErrorData[]) => void;
}

function useAlerts(scope: CheckoutScope): ScopedAlertsProps;

function useAlerts(): {
  showSuccess: (scope: CheckoutScope) => void;
  showErrors: (errors: AlertErrorData[], scope: CheckoutScope) => void;
};

function useAlerts(globalScope?: any): any {
  const formatMessage = useFormattedMessages();
  const { getMessageByErrorCode } = useErrorMessages();
  const getParsedApiErrors = useGetParsedApiErrors();

  const getErrorMessage = ({ scope, code, field }: AlertErrorData): string => {
    try {
      const fullMessage = formatMessage(
        camelCase(`${scope}-${field}-${code}-error`) as MessageKey
      );

      return fullMessage;
    } catch (e) {
      return `${getMessageByErrorCode(code)}: ${formatMessage(
        field as MessageKey
      )}`;
    }
  };

  const getParsedAlert = (
    data: AlertSuccessData | AlertErrorData,
    type: AlertType
  ): Alert => {
    if (type === "error") {
      const { scope, field, code } = data as AlertErrorData;

      return {
        id: camelCase(`${scope}-${field}-${code}`),
        message: getErrorMessage({ scope, code, field }),
        type,
      };
    }

    const { scope } = data;

    const id = `${scope}Success`;

    return {
      type,
      id: `${scope}Success`,
      message: formatMessage(id as MessageKey),
    };
  };

  const showAlert = (
    { scope, ...dataRest }: AlertSuccessData | AlertErrorData,
    { type }: { type: AlertType }
  ) => {
    const { message, ...options } = getParsedAlert(
      { ...dataRest, scope },
      type
    );
    toast(message, options);
  };

  const showSuccess = (scope: CheckoutScope = globalScope) =>
    showAlert({ scope }, { type: "success" });

  const showErrors = (
    errors: ApiErrors<any>,
    scope: CheckoutScope = globalScope
  ) =>
    getParsedApiErrors(errors).forEach((error) => {
      return showAlert({ ...error, scope }, { type: "error" });
    });

  return { showSuccess, showErrors };
}

export { useAlerts };
