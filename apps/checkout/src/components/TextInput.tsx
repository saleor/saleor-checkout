import clsx from "clsx";
import React, {
  ForwardedRef,
  forwardRef,
  RefObject,
  useEffect,
  useState,
} from "react";
import { AriaTextFieldOptions, useTextField } from "@react-aria/textfield";
import { Classes } from "@lib/globalTypes";
import {
  Control,
  FieldErrors,
  FieldPath,
  UseFormRegisterReturn,
  useWatch,
} from "react-hook-form";
import { ControlFormData } from "@hooks/useGetInputProps";

export interface TextInputProps<
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
> extends Omit<AriaTextFieldOptions<"input">, "onBlur" | "onChange" | "name">,
    UseFormRegisterReturn,
    Classes {
  control: TControl;
  errors: FieldErrors<TFormData>;
  name: FieldPath<TFormData>;
  label: string;
  optional?: boolean;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
}

const TextInputComponent = <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    label,
    optional = false,
    errors,
    errorMessage,
    className,
    onChange,
    onBlur,
    name,
    control,
    icon,
    ...rest
  } = props;

  const [labelFixed, setLabelFixed] = useState(false);

  const error = !!errors[name as keyof typeof errors];

  const value = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (!labelFixed && value) {
      setLabelFixed(true);
    }
  }, [value, labelFixed]);

  const { labelProps, inputProps, errorMessageProps } = useTextField(
    rest,
    ref as RefObject<HTMLInputElement>
  );

  console.log({ error, errorMessage });
  const inputClasses = clsx("text-input", {
    "text-input-error": error,
  });

  const labelClasses = clsx("text-input-label", {
    "text-input-filled-label": labelFixed,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelFixed(!!event.target.value);
    onChange(event);
  };

  return (
    <div className={clsx("text-input-container", className)}>
      <input
        {...inputProps}
        name={name}
        ref={ref}
        className={inputClasses}
        onBlur={onBlur}
        onChange={handleChange}
      />
      <label {...labelProps} htmlFor={inputProps.id} className={labelClasses}>
        {optional ? label : `${label}*`}
      </label>
      {error && (
        <span className="text-xs text-text-error" {...errorMessageProps}>
          {errorMessage}
        </span>
      )}
      {icon && <div className="icon">{icon}</div>}
    </div>
  );
};

export const TextInput = forwardRef(TextInputComponent) as <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof TextInputComponent>;
