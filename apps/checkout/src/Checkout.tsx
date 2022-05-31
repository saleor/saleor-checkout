import PageHeader from "@/sections/PageHeader";
import { Summary } from "@/sections/Summary";
import { CheckoutForm } from "@/sections/CheckoutForm";
import { Suspense } from "react";
import { SummarySkeleton } from "@/sections/Summary/SummarySkeleton";
import { PageNotFound } from "@/sections/PageNotFound";
import { ErrorBoundary } from "react-error-boundary";
import { useCheckout } from "./hooks/useCheckout";
import { useAuthState } from "@saleor/sdk";
import "./CheckoutStyles.css";

export const Checkout = () => {
  // const { authenticating } = useAuthState();
  // const { checkout, loading } = useCheckout();

  // const isCheckoutInvalid = !loading && !checkout && !authenticating;

  // const isLoading = loading || authenticating;

  return (
    <div className="app">
      <ErrorBoundary FallbackComponent={PageNotFound}>
        <div className="page">
          <PageHeader />
          <div className="page-content">
            <CheckoutForm />
            <div className="page-divider" />
            <Suspense fallback={<SummarySkeleton />}>
              <Summary />
            </Suspense>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};
