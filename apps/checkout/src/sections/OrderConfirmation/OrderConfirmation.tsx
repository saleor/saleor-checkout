import { Suspense } from "react";

import PageHeader from "@/sections/PageHeader";
import { FinalizedSummary } from "@/sections/Summary";
import { OrderInfo } from "@/sections/OrderInfo";
import { Title } from "@/components/Title";
import { Text } from "@saleor/ui-kit";
import { useOrder } from "@/hooks/useOrder";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { Divider } from "@/components/Divider";
import { SummarySkeleton } from "@/sections/Summary/SummarySkeleton";
import "./OrderConfirmationStyles.css";

export const OrderConfirmation = ({ orderId }: { orderId: string }) => {
  const { order } = useOrder(orderId);
  const formatMessage = useFormattedMessages();

  return (
    <div className="page">
      <header className="order-header">
        <PageHeader />
        <Title>
          {formatMessage("orderConfirmationTitle", { number: order.number })}
        </Title>
        <Text size="md" className="max-w-[692px]">
          {formatMessage("orderConfirmationSubtitle", {
            email: order.userEmail!,
          })}
        </Text>
      </header>
      <Divider />
      <main className="order-content overflow-hidden">
        <OrderInfo order={order} />
        <div className="order-divider" />
        <Suspense fallback={<SummarySkeleton />}>
          <FinalizedSummary order={order} />
        </Suspense>
      </main>
    </div>
  );
};
