import React from "react";
import { Text } from "@components/Text";
import { Button } from "@components/Button";

export interface SignInFormContainerProps {
  title: string;
  redirectSubtitle?: string;
  redirectButtonLabel?: string;
  onSectionChange: () => void;
}

export const SignInFormContainer: React.FC<SignInFormContainerProps> = ({
  title,
  redirectButtonLabel,
  redirectSubtitle,
  onSectionChange,
  children,
}) => (
  <div>
    <div className="flex flex-row justify-between items-baseline">
      <Text variant="title" className="mb-4">
        {title}
      </Text>
      <div className="flex flex-row">
        {redirectSubtitle && (
          <Text color="secondary" className="mr-2">
            {redirectSubtitle}
          </Text>
        )}
        {redirectButtonLabel && (
          <Button
            onPress={onSectionChange}
            variant="tertiary"
            title={redirectButtonLabel}
          />
        )}
      </div>
    </div>
    {children}
  </div>
);
