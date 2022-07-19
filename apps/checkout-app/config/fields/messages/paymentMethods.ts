import { defineMessages } from "react-intl";
import { PaymentMethodID } from "@saleor/checkout-common-types";

export const paymentMethodsMessages = defineMessages<PaymentMethodID>({
  creditCard: {
    defaultMessage: "Credit card",
    description: "payment method",
  },
  applePay: {
    defaultMessage: "Apple Pay",
    description: "payment method",
  },
  paypal: {
    defaultMessage: "PayPal",
    description: "payment method",
  },
});
