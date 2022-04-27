import { createRoot } from "react-dom/client";
import { createClient, Provider as UrqlProvider } from "urql";

// import "@/index.css";
import { Checkout } from "@/Checkout";
import reportWebVitals from "./reportWebVitals";
import { createFetch, createSaleorClient, SaleorProvider } from "@saleor/sdk";
import { envVars } from "@/lib/utils";
import React from "react";

const authorizedFetch = createFetch();

const client = createClient({
  url: envVars.apiUrl,
  suspense: true,
  requestPolicy: "cache-first",
  fetch: authorizedFetch,
});

// // temporarily need to use @apollo/client because saleor sdk
// // is based on apollo. to be changed
// const saleorClient = createSaleorClient({
//   apiUrl: envVars.apiUrl,
//   channel: "default-channel",
// });

const root = createRoot(document.getElementById("root")!);

root.render(
  // disabled temporarily because of headless-ui transition not working
  // yet with React 18 https://github.com/tailwindlabs/headlessui/issues/681
  // <React.StrictMode>
  // @ts-ignore because saleor provider still uses react types 17 where
  // children are part of FC type
  // <SaleorProvider client={saleorClient}>
  <UrqlProvider value={client}>
    <Checkout location={location} />
  </UrqlProvider>
  // </SaleorProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
