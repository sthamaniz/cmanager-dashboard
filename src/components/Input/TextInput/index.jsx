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
  if (type === 'textarea') {
    return (
      <Form.Item
        className="username textinput"
        label={label}
        name={name}
        rules={rules}
      >
        <Input.TextArea row={5} disabled={disabled} />
      </Form.Item>
    );
  }

  return (
    <div className="textinput">
      <div className="textinput_input">
        {icon ? (
          <div className="textinput_input_icon">
            <FontAwesomeIcon icon={icon} />
          </div>
        ) : null}
        <div
          className={`textinput_input_field ${icon ? 'icon' : ''}`}
        >
          <Form.Item
            className="username"
            label={label}
            name={name}
            rules={rules}
          >
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};
