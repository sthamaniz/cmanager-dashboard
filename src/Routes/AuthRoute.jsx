import { Route, Redirect } from 'react-router-dom';

import AuthLayout from 'layouts/AuthLayout';

import { isAuthenticated } from 'services/auth';

import { routeConfig } from 'Routes/config';

export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated()) {
          return (
            <Redirect
              push
              to={{
                pathname: routeConfig.dashboard.path,
                search: props.location.search,
                state: { from: props.location },
              }}
            />
          );
        }

        return (
          <AuthLayout>
            <Component {...props} {...rest} />
          </AuthLayout>
        );
      }}
    />
  );
};
