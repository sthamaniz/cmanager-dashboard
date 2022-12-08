import { Redirect } from 'react-router-dom';

import { unAuthenticate } from 'services/auth';

import { routeConfig } from 'Routes/config';

export default ({}) => {
  unAuthenticate();

  return <Redirect to={routeConfig.login.path} />;
};
