import {
  IconButton as UiKitIconButton,
  IconButtonProps as UiKitIconButtonProps,
} from "@saleor/ui-kit";
import { ButtonProps } from "./Button";

export type IconButtonProps = Pick<ButtonProps, "ariaLabel"> &
  UiKitIconButtonProps;

export const IconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  ...rest
}) => <UiKitIconButton aria-label={ariaLabel} {...rest} />;
