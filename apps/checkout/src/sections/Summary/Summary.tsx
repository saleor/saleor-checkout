import React from "react";
import { Text } from "@components/Text";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { CheckoutLine } from "./types";
import { LineItem } from "./LineItem";
import { useCheckoutQuery } from "@graphql";
import Divider from "@components/Divider";
import { Money } from "@components/Money";
import { useFormattedMoney } from "@hooks/useFormattedMoney";

interface SummaryProps {}

export const Summary: React.FC<SummaryProps> = ({}) => {
  const [{ data }] = useCheckoutQuery({
    variables: { token: "f683e21b-7171-460d-96bf-50557b2fb5de" },
  });

  const formatMessage = useFormattedMessages();

  const totalPrice = data?.checkout?.totalPrice?.gross;
  const taxCost = data?.checkout?.totalPrice?.tax;

  const getTaxPercentage = (): number => {
    if (!totalPrice || !taxCost) {
      return 0;
    }

    return taxCost?.amount / totalPrice?.amount;
  };

  return (
    <div className="summary">
      <Text title>{formatMessage("summary")}</Text>
      <div className="w-full h-6" />
      {data?.checkout.lines?.map((line: CheckoutLine) => (
        <LineItem line={line} key={line.id} />
      ))}
      <div className="summary-row">
        <Text bold>{formatMessage("subtotal")}</Text>
        <Money bold money={data?.checkout?.subtotalPrice?.gross} />
      </div>
      <Divider className="my-4" />
      <div className="summary-row mb-2">
        <Text color="secondary">{formatMessage("shippingCost")}</Text>
        <Money color="secondary" money={data?.checkout?.shippingPrice?.gross} />
      </div>
      <div className="summary-row">
        <Text color="secondary">
          {formatMessage("taxCost", { taxPercentage: getTaxPercentage() })}
        </Text>
        <Money color="secondary" money={taxCost} />
      </div>
      <Divider className="my-4" />
      <div className="summary-row">
        <Text size="lg" bold>
          {formatMessage("total")}
        </Text>
        <Money bold money={totalPrice} />
      </div>
    </div>
  );
};
