import React, { useState } from "react";
import { Text } from "@components/Text";
import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { SummaryItem } from "./SummaryItem";
import { CheckoutLine, useCheckoutQuery } from "@graphql";
import Divider from "@components/Divider";
import { Money } from "@components/Money";
import { ChevronDownIcon } from "@icons";
import { Transition } from "@headlessui/react";

interface SummaryProps {}

export const Summary: React.FC<SummaryProps> = ({}) => {
  const [isOpen, setOpen] = useState(true);
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
      <div className="summary-title">
        <div className="flex flex-row items-center">
          <Text title>{formatMessage("summary")}</Text>
          <img
            src={ChevronDownIcon}
            alt="chevron-down"
            onClick={() => setOpen(!isOpen)}
          />
        </div>
        <Money bold money={totalPrice} />
      </div>
      <Transition
        show={isOpen}
        unmount={false}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="w-full h-12" />
        <ul className="summary-items">
          {data?.checkout?.lines.map((line: CheckoutLine, idx) => (
            <SummaryItem line={line} key={line.id + idx} />
          ))}
        </ul>
        <div className="flex flex-col max-w-full px-6 ml-0 md:ml-18">
          <div className="summary-row">
            <Text bold>{formatMessage("subtotal")}</Text>
            <Money bold money={data?.checkout?.subtotalPrice?.gross} />
          </div>
          <Divider className="my-4" />
          <div className="summary-row mb-2">
            <Text color="secondary">{formatMessage("shippingCost")}</Text>
            <Money
              color="secondary"
              money={data?.checkout?.shippingPrice?.gross}
            />
          </div>
          <div className="summary-row">
            <Text color="secondary">
              {formatMessage("taxCost", {
                taxPercentage: getTaxPercentage(),
              })}
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
      </Transition>
    </div>
  );
};
