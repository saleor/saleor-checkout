import PaymentProviderDetails from "@templates/PaymentProviderDetails";
import { usePaymentProviderSettings } from "api/app/api";
import { UnknownSettingsValues } from "api/app/types";
import { useRouter } from "next/router";

export default function PaymentProvider() {
  const router = useRouter();
  const { paymentProviderId, channelId } = router.query;

  const paymentProviders = usePaymentProviderSettings();
  const paymentProvider = paymentProviders.find(
    (paymentMethod) => paymentMethod.id === paymentProviderId
  );

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (data: UnknownSettingsValues) => {
    console.log(data);
  };

  return (
    <PaymentProviderDetails
      selectedPaymentProvider={paymentProvider}
      channelId={channelId?.toString()}
      onCanel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
}
