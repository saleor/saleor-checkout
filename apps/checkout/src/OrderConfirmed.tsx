import PageHeader from "@/sections/PageHeader";
import { FinalizedSummary } from "@/sections/Summary";
import { OrderDataSummary } from "@/sections/OrderDataSummary";
import { Suspense } from "react";
import { SummaryPlaceholder } from "@/sections/Summary/SummaryPlaceholder";
import { PageNotFound } from "@/sections/PageNotFound";
import { ErrorBoundary } from "react-error-boundary";
import { Title } from "@/components/Title";
import { Text } from "@/components/Text";
import { useOrder } from "@/hooks/useOrder";

export const OrderConfirmed = () => {
  const { order } = useOrder();

  return (
    <div className="app">
      {/* @ts-ignore - ErrorBoundary lacks explicit definition of children in props, as required since React 18 */}
      <ErrorBoundary FallbackComponent={PageNotFound}>
        <div className="page">
          <header className="order-header">
            <PageHeader />
            <Title>Order #{order.number} confirmed</Title>
            <Text size="md" className="max-w-[692px]">
              Thank you for placing your order. We’ve received it and we will
              contact you as soon as your package is shipped. A confirmation
              email has been sent to {order.userEmail}
            </Text>
          </header>
          <div className="divider" />
          <main className="order-content">
            <OrderDataSummary />
            <div className="order-divider" />
            <Suspense fallback={<SummaryPlaceholder />}>
              <FinalizedSummary />
            </Suspense>
          </main>
        </div>
      </ErrorBoundary>
    </div>
  );
};
