import { useEffect, useState } from 'react';
import { Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './styles.scss';

export default ({
  form,
  label,
  name,
  initialPreview,
  group,
  rules,
}) => {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (initialPreview && initialPreview != '') {
      setPreview(initialPreview);
    }
  }, [initialPreview]);

  const beforeUpload = ({ file, fileList }) => {
    //default product image size
    let height = 300;
    let width = 300;

    if (group === 'banner') {
      height = 150;
      width = 450;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;

        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          (blob) => {
            const resizedFile = new File(
              [blob],
              file.originFileObj.name,
              {
                type: 'image/jpeg',
                lastModified: Date.now(),
              },
            );

            setPreview(event.target.result);
            form.setFieldsValue({ [name]: resizedFile });
          },
          'image/jpeg',
          1,
        );
      };
      reader.onerror = (error) => console.log(error);
    };
  };

  return (
    <Form.Item
      className="username"
      label={label}
      name={name}
      rules={rules}
    >
      <Upload
        onChange={beforeUpload}
        customRequest={() => console.log('image uploaded')}
        showUploadList={false}
      >
        <div className="imageupload">
          {preview != '' ? (
            <div className="imageupload_preview">
              <div className="imageupload_preview_image">
                <img src={preview} />
              </div>
              <div className="imageupload_preview_overlay" />
              <div className="imageupload_preview_text">
                Click to change Image
              </div>
            </div>
          ) : (
            <div className="imageupload_input">
              <div className="imageupload_input_icon">
                <UploadOutlined />
              </div>
              <div className="imageupload_input_text">
                Click to upload image
              </div>
            </div>
          )}
        </div>
      </Upload>
    </Form.Item>
  );
};
