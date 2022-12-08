import { Form, Switch } from 'antd';

export default ({ form, label, name, defaultChecked, rules }) => {
  return (
    <Form.Item className="username" name={name} rules={rules}>
      <div style={{ display: 'flex' }}>
        <Switch
          defaultChecked={defaultChecked}
          onChange={(value) => form.setFieldsValue({ [name]: value })}
        />
        <div style={{ marginLeft: '5px' }}>{label}</div>
      </div>
    </Form.Item>
  );
};
