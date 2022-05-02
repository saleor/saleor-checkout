import { Suspense } from "react";

import PageHeader from "@/sections/PageHeader";
import { FinalizedSummary } from "@/sections/Summary";
import { OrderDataSummary } from "@/sections/OrderDataSummary";
import { SummaryPlaceholder } from "@/sections/Summary/SummaryPlaceholder";
import { Title } from "@/components/Title";
import { Text } from "@/components/Text";
import { useOrder } from "@/hooks/useOrder";

export const OrderConfirmed = ({ orderToken }: { orderToken: string }) => {
  const { order } = useOrder(orderToken);

  return (
    <div className="page">
      <header className="order-header">
        <PageHeader />
        <Title>Order #{order.number} confirmed</Title>
        <Text size="md" className="max-w-[692px]">
          Thank you for placing your order. We’ve received it and we will
          contact you as soon as your package is shipped. A confirmation email
          has been sent to {order.userEmail}
        </Text>
      </header>
      <div className="divider" />
      <main className="order-content overflow-hidden">
        <OrderDataSummary order={order} />
        <div className="order-divider" />
        <Suspense fallback={<SummaryPlaceholder />}>
          <FinalizedSummary order={order} />
        </Suspense>
      </main>
    </div>
  );
};
