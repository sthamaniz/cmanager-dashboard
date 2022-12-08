import { Form, Select } from 'antd';

import './styles.scss';

export default ({
  label,
  name,
  placeholder,
  options = [],
  rules,
  mode,
  onChange,
  defaultValue,
}) => {
  return (
    <Form.Item
      className="username selectinput"
      label={label}
      name={name}
      rules={rules}
    >
      <Select
        placeholder={placeholder}
        mode={mode || ''}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options.map((o, i) => (
          <Select.Option key={i} value={o.value}>
            {o.title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
