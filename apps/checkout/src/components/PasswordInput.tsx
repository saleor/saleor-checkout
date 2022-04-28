import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { ControlFormData } from "@/hooks/useGetInputProps";
import { EyeHiddenIcon, EyeIcon } from "@/icons";
import { useState } from "react";
import { Control } from "react-hook-form";
import { IconButton } from "./IconButton";
import { TextInput, TextInputProps } from "./TextInput";

export const PasswordInput = <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData>
) => {
  const formatMessage = useFormattedMessages();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <TextInput {...props} type={passwordVisible ? "text" : "password"} />
      <div className="password-input-icon">
        <IconButton
          variant="bare"
          ariaLabel={formatMessage("passwordVisibilityLabel")}
          onClick={() => setPasswordVisible(!passwordVisible)}
          icon={<img src={passwordVisible ? EyeIcon : EyeHiddenIcon} alt="" />}
        />
      </div>
    </div>
  );
};
