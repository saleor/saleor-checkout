import { useRouter } from "next/router";
import CustomizationDetails from "@templates/CustomizationDetails";
import { useCustomizationSettings } from "api/app/api";
import { UnknownSettingsValues } from "api/app/types";

export default function Customization() {
  const router = useRouter();
  const options = useCustomizationSettings();

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
}
