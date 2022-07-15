import React, { AllHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { Classes } from "@/checkout-storefront/lib/globalTypes";
import { TextInput as UiKitTextInput } from "@saleor/ui-kit";
import {
  Control,
  FieldPath,
  UseFormRegisterReturn,
  useWatch,
} from "react-hook-form";
import { ControlFormData } from "@/checkout-storefront/hooks/useGetInputProps";
import { Errors } from "../hooks/useErrors";

export interface TextInputProps<
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
> extends Omit<
      AllHTMLAttributes<HTMLInputElement>,
      "onBlur" | "onChange" | "name" | "ref"
    >,
    Omit<UseFormRegisterReturn, "ref">,
    Classes {
  errors: Errors<TFormData>;
  control: TControl;
  name: FieldPath<TFormData>;
  label: string;
  optional?: boolean;
  icon?: React.ReactNode;
}

const TextInputComponent = <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { name, control, optional, errors, ...rest } = props;

  const value = useWatch({
    control,
    name,
  });

  const error = errors[name as keyof typeof errors];

  return (
    <UiKitTextInput
      {...rest}
      error={(error as any)?.message}
      ref={ref}
      name={name}
      value={value}
      required={!optional}
    />
  );
};

export const TextInput = forwardRef(TextInputComponent) as <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData> & {
    ref?: ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof TextInputComponent>;
