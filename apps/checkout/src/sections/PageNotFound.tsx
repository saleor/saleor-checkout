import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { Text } from "@components/Text";
import React from "react";
import Button from "@components/Button";
import { SaleorLogo } from "@images";

export const PageNotFound = () => {
  const formatMessage = useFormattedMessages();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pt-12">
      <div className="w-full flex justify-center">
        <img src={SaleorLogo} alt="logo" className="logo" />
      </div>
      <div className="h-full flex flex-col items-center justify-center mb-22 max-w-80">
        <Text title className="mb-4">
          {formatMessage("problemTitle")}
        </Text>
        <Text className="mb-4">{formatMessage("problemDescription")}</Text>
        <Button title={formatMessage("goBackToStore")} />
      </div>
    </div>
  );
};
