import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import constants from '../config/constant.config';
import store from '../store/store';

const token = store.getState().auth.refreshToken;

const client = new ApolloClient({
  link: new HttpLink({
    uri: constants.graphqlBaseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;