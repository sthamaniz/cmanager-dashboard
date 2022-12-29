import { useEffect, useState } from 'react';
import { Form, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './styles.scss';

const MAX_UPLOAD_SIZE = 1000 * 1000 * 6; // 5MB

export default ({
  form,
  label,
  name,
  initialPreview,
  group,
  multiple,
  multipleImage,
  setMultipleImage,
  rules,
}) => {
  const [preview, setPreview] = useState(multiple ? [] : '');

  useEffect(() => {
    if (multiple) {
      const instanceOfFile = multipleImage.filter(
        (mi) => mi instanceof File,
      );
      if (
        initialPreview &&
        initialPreview.length &&
        initialPreview.length === multipleImage.length &&
        instanceOfFile.length == 0
      ) {
        setPreview(initialPreview);
      }
    } else {
      if (initialPreview && initialPreview != '') {
        setPreview(initialPreview);
      }
    }
  }, [initialPreview]);

  const onChange = ({ file }) => {
    //default product image size
    // let height = 800;
    // let width = 800;

    // if (group === 'banner') {
    //   height = 500
    //   width = 1500
    // }

    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // const elem = document.createElement('canvas');
        // elem.width = width;
        // elem.height = height

        // const ctx = elem.getContext('2d');
        // ctx.drawImage(img, 0, 0, width, height);
        // ctx.canvas.toBlob((blob) => {
        //   const resizedFile = new File([blob], file.originFileObj.name, {
        //     type: 'image/jpeg',
        //     lastModified: Date.now()
        //   });

        //   setPreview(multiple ? [...preview, event.target.result] : event.target.result);
        //   if (multiple) {
        //     setMultipleImage([...multipleImage, resizedFile]);
        //   }
        //   form.setFieldsValue({ [name]: resizedFile });

        // }, 'image/jpeg', 1);

        if (event.total && event.total < MAX_UPLOAD_SIZE) {
          setPreview(
            multiple
              ? [...preview, event.target.result]
              : event.target.result,
          );
          if (multiple) {
            setMultipleImage([...multipleImage, file.originFileObj]);
          }
          form.setFieldsValue({ [name]: file.originFileObj });
        } else {
          form.setFields([
            {
              name: [name],
              errors: ['Max upload size is 5 MB'],
            },
          ]);
        }
      };
      reader.onerror = (error) => console.log(error);
    };
  };

  const removeImage = (imageIndex) => {
    if (multiple) {
      const newPreview = preview.filter((_, i) => i !== imageIndex);
      const newMultipleImage = multipleImage.filter(
        (_, i) => i !== imageIndex,
      );

      setPreview(newPreview);
      setMultipleImage(newMultipleImage);
    }
  };

  return (
    <Form.Item
      className="username"
      label={label}
      name={name}
      rules={rules}
    >
      <div className="imageupload">
        <Row gutter={[16, 16]}>
          {multiple
            ? preview.map((p, i) => (
                <Col key={i}>
                  <div
                    className="imageupload_preview"
                    onClick={() => removeImage(i)}
                  >
                    <div className="imageupload_preview_image">
                      <img src={p} />
                    </div>
                    <div className="imageupload_preview_overlay" />
                    <div className="imageupload_preview_text">
                      Click to remove Image
                    </div>
                  </div>
                </Col>
              ))
            : null}
          <Col>
            <Upload
              onChange={onChange}
              customRequest={() => console.log('image uploaded')}
              showUploadList={false}
            >
              {multiple ? (
                <div className="imageupload_input">
                  <div className="imageupload_input_icon">
                    <UploadOutlined />
                  </div>
                  <div className="imageupload_input_text">
                    Click to upload image
                  </div>
                </div>
              ) : preview ? (
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
            </Upload>
          </Col>
        </Row>
      </div>
    </Form.Item>
  );
};
