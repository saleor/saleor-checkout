import React from "react";
import "./App.css";
import { useEffect } from "react";
import Logo from "./logo";

export type CustomizationID = "branding" | "productSettings";
export type BrandingCustomizationSettingID =
  | "buttonBgColorPrimary"
  | "buttonBgColorHover"
  | "borderColorPrimary"
  | "errorColor"
  | "successColor"
  | "textColor"
  | "buttonTextColor"
  | "logoUrl";
export type ProductCustomizationSettingID = "lowStockThreshold";
export type CustomizationSettingID<P extends CustomizationID> =
  P extends "branding"
    ? BrandingCustomizationSettingID
    : P extends "productSettings"
    ? ProductCustomizationSettingID
    : never;

export type CustomizationSettingsValues = {
  [P in CustomizationID]?: {
    [K in CustomizationSettingID<P>]?: string;
  };
};

const appUrl =
  "https://saleor-checkout-app-git-checkout-preview-test-saleorcommerce.vercel.app/"; // TODO: in real checkout implementation should be changed to env variable

function App() {
  const [previewSettings, setPreviewSettings] =
    React.useState<CustomizationSettingsValues>();

  useEffect(() => {
    const eventListener = (
      event: MessageEvent<CustomizationSettingsValues | undefined>
    ) => {
      if (event.origin === appUrl) {
        setPreviewSettings(event.data);
      }
    };

    window.addEventListener("message", eventListener);

    window.parent.postMessage("mounted", appUrl);

    return () => {
      window.removeEventListener("message", eventListener);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Logo color={previewSettings?.branding?.buttonBgColorPrimary} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: previewSettings?.branding?.buttonBgColorPrimary,
          }}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
