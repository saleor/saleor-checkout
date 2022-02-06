import React from "react";
import { useButton } from "@react-aria/button";
import { useRef } from "react";

type IconButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children } = props;
  const ref = useRef<HTMLButtonElement>();
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

export default IconButton;
