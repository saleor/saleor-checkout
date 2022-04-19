import { useFromErrorsFromApiErrors } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { FieldErrors } from "react-hook-form";
import createSafeContext from "./createSafeContext";

export type ApiErrors<TFormData> = Array<{
  field: keyof TFormData;
  code: "REQUIRED" | "INVALID";
  message: string;
}>;

export type Errors<TFormData> = FieldErrors<TFormData>;

export type ErrorsContextConsumerProps<TFormData = any> = {
  errors: Errors<TFormData>;
  hasErrors: boolean;
};

interface ErrorsProviderProps<TFormData> {
  apiErrors: ApiErrors<TFormData>;
}

export const [useErrorsContext, Provider] =
  createSafeContext<ErrorsContextConsumerProps>();

export const ErrorsProvider = function <TFormData>({
  apiErrors,
  children,
}: PropsWithChildren<ErrorsProviderProps<TFormData>>) {
  const errors = useFromErrorsFromApiErrors(apiErrors);
  const hasErrors = Object.keys(errors).length > 0;

  return <Provider value={{ errors, hasErrors }}>{children}</Provider>;
};
