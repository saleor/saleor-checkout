import { useRouter } from "next/router";
import CustomizationDetails from "@frontend/components/templates/CustomizationDetails";
import { CustomizationSettingsValues } from "types/api";
import { withUrqlClient } from "next-urql";
import { useAuthContext } from "@frontend/hooks/useAuthContext";
import {
  usePrivateMetadataQuery,
  useUpdatePrivateMetadataMutation,
} from "@graphql";
import { mapMetadataToSettings, mapSettingsToMetadata } from "@frontend/utils";
import { getCustomizationSettings } from "@frontend/data";
import { API_URL } from "@constants";
import { useAuthData } from "@frontend/hooks/useAuthData";

const Customization = () => {
  const router = useRouter();
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
  const customizationSettings = getCustomizationSettings(
    settingsValues.customizations
  );
  console.log(settingsValues);

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (data: CustomizationSettingsValues) => {
    console.log(data);
    const metadata = mapSettingsToMetadata({
      customizations: data,
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
    <CustomizationDetails
      options={customizationSettings}
      loading={metadataQuery.fetching || metadataMutation.fetching}
      saveButtonBarState="default"
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
export default withUrqlClient(() => ({
  url: API_URL,
}))(Customization);
