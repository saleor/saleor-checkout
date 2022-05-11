import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { ControlFormData } from "@/hooks/useGetInputProps";
import { EyeHiddenIcon, EyeIcon } from "@/icons";
import { ForwardedRef, forwardRef, useState } from "react";
import { Control } from "react-hook-form";
import { IconButton } from "./IconButton";
import { TextInput, TextInputProps } from "./TextInput";

const PasswordInputComponent = <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const formatMessage = useFormattedMessages();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <TextInput
        ref={ref}
        {...props}
        type={passwordVisible ? "text" : "password"}
      />
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

export const PasswordInput = forwardRef(PasswordInputComponent) as <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof PasswordInputComponent>;
