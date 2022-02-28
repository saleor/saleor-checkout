import { Customization, PaymentMethod, PaymentProvider } from "types";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "payment-method-1",
    name: "Payment Method 1",
  },
  {
    id: "payment-method-2",
    name: "Payment Method 2",
  },
  {
    id: "payment-method-3",
    name: "Payment Method 3",
  },
];

export const molliePaymentProvider: PaymentProvider<"mollie"> = {
  id: "mollie",
  label: "Mollie",
  settings: [
    {
      id: "partner-id", // To be used as reference to settings values in the backend
      label: "Partner ID", // TODO: change to intl message
      type: "string",
    },
    {
      id: "live-test-api-key", // To be used as reference to settings values in the backend
      label: "Live Test API Key", // TODO: change to intl message
      type: "string",
    },
  ],
};
export const examplePaymentProvider: PaymentProvider<"example"> = {
  id: "example",
  label: "Example",
  settings: [
    {
      id: "key-1",
      label: "Key 1",
      type: "string",
    },
    {
      id: "key-2",
      label: "Key 2",
      type: "string",
    },
  ],
};
export const paymentProviders = [molliePaymentProvider, examplePaymentProvider];

export const brandingCustomization: Customization<"branding"> = {
  id: "branding",
  label: "Branding",
  settings: [
    {
      id: "active",
      label: "Active",
      type: "color",
    },
    {
      id: "text",
      label: "Text",
      type: "color",
    },
    {
      id: "bg",
      label: "BG",
      type: "color",
    },
    {
      id: "error",
      label: "Error",
      type: "color",
    },
    {
      id: "success",
      label: "Success",
      type: "color",
    },
  ],
};
export const sectionsCustomization: Customization<"product-settings"> = {
  id: "product-settings",
  label: "Product settings",
  settings: [
    {
      id: "low-stock-threshold",
      label: "Low stock treshold",
      type: "string",
    },
  ],
};
export const customizations = [brandingCustomization, sectionsCustomization];
