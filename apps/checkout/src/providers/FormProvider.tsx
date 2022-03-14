import { UseFormResult } from "@hooks/useCheckoutForm";
import createSafeContext from "@hooks/useSafeContext";
import { FieldValues, FormProviderProps } from "react-hook-form";

type ConsumerProps<
  TData extends FieldValues = FieldValues,
  TContext = any
> = FormProviderProps & Pick<UseFormResult<TData, TContext>, "getInputProps">;

export const [useFormProvider, Provider] = createSafeContext<UseFormResult>();

export const FormProvider = <
  TData extends FieldValues = FieldValues,
  TContext = any
>({
  children,
  ...methods
}: ConsumerProps) => <Provider value={methods}> {children}</Provider>;
