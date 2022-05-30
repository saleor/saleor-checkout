import { envVars } from "@/constants";
import { CustomizationSettingsValues } from "@/types/api";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useStyles } from "./styles";

interface CheckoutPreviewFrameProps {
  settings: CustomizationSettingsValues;
  className?: string;
}

const CheckoutPreviewFrame: React.FC<CheckoutPreviewFrameProps> = ({
  settings,
  className,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [appMounted, setAppMounted] = useState(false);
  const classes = useStyles();

  const sendMessage = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        settings,
        envVars.previewUrl
      );
    }
  };

  const mountListener = (event: MessageEvent<"mounted" | undefined>) => {
    if (event.origin === envVars.previewUrl && event.data === "mounted") {
      setAppMounted(true);
    }
  };

  useEffect(() => {
    if (!appMounted) {
      window.addEventListener("message", mountListener);
    }

    sendMessage();

    return () => {
      window.removeEventListener("message", mountListener);
    };
  }, [settings, iframeRef.current]);

  useEffect(() => {
    if (appMounted) {
      sendMessage();
      window.removeEventListener("message", mountListener);
    }
  }, [appMounted]);

  return (
    <iframe
      ref={iframeRef}
      src={`${envVars.previewUrl}?checkoutToken=${envVars.previewCheckoutToken}`}
      className={clsx(classes.iframe, className)}
    />
  );
};
export default CheckoutPreviewFrame;
