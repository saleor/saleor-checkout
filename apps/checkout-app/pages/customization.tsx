import { useRouter } from "next/router";
import CustomizationDetails from "@frontend/components/templates/CustomizationDetails";
import { getCustomizationSettings } from "mocks/app";
import { UnknownSettingsValues } from "types/api";
import { withUrqlClient } from "next-urql";
import { useApp } from "@frontend/hooks/useApp";
import { useCustomizationSettings } from "@frontend/hooks/useCustomizationSettings";

const Customization = () => {
  const router = useRouter();
  const options = getCustomizationSettings();
  const options2 = useCustomizationSettings();
  const app = useApp();
  console.log(app);
  console.log(app?.getState());

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (data: UnknownSettingsValues) => {
    console.log(data);
  };

  return (
    <CustomizationDetails
      options={options}
      disabled={false}
      saveButtonBarState="default"
      onCanel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
export default withUrqlClient(() => ({
  url: process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    headers: {
      Authorization:
        typeof window !== "undefined"
          ? `Bearer ${window.localStorage.getItem("auth_token")}`
          : "",
    },
  },
}))(Customization);
