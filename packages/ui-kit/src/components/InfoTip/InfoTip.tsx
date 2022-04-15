import { FC } from "react";
import clsx from "clsx";

import styles from "./InfoTip.module.css";
import { Text } from "../Text";

export interface InfoTipProps {
  content: string;
  className?: string;
  alignment?: "left" | "right";
}

export const InfoTip: FC<InfoTipProps> = ({
  content,
  className,
  alignment = "left",
  ...rest
}) => (
  <Text
    as='div'
    className={clsx(
      styles.infotip,
      {
        [styles["infotip-triangle-left"]]: alignment === "left",
        [styles["infotip-triangle-right"]]: alignment === "right",
      },
      className
    )}
    {...rest}>
    {content}
  </Text>
);
