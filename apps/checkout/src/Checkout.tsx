import "@/index.css";
import PageHeader from "@/sections/PageHeader";
import { Summary } from "@/sections/Summary";
import { CheckoutForm } from "@/sections/CheckoutForm";
import { Suspense, useMemo } from "react";
import { SummaryPlaceholder } from "@/sections/Summary/SummaryPlaceholder";
import { PageNotFound } from "@/sections/PageNotFound";
import { ErrorBoundary } from "react-error-boundary";
import { getCurrentRegion } from "@/lib/regions";
import { I18nProvider } from "@react-aria/i18n";
import { AppConfigProvider } from "@/providers/AppConfigProvider";
import { ErrorsProvider } from "@/providers/ErrorsProvider";
import { createSaleorClient, SaleorProvider } from "@saleor/sdk";
import { EnvVars, envVars as configEnvVars } from "@/lib/utils";
import { EnvProvider } from "./providers/EnvProvider";
import { createRoot } from "react-dom/client";

interface CheckoutProps {
  envVars?: EnvVars;
  location: Location;
}

export const Checkout: React.FC<CheckoutProps> = ({
  envVars: propsEnvVars,
  location,
}) => {
  const envVars = useMemo(
    () => ({
      ...configEnvVars,
      ...propsEnvVars,
    }),
    [propsEnvVars]
  );

  // temporarily need to use @apollo/client because saleor sdk
  // is based on apollo. to be changed
  const saleorClient = useMemo(
    () =>
      createSaleorClient({
        apiUrl: envVars.apiUrl,
        channel: "default-channel",
      }),
    [envVars]
  );

  return (
    <EnvProvider envVars={envVars} location={location}>
      {/* @ts-ignore because saleor provider still uses react types 17 where children are part of FC type */}
      <SaleorProvider client={saleorClient}>
        <I18nProvider locale={getCurrentRegion()}>
          <AppConfigProvider>
            <ErrorsProvider>
              <div className="app">
                {/* @ts-ignore - ErrorBoundary lacks explicit definition of children in props, as required since React 18 */}
                <ErrorBoundary FallbackComponent={PageNotFound}>
                  <div className="page">
                    <PageHeader />
                    <div className="page-content">
                      <CheckoutForm />
                      <div className="page-divider" />
                      <Suspense fallback={<SummaryPlaceholder />}>
                        <Summary />
                      </Suspense>
                    </div>
                  </div>
                </ErrorBoundary>
              </div>
            </ErrorsProvider>
          </AppConfigProvider>
        </I18nProvider>
      </SaleorProvider>
    </EnvProvider>
  );
};

export const renderCheckout = (
  container: Element | DocumentFragment,
  props: CheckoutProps
) => {
  const root = createRoot(container);
  root.render(<Checkout {...props} />);
};
