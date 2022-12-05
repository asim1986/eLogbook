import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import constants from "../config/constant.config";
import store from "../store/store";

const httpLink = new HttpLink({ uri: constants.graphqlBaseUrl });

const authMiddleware = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
  const authToken = store.getState().auth.token;
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
  });
};

export const client = useAppApolloClient();
