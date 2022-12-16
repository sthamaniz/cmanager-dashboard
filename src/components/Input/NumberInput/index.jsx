import { Form, InputNumber } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

export default ({
  label,
  name,
  placeholder,
  rules,
  disabled,
  icon,
}) => {
  return (
    <div className="numberinput">
      <div className="numberinput_input">
        {icon ? (
          <div className="numberinput_input_icon">
            <FontAwesomeIcon icon={icon} />
          </div>
        ) : null}
        <div
          className="numberinput_input_field"
          style={{ paddingLeft: icon ? 45 : 0 }}
        >
          <Form.Item
            className="username"
            label={label}
            name={name}
            rules={rules}
          >
            <InputNumber
              placeholder={placeholder}
              disabled={disabled}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};
