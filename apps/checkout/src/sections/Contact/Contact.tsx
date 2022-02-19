import { useFormattedMessages } from "@hooks/useFormattedMessages";
import React from "react";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";

interface ContactProps {}

export const Contact: React.FC<ContactProps> = ({}) => {
  const formatMessage = useFormattedMessages();

  return (
    <div>
      <div className="flex flex-row justify-between items-baseline">
        <Text title>{formatMessage("contact")}</Text>
        <div className="flex flex-row">
          <Text color="secondary" className="mr-2">
            {formatMessage("haveAccount")}
          </Text>
          <Button variant="tertiary" title={formatMessage("signIn")} />
        </div>
      </div>
      <TextInput label="Email address" className="mt-4" />
    </div>
  );
};
