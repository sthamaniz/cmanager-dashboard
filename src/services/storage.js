import Cookies from 'universal-cookie';

import config from 'configs/config';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: '__a_t__',
  USER_DETAIL: '__u_d__',
};

const cookies = new Cookies();

/**
 * Uses Cookies.
 *
 * @param {String} key : whose Value to set.
 * @param {*} value : Value to set.
 */
export const setValueOf = (key, value, maxAge, cookieDomain) => {
  cookies.set(key, value, {
    path: '/',
    maxAge: maxAge ? maxAge : 60 * 60, // 1 hrs
    domain: cookieDomain ? cookieDomain : config.cookieDomain,
  });
};

/**
 * Uses Cookies.
 *
 * @param {String} key : whose value to get.
 */
export const getValueOf = (key) => {
  return cookies.get(key);
};

/**
 * Uses Cookies.
 *
 * @param {String} key : whose value to remove.
 */
export const removeValueOf = (key, cookieDomain) => {
  return cookies.remove(key, {
    path: '/',
    domain: cookieDomain ? cookieDomain : config.cookieDomain,
  });
};
