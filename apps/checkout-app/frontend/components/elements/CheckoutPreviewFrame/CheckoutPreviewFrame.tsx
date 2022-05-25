import { CustomizationSettingsValues } from "@/types/api";
import { useStyles } from "./styles";

interface CheckoutPreviewFrameProps {
  settings: CustomizationSettingsValues;
}

const CheckoutPreviewFrame: React.FC<CheckoutPreviewFrameProps> = ({
  settings,
}) => {
  const classes = useStyles();

  const encodedSettings =
    settings && encodeURIComponent(JSON.stringify(settings));

  const previewUrl = "https://checkout-preview.vercel.app"; // TODO: use the real checkout url
  const previewFullUrl = encodedSettings
    ? `${previewUrl}?settings=${encodedSettings}`
    : previewUrl;

  return <iframe src={previewFullUrl} className={classes.iframe} />;
};
export default CheckoutPreviewFrame;
