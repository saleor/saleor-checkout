import clsx from "clsx";
import React, { ForwardedRef, RefObject, useEffect, useState } from "react";
import { useTextField } from "@react-aria/textfield";
import { Classes } from "@lib/globalTypes";
import { FieldValues, useWatch } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { FormInputProps } from "@hooks/useCheckoutForm";

export interface TextInputProps<
  TFormData extends FieldValues = FieldValues,
  TContext = any
> extends Omit<
      InputHTMLAttributes<Element>,
      "value" | "defaultValue" | "name" | "onBlur" | "onChange"
    >,
    FormInputProps<TFormData, TContext>,
    Classes {
  label: string;
  optional?: boolean;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
}

export const TextInput = React.forwardRef(
  <TFormData extends Record<string, string>>(
    props: TextInputProps<TFormData>,
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

    const error = !!errors[name];

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
  }
);
