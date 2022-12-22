import { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

export default ({
  form,
  label,
  name,
  placeholder,
  options = [],
  rules,
  icon,
  bottomText,
  small = true,
  onChange,
}) => {
  const [search, setSearch] = useState('');
  const [searchedOptions, setSearchedOptions] = useState([]);

  useEffect(() => {
    if (search && search !== '') {
      setSearchedOptions(
        options.filter(
          (o) => o.title && o.title.indexOf(search) > -1,
        ),
      );
    } else {
      setSearchedOptions(options);
    }
  }, [options, search]);

  return (
    <Form.Item
      className="username searchinput"
      label={label}
      name={name}
      rules={rules}
    >
      <div className={`searchinput_input ${!small ? 'large' : ''}`}>
        {icon ? (
          <div className="searchinput_input_icon">
            <FontAwesomeIcon icon={icon} />
          </div>
        ) : null}
        <div
          className={`searchinput_input_field`}
          style={{ paddingLeft: icon ? 45 : 5 }}
        >
          <Select
            showSearch
            showArrow={false}
            placeholder={placeholder}
            onSearch={(keyword) => setSearch(keyword)}
            onChange={(changedValue) => {
              if (onChange) {
                onChange({
                  target: { name: name, value: changedValue },
                });
              }
              form.setFieldsValue({ [name]: changedValue });
            }}
          >
            {searchedOptions.map((o, i) => (
              <Select.Option key={i} value={o.value}>
                {o.title}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      {bottomText ? (
        <div className="searchinput_bottomtext">{bottomText}</div>
      ) : null}
    </Form.Item>
  );
};
