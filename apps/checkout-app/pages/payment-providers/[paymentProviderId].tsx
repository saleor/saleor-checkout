import PaymentProviderDetails from "frontend/components/templates/PaymentProviderDetails";
import { PaymentProviderSettingsValues } from "types/api";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { API_URL } from "@constants";
import { useAuthContext } from "@frontend/hooks/useAuthContext";
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

  const authContext = useAuthContext();
  const { app } = useAuthData();
  const [metadataQuery] = usePrivateMetadataQuery({
    variables: {
      id: app,
    },
    context: authContext,
  });
  console.log(metadataQuery);
  const [metadataMutation, setPrivateMetadata] =
    useUpdatePrivateMetadataMutation();

  const settingsValues = mapMetadataToSettings(
    metadataQuery.data?.app?.privateMetadata || []
  );
  const paymentProviders = getPaymentProviderSettings(
    settingsValues.paymentProviders
  );
  console.log(settingsValues);

  const paymentProvider = paymentProviders.find(
    (paymentMethod) => paymentMethod.id === paymentProviderId
  );

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (data: PaymentProviderSettingsValues) => {
    console.log(data);
    const metadata = mapSettingsToMetadata({
      paymentProviders: {
        ...settingsValues.paymentProviders,
        ...data,
      },
    });

    setPrivateMetadata(
      {
        id: app,
        input: metadata,
      },
      authContext
    );
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
export default withUrqlClient(() => ({
  url: API_URL,
}))(PaymentProvider);
