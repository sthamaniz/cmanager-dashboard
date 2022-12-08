import { Form, DatePicker } from 'antd';

import './styles.scss';

export default ({
  label,
  name,
  placeholder,
  rules,
  onChange,
  defaultValue,
  disabledDate,
  range,
}) => {
  return (
    <Form.Item
      className="username dateinput"
      label={label}
      name={name}
      rules={rules}
    >
      {range ? (
        <DatePicker.RangePicker
          placeholder={placeholder}
          onChange={(date) => (onChange ? onChange(date) : null)}
          defaultValue={defaultValue}
          // disabledDate={disabledDate}
        />
      ) : (
        <DatePicker
          placeholder={placeholder}
          onChange={(date) => (onChange ? onChange(date) : null)}
          defaultValue={defaultValue}
          disabledDate={disabledDate || false}
        />
      )}
    </Form.Item>
  );
};
