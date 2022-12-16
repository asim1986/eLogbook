import { PersistGate } from "redux-persist/integration/react";
import { useAppApolloClient } from "../graphql/apolloClient";
import ContextWrapper from "../context/ContextWrapper";
import { persistor, wrapper } from "../store/store";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const apolloClient = useAppApolloClient();

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
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
