import { app } from "@/frontend/misc/app";
import { actions } from "@saleor/app-bridge";
import { useEffect } from "react";

const OrderConfirmationRedirect = () => {
  useEffect(() => {
    app?.dispatch(
      actions.Redirect({
        to: "https://checkout.new-payments.saleor.io/?order=c77462f3-1bce-4b25-b83a-ab00d831eebe",
        newContext: true,
      })
    );
  }, []);

  return null;
};

export default OrderConfirmationRedirect;
