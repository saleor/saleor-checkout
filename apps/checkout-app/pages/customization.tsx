import { useRouter } from "next/router";
import CustomizationDetails from "@frontend/components/templates/CustomizationDetails";
import { UnknownSettingsValues } from "types/api";
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
  const customizationSettings = getCustomizationSettings(settingsValues);
  console.log(customizationSettings);

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (data: UnknownSettingsValues) => {
    console.log(data);
    const metadata = mapSettingsToMetadata(data);

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
      disabled={false}
      saveButtonBarState="default"
      onCanel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
export default withUrqlClient(() => ({
  url: API_URL,
  // fetchOptions: {
  //   headers: {
  //     Authorization:
  //       typeof window !== "undefined"
  //         ? `Bearer ${window.localStorage.getItem("auth_token")}`
  //         : "",
  //   },
  // },
}))(Customization);
