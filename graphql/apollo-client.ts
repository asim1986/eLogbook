import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import localStorage from 'redux-persist/es/storage';
import constants from "../config/constant.config";
import store from "../store/store";

const client = new ApolloClient({
  link: new HttpLink({
    uri: constants.graphqlBaseUrl,
    headers: {
      Authorization: `Bearer ${""}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
