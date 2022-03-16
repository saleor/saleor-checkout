import React from "react";
import { Text } from "@components/Text";
import { Button } from "@components/Button";

export interface SignInFormContainerProps {
  title: string;
  redirectSubtitle?: string;
  redirectButtonLabel?: string;
  subtitle?: string;
  onSectionChange: () => void;
}

export const SignInFormContainer: React.FC<SignInFormContainerProps> = ({
  title,
  redirectButtonLabel,
  redirectSubtitle,
  subtitle,
  onSectionChange,
  children,
}) => (
  <div>
    <div className="flex flex-col mb-4">
      <div className="flex flex-row justify-between items-baseline">
        <Text variant="title">{title}</Text>
        <div className="flex flex-row">
          {redirectSubtitle && (
            <Text color="secondary" className="mr-2">
              {redirectSubtitle}
            </Text>
          )}
          {redirectButtonLabel && (
            <Button
              onClick={onSectionChange}
              variant="tertiary"
              title={redirectButtonLabel}
            />
          )}
        </div>
      </div>
      {subtitle && (
        <Text color="secondary" className="mt-3">
          {subtitle}
        </Text>
      )}
    </div>
    {children}
  </div>
);