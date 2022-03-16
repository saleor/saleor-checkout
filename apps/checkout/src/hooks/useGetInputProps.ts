import {
  Control,
  RegisterOptions,
  UseFormReturn,
  FieldPath,
  UseFormRegisterReturn,
  FieldErrors,
} from "react-hook-form";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

export type ControlFormData<FormControl> = FormControl extends Control<
  infer FormData
>
  ? FormData
  : never;

export type FormInputProps<
  TControl extends Control<any, any>,
  TData extends ControlFormData<TControl>
> = UseFormRegisterReturn & {
  name: FieldPath<TData>;
  errors: FieldErrors<TData>;
  control: Control<TData>;
};

export type GetInputProps = <
  TControl extends Control<any, any>,
  TData extends ControlFormData<TControl>,
  TName extends FieldPath<TData> = FieldPath<TData>
>(
  name: TName,
  options?: RegisterOptions<TData, TName>
) => FormInputProps<TControl, TData>;

type UseGetInputProps<
  TControl extends Control<any, any>,
  TData extends ControlFormData<TControl>
> = Pick<UseFormReturn<TData>, "formState" | "register"> & {
  control: TControl;
};

export const useGetInputProps = <
  TControl extends Control<any, any>,
  TData extends ControlFormData<TControl>,
  TShape extends Record<keyof TData, any>
>(
  {
    register,
    control,
    formState: { errors },
  }: UseGetInputProps<TControl, TData>,
  schema: OptionalObjectSchema<TShape>
): GetInputProps => {
  const getInputProps = <TName extends FieldPath<TData> = FieldPath<TData>>(
    name: TName,
    options?: RegisterOptions<TData, TName>
  ) => {
    const optionsWithValidation = {
      ...options,
      validate: async (value: keyof TData) => {
        try {
          schema.fields[name].validate(value);
        } catch (error) {
          return;
        }
      },
    };

    return {
      ...register(name, optionsWithValidation),
      name,
      errors,
      control,
    };
  };

  return getInputProps;
};
