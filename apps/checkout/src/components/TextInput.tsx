import React, { AllHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { Classes } from "@/lib/globalTypes";
import { TextInput as UiKitTextInput } from "@saleor/ui-kit";
import {
  Control,
  FieldPath,
  FormState,
  UseFormRegisterReturn,
  useWatch,
} from "react-hook-form";
import { ControlFormData } from "@/hooks/useGetInputProps";

export interface TextInputProps<
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
> extends Omit<
      AllHTMLAttributes<HTMLInputElement>,
      "onBlur" | "onChange" | "name" | "ref"
    >,
    Pick<FormState<TFormData>, "errors">,
    Omit<UseFormRegisterReturn, "ref">,
    Classes {
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
  props: TextInputProps<TControl, TFormData>
) => {
  const { name, control, optional, errors, ...rest } = props;

  const value = useWatch({
    control,
    name,
  });

  return (
    <UiKitTextInput {...rest} name={name} value={value} required={!optional} />
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
