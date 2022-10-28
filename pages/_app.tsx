import { PersistGate } from "redux-persist/integration/react";
import ContextWrapper from "../context/ContextWrapper";
import { persistor, wrapper } from "../store/store";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <ContextWrapper>
            <Component {...props} />
          </ContextWrapper>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
