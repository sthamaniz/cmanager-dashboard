import { isLocalHost, isHeroku, isOnRender, isDev } from 'utils/util';

let config;
if (isLocalHost()) {
  //LOCAL config
  config = {
    assetURL: 'http://localhost:8080/assets',
    graphURL: 'http://localhost:8080/graphql',
    subscriptionURL: 'wss://localhost:8080/subscriptions',
    cookieDomain: 'localhost',
  };
} else if (isHeroku()) {
  //HEROKU config
  config = {
    assetURL: 'https://cmanager-api.herokuapp.com/assets',
    graphURL: 'https://cmanager-api.herokuapp.com/graphql',
    subscriptionURL: 'wss://cmanager-api.herokuapp.com/subscriptions',
    cookieDomain: 'cmanager-dashboard.herokuapp.com',
  };
} else if (isOnRender()) {
  //HEROKU config
  config = {
    assetURL: 'https://cmanager-api.onrender.com/assets',
    graphURL: 'https://cmanager-api.onrender.com/graphql',
    subscriptionURL: 'wss://cmanager-api.onrender.com/subscriptions',
    cookieDomain: 'cmanager-dashboard.onrender.com',
  };
} else if (isDev()) {
  //DEV config
  config = {
    assetURL: '',
    graphURL: '',
    subscriptionURL: '',
    cookieDomain: '',
  };
} else {
  //PROD Config
  config = {
    assetURL: '',
    graphURL: '',
    subscriptionURL: '',
    cookieDomain: '',
  };
}

export default config;
