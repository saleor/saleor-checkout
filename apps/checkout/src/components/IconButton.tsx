import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { ButtonProps } from "./Button";

export const IconButton = (props: Omit<ButtonProps, "title">) => {
  const { children } = props;
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      className="outline-none focus:outline-none active:outline-none"
      ref={ref}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
