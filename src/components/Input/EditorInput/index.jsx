import { Form } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './styles.scss';

export default ({ form, label, name, value, rules }) => {
  return (
    <Form.Item
      className="username"
      label={label}
      name={name}
      rules={rules}
    >
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        onChange={(event, editor) =>
          form.setFieldsValue({ [name]: editor.getData() })
        }
      />
    </Form.Item>
  );
};
