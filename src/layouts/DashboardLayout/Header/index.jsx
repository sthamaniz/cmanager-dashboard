import { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faCircleUser,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

import Dropdown from './Dropdown';

import { getValueOf, STORAGE_KEYS } from 'services/storage';

export default ({ onPress, pathname }) => {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <Row gutter={[24, 0]}>
      {/* <Col span={12} md={6}>
        <div className="ant-page-header-heading">
          <span
            className="ant-page-header-heading-title"
            style={{ textTransform: "capitalize" }}
          >
            {pathname.split('/')[1]}
          </span>
        </div>
      </Col> */}
      <Col span={24} md={24} className="header-control">
        {/* <Button
          type="link"
          className="sidebar-toggler"
          onClick={onPress}
        >
          {toggler}
        </Button> */}
        <FontAwesomeIcon
          icon={faBell}
          style={{
            height: 18,
            width: 18,
            marginLeft: 10,
          }}
        />
        <FontAwesomeIcon
          icon={faGear}
          style={{
            height: 18,
            width: 18,
            marginLeft: 10,
          }}
        />
        <Dropdown
          title={getValueOf(STORAGE_KEYS.USER_DETAIL)['firstName']}
          icon={faCircleUser}
        />
      </Col>
    </Row>
  );
};
