import { CustomizationSettingsValues } from "@/types/api";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStyles } from "./styles";

interface CheckoutPreviewFrameProps {
  settings: CustomizationSettingsValues;
}

const CheckoutPreviewFrame: React.FC<CheckoutPreviewFrameProps> = ({
  settings,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [appMounted, setAppMounted] = useState(false);
  const classes = useStyles();

  const previewUrl = "https://checkout-preview.vercel.app"; // TODO: use the real checkout url

  const sendMessage = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(settings, previewUrl);
    }
  };

  const mountListener = (event: MessageEvent<"mounted" | undefined>) => {
    if (event.origin === previewUrl && event.data === "mounted") {
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

  return <iframe ref={iframeRef} src={previewUrl} className={classes.iframe} />;
};
export default CheckoutPreviewFrame;
