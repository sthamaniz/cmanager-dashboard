import config from 'configs/config';

import { getValueOf, STORAGE_KEYS } from 'services/storage';

export const fileUpload = async (group, file) => {
  const token = getValueOf(STORAGE_KEYS.ACCESS_TOKEN);

  let formData = new FormData();

  //append data in formdata
  formData.append('group', group);

  if (Array.isArray(file)) {
    file.forEach((f) => {
      formData.append('file', f);
    });
  } else {
    formData.append('file', file);
  }

  return fetch(config.assetURL, {
    body: formData,
    method: 'post',
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  }).then((res) => res.json());
};
