import React from "react";
import { Text } from "@components/Text";
import { useFormattedMessages } from "@lib/messages";
import { useCheckoutQuery } from "@graphql";
import { CheckoutLineItem, CheckoutLine } from "./CheckoutLineItem";

interface SummaryProps {}

export const Summary: React.FC<SummaryProps> = ({}) => {
  const formatMessage = useFormattedMessages();

  const [{ data }] = useCheckoutQuery({
    variables: { token: "f683e21b-7171-460d-96bf-50557b2fb5de" },
  });

  console.log(666, data?.checkout?.id);
  return (
    <div className="summary">
      <Text title>{formatMessage("summary")}</Text>
      <div className="w-full h-6" />
      {data?.checkout?.lines?.map((line: CheckoutLine) => (
        <CheckoutLineItem line={line} />
      ))}
    </div>
  );
};
