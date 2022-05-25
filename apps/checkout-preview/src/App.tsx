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

const getSettingsValues = (): CustomizationSettingsValues | undefined => {
  var url = window.location.search.substring(1);
  var qArray = url.split("&");
  const settingsParam = qArray.find((qArrayItem) => {
    var pArr = qArrayItem.split("=");
    return pArr[0] === "settings";
  });
  const encodedSettings = settingsParam?.split("=")[1];
  const decodedSettings =
    encodedSettings && decodeURIComponent(encodedSettings);
  return decodedSettings && JSON.parse(decodedSettings);
};

function App() {
  const [previewUrl, setPreviewUrl] = React.useState(document.location.href);

  const previewSettings = getSettingsValues();

  useEffect(() => {
    var bodyList = document.querySelector("body");

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (previewUrl != document.location.href) {
          setPreviewUrl(document.location.href);
          /* Changed ! your code here */
        }
      });
    });

    var config = {
      childList: true,
      subtree: true,
    };

    if (bodyList) {
      observer.observe(bodyList, config);
    }

    return () => observer.disconnect();
  }, []);

  console.log("iframe previewSettings:", previewSettings);

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
