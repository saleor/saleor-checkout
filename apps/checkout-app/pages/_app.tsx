import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@saleor/macaw-ui";
import { IntlProvider } from "react-intl";
import { Provider as ClientProvider } from "urql";
import { useFormattedMessages } from "@/frontend/hooks/useFormattedMessages";
import AppContainer from "@/frontend/components/elements/AppContainer";
import AppProvider from "@/frontend/components/elements/AppProvider";
import { client } from "@/frontend/misc/client";
import PrivateSettingsProvider from "@/frontend/components/elements/PrivateSettingsProvider";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const { locale, messages } = useFormattedMessages();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <AppProvider>
        <ClientProvider value={client}>
          <PrivateSettingsProvider>
            <IntlProvider
              locale={locale}
              messages={messages}
              onError={() => null} // Hide missing translation warnings
            >
              <ThemeProvider ssr={true}>
                <AppContainer>
                  <Component {...pageProps} />
                </AppContainer>
              </ThemeProvider>
            </IntlProvider>
          </PrivateSettingsProvider>
        </ClientProvider>
      </AppProvider>
    </>
  );
}
