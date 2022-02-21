import PaymentMethodProviderDetails from "@templates/PaymentMethodProviderDetails";
import { useRouter } from "next/router";

export default function PaymentMethodProvider() {
  const router = useRouter();
  const { channelId, paymentMethodProviderId } = router.query;

  const paymentMethodsProviders = [
    {
      id: "1",
      name: "Payment Method Provider 1",
      active: true,
    },
    {
      id: "2",
      name: "Payment Method Provider 2",
      active: false,
    },
  ];
  const channel = [
    {
      id: "1",
      name: "B2B Channel",
      paymentMethods: [
        {
          id: "1",
          name: "Payment Gateway 1",
          providers: paymentMethodsProviders,
        },
        {
          id: "2",
          name: "Payment Gateway 2",
          providers: paymentMethodsProviders,
        },
        {
          id: "3",
          name: "Payment Gateway 3",
          providers: paymentMethodsProviders,
        },
      ],
    },
    {
      id: "2",
      name: "B2C Channel",
      paymentMethods: [
        {
          id: "4",
          name: "Payment Gateway 4",
          providers: paymentMethodsProviders,
        },
        {
          id: "5",
          name: "Payment Gateway 5",
          providers: paymentMethodsProviders,
        },
        {
          id: "6",
          name: "Payment Gateway 6",
          providers: paymentMethodsProviders,
        },
      ],
    },
  ].find((channel) => channel.id === channelId);
  const paymentMethod = channel?.paymentMethods.find(
    (paymentMethod) => paymentMethod.id === paymentMethodProviderId
  );

  return (
    <PaymentMethodProviderDetails
      selectedChannel={channel}
      selectedPaymentMethod={paymentMethod}
      paymentMethods={channel?.paymentMethods}
    />
  );
}
