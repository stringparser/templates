import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { GRAPHQL_WS_ENDPOINT } from '../../config/env';

let apolloClient = null;

const createLink = () => {
  if (process.browser) {
    return new WebSocketLink({
      uri: GRAPHQL_WS_ENDPOINT,
      options: {
        reconnect: true,
      }
    });
  } else {
    return undefined;
  }
}

const initApolloClient = (initialState = {}) => {
  return new ApolloClient({
    link: createLink(),
    cache: new InMemoryCache().restore(initialState),
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once
    connectToDevTools: process.browser,
  });
};

export const createClient = (initialState = {}) => {
  if (process.browser && !apolloClient) {
    apolloClient = initApolloClient(initialState);
  }

  return apolloClient;
};
