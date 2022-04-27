import { Label as UiKitLabel } from "@saleor/ui-kit";
import React, { PropsWithChildren } from "react";

interface LabelProps {
  htmlFor: string;
}

export const Label: React.FC<PropsWithChildren<LabelProps>> = ({ ...rest }) => (
  <UiKitLabel {...rest} />
);
