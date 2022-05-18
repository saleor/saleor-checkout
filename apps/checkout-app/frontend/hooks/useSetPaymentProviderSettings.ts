import { envVars } from "@/constants";
import { PaymentProviderSettingsValues } from "@/types/api";
import { useEffect } from "react";
import { usePrivateSettings } from "./usePrivateSettings";
import { useSetRequest } from "./useSetRequest";

export const useSetPaymentProviderSettings = () => {
  const { privateSettings, setPrivateSettings } = usePrivateSettings();

  const [setPaymentProviderSettings, setPaymentProviderSettingsRequest] =
    useSetRequest<
      PaymentProviderSettingsValues<"unencrypted">,
      PaymentProviderSettingsValues<"unencrypted">
    >(`${envVars.appUrl}/api/set-payment-provider-settings`);

  useEffect(() => {
    if (setPaymentProviderSettings.data) {
      setPrivateSettings({
        ...privateSettings,
        paymentProviders: {
          ...privateSettings.paymentProviders,
          ...setPaymentProviderSettings.data,
        },
      });
    }
  }, [setPaymentProviderSettings.data]);

  return [
    {
      ...setPaymentProviderSettings,
      data: privateSettings.paymentProviders,
    },
    setPaymentProviderSettingsRequest,
  ] as const;
};
