import { Root } from "@saleor/checkout-storefront";

const apiUrl = process.env["REACT_APP_SALEOR_API_URL"];
const checkoutApiUrl = process.env["REACT_APP_CHECKOUT_APP_URL"] + `/api`;
const checkoutAppUrl = process.env["REACT_APP_CHECKOUT_APP_URL"];

export default function CheckoutSpa() {
  if (!apiUrl) {
    console.warn(`Missing REACT_APP_SALEOR_API_URL env variable`);
    return null;
  }
  if (!checkoutApiUrl) {
    console.warn(`Missing REACT_APP_CHECKOUT_APP_URL env variable`);
    return null;
  }
  if (!checkoutAppUrl) {
    console.warn(`Missing REACT_APP_CHECKOUT_APP_URL env variable`);
    return null;
  }

  return <Root env={{ apiUrl, checkoutApiUrl, checkoutAppUrl }} />;
}
