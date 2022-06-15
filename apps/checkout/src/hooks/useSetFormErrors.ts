import { FieldError, Path, UseFormSetError } from "react-hook-form";
import { Errors } from "@/checkout/hooks/useErrors";
import { forEach } from "lodash-es";
import { useEffect } from "react";

function useSetFormErrors<TFormData>(data: {
  setError: UseFormSetError<TFormData>;
  hasErrors?: boolean;
  errors?: Errors<TFormData>;
}): () => void;

function useSetFormErrors<TFormData>(data: {
  setError: UseFormSetError<TFormData>;
}): (hasErrors?: boolean, errors?: Errors<TFormData>) => void;

function useSetFormErrors<TFormData>({ setError, hasErrors, errors }: any) {
  const setFormErrors = (
    hasErrorsArg: boolean = hasErrors,
    errorsArg: Errors<TFormData> = errors
  ) => {
    if (hasErrorsArg) {
      forEach(errorsArg, (error, key) => {
        setError(key as Path<TFormData>, {
          message: (error as unknown as FieldError).message,
        });
      });
    }
  };

  useEffect(() => {
    setFormErrors();
  }, [errors]);

  return setFormErrors;
}

export { useSetFormErrors };
