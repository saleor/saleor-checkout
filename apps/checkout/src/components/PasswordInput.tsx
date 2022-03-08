import { EyeHiddenIcon, EyeIcon } from "@icons";
import React, { useState } from "react";
import { forwardRef } from "react";
import { IconButton } from "./IconButton";
import { TextInput, TextInputProps } from "./TextInput";

export const PasswordInput: React.FC<TextInputProps> = forwardRef<
  HTMLInputElement,
  TextInputProps
>((props, ref) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <TextInput
      {...props}
      type={passwordVisible ? "text" : "password"}
      ref={ref}
      icon={
        <IconButton onPress={() => setPasswordVisible(!passwordVisible)}>
          <img src={passwordVisible ? EyeIcon : EyeHiddenIcon} alt="" />
        </IconButton>
      }
    />
  );
});
