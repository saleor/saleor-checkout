import {
  useForm as useHookForm,
  Control,
  RegisterOptions,
  UseFormReturn,
  FieldValues,
  FieldPath,
  UseFormProps,
  UseFormRegisterReturn,
  FieldErrors,
} from "react-hook-form";

export type FormInputProps<
  TData extends FieldValues = FieldValues,
  TContext = any
> = UseFormRegisterReturn & {
  name: FieldPath<TData>;
  errors: FieldErrors<TData>;
  control: Control<TData, TContext>;
};

export interface UseFormResult<
  TData extends FieldValues = FieldValues,
  TContext = any
> extends UseFormReturn<TData, TContext> {
  getInputProps: <TName extends FieldPath<TData>>(
    name: TName,
    options?: RegisterOptions<TData, TName>
  ) => FormInputProps<TData, TContext>;
}

export const useForm = <
  TData extends FieldValues = FieldValues,
  TContext = any
>(
  props?: UseFormProps<TData, TContext>
): UseFormResult<TData> => {
  const formProps = useHookForm<TData>(props);

  const {
    register,
    control,
    formState: { errors },
  } = formProps;

  const getInputProps = <TName extends FieldPath<TData> = FieldPath<TData>>(
    name: TName,
    options?: RegisterOptions<TData, TName>
  ) => ({ ...register(name, options), name, errors, control });

  return { ...formProps, getInputProps };
};
