import Dynamic from "next/dynamic";
import { Suspense } from "react";

const CheckoutStoreFront = Dynamic(
  async () => {
    const { Root } = await import("@saleor/checkout-storefront");
    return Root;
  },
  {
    ssr: false,
    suspense: true,
  }
);

const apiUrl = process.env["NEXT_PUBLIC_SALEOR_API_URL"];
const checkoutApiUrl = process.env["NEXT_PUBLIC_CHECKOUT_APP_URL"] + `/api`;
const checkoutAppUrl = process.env["NEXT_PUBLIC_CHECKOUT_APP_URL"];

export default function CheckoutSpa() {
  if (!apiUrl) {
    console.warn(`Missing NEXT_PUBLIC_SALEOR_API_URL env variable`);
    return null;
  }
  if (!checkoutApiUrl) {
    console.warn(`Missing NEXT_PUBLIC_CHECKOUT_APP_URL env variable`);
    return null;
  }
  if (!checkoutAppUrl) {
    console.warn(`Missing NEXT_PUBLIC_CHECKOUT_APP_URL env variable`);
    return null;
  }

  return (
    <Suspense fallback={null}>
      <CheckoutStoreFront env={{ apiUrl, checkoutApiUrl, checkoutAppUrl }} />
    </Suspense>
  );
}
