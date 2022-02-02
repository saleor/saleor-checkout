import clsx from "clsx";
import React from "react";
import { useTextField } from "@react-aria/textfield";

interface TextInputProps {
  onChange: (value: string) => void;
  value: string;
  label: string;
  optional?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    onChange,
    value,
    label,
    optional = false,
    error,
    errorMessage,
  } = props;

  const ref = React.useRef<HTMLInputElement | null>(null);

  const { labelProps, inputProps, errorMessageProps } = useTextField(
    props,
    ref
  );

  const inputClasses = clsx("text-input", {
    "text-input-filled": !!value,
    "text-input-error": error,
  });

  const labelClasses = clsx("text-input-label", {
    "text-input-filled-label": !!value,
  });

  return (
    <div className="relative">
      <input
        ref={ref}
        {...inputProps}
        className={inputClasses}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
      />
      <label {...labelProps} className={labelClasses}>
        {optional ? label : `${label}*`}
      </label>
      {error && (
        <span className="text-xs text-text-error" {...errorMessageProps}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextInput;
