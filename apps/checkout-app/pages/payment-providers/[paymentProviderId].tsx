import PaymentProviderDetails from "frontend/components/templates/PaymentProviderDetails";
import { PaymentProviderSettingsValues } from "types/api";
import { useRouter } from "next/router";
import { useAuthData } from "@frontend/hooks/useAuthData";
import {
  usePrivateMetadataQuery,
  useUpdatePrivateMetadataMutation,
} from "@graphql";
import { mapMetadataToSettings, mapSettingsToMetadata } from "@frontend/utils";
import { getPaymentProviderSettings } from "@frontend/data";

const PaymentProvider = () => {
  const router = useRouter();
  const { paymentProviderId, channelId } = router.query;

  const { app } = useAuthData();
  const [metadataQuery] = usePrivateMetadataQuery({
    variables: {
      id: app,
    },
  });
  const [metadataMutation, setPrivateMetadata] =
    useUpdatePrivateMetadataMutation();

  const settingsValues = mapMetadataToSettings(
    metadataQuery.data?.app?.privateMetadata || []
  );
  const paymentProviders = getPaymentProviderSettings(
    settingsValues.paymentProviders
  );

  const paymentProvider = paymentProviders.find(
    (paymentMethod) => paymentMethod.id === paymentProviderId
  );

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (data: PaymentProviderSettingsValues) => {
    const metadata = mapSettingsToMetadata({
      paymentProviders: {
        ...settingsValues.paymentProviders,
        ...data,
      },
    });

    setPrivateMetadata({
      id: app,
      input: metadata,
    });
  };

  return (
    <PaymentProviderDetails
      selectedPaymentProvider={paymentProvider}
      channelId={channelId?.toString()}
      saveButtonBarState="default"
      loading={metadataQuery.fetching || metadataMutation.fetching}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
export default PaymentProvider;
