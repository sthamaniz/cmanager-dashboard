import {
  setValueOf,
  getValueOf,
  removeValueOf,
  STORAGE_KEYS,
} from 'services/storage';

export const authenticate = (accessToken, user) => {
  setValueOf(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  setValueOf(STORAGE_KEYS.USER_DETAIL, JSON.stringify(user));
};

export const isAuthenticated = () => {
  let isAuthenticated = false;

  const accessToken = getValueOf(STORAGE_KEYS.ACCESS_TOKEN);

  if (accessToken && accessToken !== '') {
    isAuthenticated = true;
  }

  return isAuthenticated;
};

export const unAuthenticate = () => {
  removeValueOf(STORAGE_KEYS.ACCESS_TOKEN);
  removeValueOf(STORAGE_KEYS.USER_DETAIL);
};
