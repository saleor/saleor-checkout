import PaymentProviderDetails from "@templates/PaymentProviderDetails";
import { paymentProviders } from "consts";
import { useRouter } from "next/router";

export default function PaymentProvider() {
  const router = useRouter();
  const { paymentProviderId, channelId } = router.query;

  const paymentProvider = paymentProviders.find(
    (paymentMethod) => paymentMethod.id === paymentProviderId
  );

  return (
    <PaymentProviderDetails
      selectedPaymentProvider={paymentProvider}
      channelId={channelId?.toString()}
    />
  );
}
