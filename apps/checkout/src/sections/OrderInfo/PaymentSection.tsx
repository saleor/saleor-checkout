import { Button, Text } from "@saleor/ui-kit";

import {
  OrderAuthorizeStatusEnum,
  OrderChargeStatusEnum,
  PaymentChargeStatusEnum,
} from "@/graphql";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { usePay } from "@/hooks/usePay";

import { Section, SectionTitle } from "./Section";

export const PaymentSection = ({
  orderId,
  isPaid,
  chargeStatus,
  authorizeStatus,
}: {
  orderId: string;
  isPaid: boolean;
  paymentStatus: PaymentChargeStatusEnum;
  chargeStatus: OrderChargeStatusEnum;
  authorizeStatus: OrderAuthorizeStatusEnum;
}) => {
  const { loading, orderPay } = usePay();
  const formatMessage = useFormattedMessages();

  const handlePay = () => {
    orderPay({
      provider: "adyen",
      orderId,
    });
  };

  const renderPaymentDetails = () => {
    if (isPaid || chargeStatus === "FULL" || authorizeStatus === "FULL") {
      return <Text color="success">{formatMessage("paidOrderMessage")}</Text>;
    }

    return (
      <div>
        <Text color="error">{formatMessage("unpaidOrderMessage")}</Text>
        <Button
          className="mt-2"
          label="Pay for the order"
          onClick={handlePay}
          disabled={loading}
        />
      </div>
    );

    // TODO: Add support for partial payments
  };

  return (
    <Section>
      <SectionTitle>{formatMessage("paymentSection")}</SectionTitle>
      <div>{renderPaymentDetails()}</div>
    </Section>
  );
};
