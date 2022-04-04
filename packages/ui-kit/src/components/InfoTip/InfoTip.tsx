import { FC } from "react";
import clsx from "clsx";

import styles from "./InfoTip.module.css";
import { Text } from "../Text";

export interface InfoTipProps {
  content: string;
  className?: string;
  indicatorPosition?: "left" | "right";
}

export const InfoTip: FC<InfoTipProps> = ({
  content,
  className,
  indicatorPosition = "left",
  ...rest
}) => (
  <Text
    as='div'
    className={clsx(
      styles.infotip,
      {
        [styles["infotip-triangle-left"]]: indicatorPosition === "left",
        [styles["infotip-triangle-right"]]: indicatorPosition === "right",
      },
      className
    )}
    {...rest}>
    {content}
  </Text>
);
