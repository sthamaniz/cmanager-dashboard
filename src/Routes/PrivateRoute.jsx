import { Route, Redirect } from 'react-router-dom';

import DashboardLayout from 'layouts/DashboardLayout';

import { isAuthenticated } from 'services/auth';

import { routeConfig } from 'Routes/config';

export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated()) {
          return (
            <DashboardLayout>
              <Component {...props} {...rest} />
            </DashboardLayout>
          );
        }

        return (
          <Redirect
            push
            to={{
              pathname: routeConfig.login.path,
              search: props.location.search,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
