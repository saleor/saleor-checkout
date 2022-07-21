import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import invariant from "ts-invariant";
import { Root } from "./index";

export function App() {
  const apiUrl = process.env["SALEOR_API_URL"];
  const checkoutApiUrl = process.env["CHECKOUT_APP_URL"] + `/api`;
  const checkoutAppUrl = process.env["CHECKOUT_APP_URL"];
  invariant(apiUrl, `Missing SALEOR_API_URL!`);
  invariant(checkoutApiUrl, `Missing CHECKOUT_APP_URL!`);
  invariant(checkoutAppUrl, `Missing CHECKOUT_APP_URL!`);

  return (
    <div className="App">
      <Root env={{ apiUrl, checkoutApiUrl, checkoutAppUrl }} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
