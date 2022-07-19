import { Root } from "@saleor/checkout-storefront";

export default function CheckoutSpa() {
  const apiUrl = process.env["REACT_APP_SALEOR_API_URL"];
  const checkoutApiUrl = process.env["REACT_APP_CHECKOUT_APP_URL"] + `/api`;
  const checkoutAppUrl = process.env["REACT_APP_CHECKOUT_APP_URL"];

  if (!apiUrl || !checkoutApiUrl || !checkoutAppUrl) {
    console.warn(
      `Missing one of the env variables: REACT_APP_SALEOR_API_URL, REACT_APP_CHECKOUT_APP_URL, REACT_APP_CHECKOUT_APP_URL`
    );
    return;
  }

  return <Root env={{ apiUrl, checkoutApiUrl, checkoutAppUrl }} />;
}
