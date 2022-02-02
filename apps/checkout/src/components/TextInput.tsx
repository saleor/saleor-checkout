import clsx from "clsx";
import React from "react";

interface TextInputProps {
  onChange: (value: string) => void;
  value: string;
  name: string;
  label: string;
  optional?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  value,
  name,
  label,
  optional = false,
  error,
  errorMessage,
}) => {
  const inputClasses = clsx("text-input", {
    "text-input-filled": !!value,
    "text-input-error": error,
  });

  const labelClasses = clsx("text-input-label", {
    "text-input-filled-label": !!value,
  });

  const errorFieldId = `${name}Error`;

  return (
    <div className="relative">
      <input
        id={name}
        type="text"
        aria-describedby={errorFieldId}
        className={inputClasses}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
      />
      <label htmlFor={name} className={labelClasses}>
        {optional ? label : `${label}*`}
      </label>
      {error && (
        <span className="text-xs text-text-error" id={errorFieldId}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextInput;
