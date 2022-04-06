import { getEnvVars } from "@lib/utils";

export const getPaymentProviders = () =>
  fetch(`${getEnvVars().configAppUrl}/active-payment-providers/channel-1`);

export const pay = ({
  checkoutId,
  totalAmount,
  provider,
}: {
  checkoutId: string;
  totalAmount: number;
  provider: string;
}) =>
  fetch(`${getEnvVars().checkoutAppUrl}/pay`, {
    method: "POST",
    body: JSON.stringify({
      provider,
      checkoutId,
      totalAmount,
    }),
  });
