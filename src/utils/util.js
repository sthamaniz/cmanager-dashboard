export const isLocalHost = () => {
  const hostname = window.location.hostname;
  return !!(
    hostname.indexOf('localhost') > -1 ||
    hostname === '[::1]' ||
    hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    )
  );
};

export const isHeroku = () => {
  const hostname = window.location.hostname;
  return !!(hostname.indexOf('herokuapp') > -1);
};

export const isOnRender = () => {
  const hostname = window.location.hostname;
  return !!(hostname.indexOf('onrender') > -1);
};

export const isDev = () => {
  const hostname = window.location.hostname;
  return !!(hostname.indexOf('dev') > -1);
};

export const authHeader = (token) => {
  return {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};
