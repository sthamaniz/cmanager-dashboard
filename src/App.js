import { ApolloProvider } from '@apollo/client';

import client from 'configs/graphqlClient';

import Routes from 'Routes';

import 'antd/dist/antd.css';
import 'assets/theme/main.css';
import 'assets/theme/responsive.css';
import 'assets/styles/main.scss';

export default ({}) => {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};
