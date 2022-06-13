import { CustomizationSettingsValues } from "@/checkout-app/types/api";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useStyles } from "./styles";

interface CheckoutPreviewFrameProps {
  settings: CustomizationSettingsValues;
  className?: string;
  checkoutUrl: string;
}

const CheckoutPreviewFrame: React.FC<CheckoutPreviewFrameProps> = ({
  settings,
  className,
  checkoutUrl,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [appMounted, setAppMounted] = useState(false);
  const classes = useStyles();

  const checkoutOrigin = new URL(checkoutUrl).origin;

  const sendMessage = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(settings, checkoutOrigin);
    }
  };

  const mountListener = (event: MessageEvent<"mounted" | undefined>) => {
    if (event.origin === checkoutOrigin && event.data === "mounted") {
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
  }, [settings, checkoutUrl, iframeRef.current]);

  useEffect(() => {
    if (appMounted) {
      sendMessage();
      window.removeEventListener("message", mountListener);
    }
  }, [appMounted]);

  return (
    <iframe
      ref={iframeRef}
      src={checkoutUrl}
      className={clsx(classes.iframe, className)}
    />
  );
};
export default CheckoutPreviewFrame;
