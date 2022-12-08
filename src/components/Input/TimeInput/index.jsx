import { Tag, Form, Input } from 'antd';

import './styles.scss';

export default ({ label, name, placeholder, rules, disabled }) => {
  return (
    <div className="timeinput">
      <Tag>{label}</Tag>
      <Form.Item className="username" name={name} rules={rules}>
        <Input
          type={'time'}
          placeholder={placeholder}
          disabled={disabled}
        />
      </Form.Item>
    </div>
  );
};
