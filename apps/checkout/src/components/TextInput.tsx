import clsx from "clsx";
import React from "react";
import { useTextField } from "@react-aria/textfield";

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  optional?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const { label, optional = false, error, errorMessage, ...rest } = props;

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
      <input ref={ref} {...inputProps} className={inputClasses} {...rest} />
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
