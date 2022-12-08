import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
} from '@apollo/client';

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';

import config from 'configs/config';

const cache = new InMemoryCache();

// Create Http link:
const httpLink = new HttpLink({
  uri: config.graphURL,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: config.subscriptionURL,
  options: {
    reconnect: true,
  },
});

// Adding header to the http link
const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'custom-header': 'custom-header-value',
    },
  };
});

// Combine Http and Websocket link as one and pass all the queries through this link.
// It uses the required link by checking the the type of the query passed.
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const defaultOptions = {
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  },
};

export default new ApolloClient({
  link: splitLink,
  cache: cache,
  defaultOptions,
});
