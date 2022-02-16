import PageHeader from "@sections/PageHeader";
import { Summary } from "@sections/Summary";
import CheckoutForm from "@sections/CheckoutForm";
import { Suspense } from "react";

export const Checkout = () => {
  return (
    <div className="app">
      <div className="page">
        <PageHeader />
        <div className="page-content">
          <CheckoutForm />
          <div className="page-divider" />
          <Suspense fallback={"Loading..."}>
            <Summary />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
