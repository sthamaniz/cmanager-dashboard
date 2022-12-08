import { useState } from 'react';
import { Popover } from 'antd';
import { Link } from 'react-router-dom';

import { routeConfig } from 'Routes/config';

import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ title, icon }) => {
  const [open, setOpen] = useState(false);

  const content = (
    <Link to={routeConfig.logout.path} style={{ color: '#000000' }}>
      Logout
    </Link>
  );

  return (
    <div className="dropdown">
      <Popover
        content={content}
        trigger="click"
        placement="bottomRight"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="dropdown_title">
          {title}
          {icon ? <FontAwesomeIcon icon={icon} /> : null}
        </div>
      </Popover>
    </div>
  );
};
