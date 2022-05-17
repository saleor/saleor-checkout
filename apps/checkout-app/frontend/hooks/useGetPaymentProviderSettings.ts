import { envVars } from "@/constants";
import { PaymentProviderSettingsValues } from "@/types/api";
import { useEffect } from "react";
import { GetRequestOpts, useGetRequest } from "./useGetRequest";
import { usePrivateSettings } from "./usePrivateSettings";

export const useGetPaymentProviderSettings = (opts?: GetRequestOpts) => {
  const { privateSettings, setPrivateSettings } = usePrivateSettings();

  const getPaymentProviderSettings =
    useGetRequest<PaymentProviderSettingsValues>(
      `${envVars.appUrl}/api/payment-provider-settings`,
      opts
    );

  useEffect(() => {
    if (getPaymentProviderSettings.data) {
      setPrivateSettings({
        ...privateSettings,
        paymentProviders: {
          ...privateSettings.paymentProviders,
          ...getPaymentProviderSettings.data,
        },
      });
    }
  }, [getPaymentProviderSettings.data]);

  return {
    ...getPaymentProviderSettings,
    data: privateSettings.paymentProviders,
  };
};
