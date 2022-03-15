import { EyeHiddenIcon, EyeIcon } from "@icons";
import { ForwardedRef, useState } from "react";
import { forwardRef } from "react";
import { FieldValues } from "react-hook-form";
import { IconButton } from "./IconButton";
import { TextInput, TextInputProps } from "./TextInput";

export const PasswordInput = forwardRef(
  <TFormData extends FieldValues = FieldValues>(
    props: TextInputProps<TFormData>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
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
  }
);
