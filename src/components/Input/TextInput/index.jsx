import { Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

export default ({
  label,
  type = 'text',
  name,
  placeholder,
  rules,
  disabled,
  icon,
}) => {
  return (
    <Form.Item
      className="username textinput"
      label={label}
      name={name}
      rules={rules}
    >
      {type === 'textarea' ? (
        <Input.TextArea row={5} disabled={disabled} />
      ) : (
        <div className="textinput_input">
          {icon ? (
            <div className="textinput_input_icon">
              <FontAwesomeIcon icon={icon} />
            </div>
          ) : null}
          <div
            className="textinput_input_field"
            style={{ paddingLeft: icon ? 45 : 0 }}
          >
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </Form.Item>
  );
};
