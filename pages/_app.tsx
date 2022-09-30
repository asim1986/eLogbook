import ContextWrapper from "../context/ContextWrapper";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import client from "../apollo-client";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ContextWrapper>
        <Component {...pageProps} />
      </ContextWrapper>
    </ApolloProvider>
  );
};

export default MyApp;
