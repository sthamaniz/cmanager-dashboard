import config from 'configs/config';

export const imageUpload = async (group, file) => {
  let formData = new FormData();

  //append data in formdata
  formData.append('group', group);
  formData.append('file', file);

  return fetch(config.assetURL, {
    body: formData,
    method: 'post',
  }).then((res) => res.json());
};
