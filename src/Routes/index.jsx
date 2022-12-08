import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { routeConfig } from 'Routes/config';

import AuthRoute from 'Routes/AuthRoute';
import PrivateRoute from 'Routes/PrivateRoute';

const ROUTE_TYPES = {
  auth: (key, path, Component) => (
    <AuthRoute key={key} exact path={path} component={Component} />
  ),
  private: (key, path, Component) => (
    <PrivateRoute key={key} exact path={path} component={Component} />
  ),
  default: (key, path, Component) => (
    <Route key={key} exact path={path} component={Component} />
  ),
};

export default ({}) => {
  return (
    <BrowserRouter>
      <Switch>
        {Object.keys(routeConfig).map((key) =>
          ROUTE_TYPES[routeConfig[key].type](
            key,
            routeConfig[key].path,
            routeConfig[key].component,
          ),
        )}

        {/* redirect to dashboard if no route is defined */}
        <Route
          path="/"
          exact
          render={(props) => (
            <Redirect
              push
              to={{
                pathname: routeConfig.dashboard.path,
                search: props.location.search,
                state: { from: props.location },
              }}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};
