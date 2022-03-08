import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useTextField } from "@react-aria/textfield";
import { Classes } from "@lib/globalTypes";
import { Control, useWatch } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface TextInputProps
  extends Omit<InputHTMLAttributes<Element>, "value" | "defaultValue">,
    Classes {
  onChange: (event: React.ChangeEvent<Element>) => void;
  name: string;
  label: string;
  optional?: boolean;
  error?: boolean;
  errorMessage?: string;
  control: Control;
}

export const TextInput: React.FC<TextInputProps> = React.forwardRef<
  HTMLInputElement,
  TextInputProps
>((props, ref) => {
  const {
    label,
    optional = false,
    error,
    errorMessage,
    className,
    onChange,
    onBlur,
    name,
    control,
    ...rest
  } = props;

  const [labelFixed, setLabelFixed] = useState(false);

  const value = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (!labelFixed && value) {
      setLabelFixed(true);
    }
  }, [value, labelFixed]);

  const { labelProps, inputProps, errorMessageProps } = useTextField(rest, ref);

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
    <div className={clsx("relative", className)}>
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
    </div>
  );
});
