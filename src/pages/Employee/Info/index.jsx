import { useState } from 'react';
import { Card, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faEnvelope,
  faMobile,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import { getValueOf, STORAGE_KEYS } from 'services/storage';

import useUserById from 'hooks/user/useUserById';

import Loader from 'components/Loader';
import ServiceInfo from './ServiceInfo';
import PersonalInfo from './PersonalInfo';

import './styles.scss';

export default ({ history, match }) => {
  let urlId = match.params.id;

  const userDetail = getValueOf(STORAGE_KEYS.USER_DETAIL);
  if (userDetail.role === 'EMPLOYEE') {
    urlId = userDetail._id;
  }

  const [selectedOption, setSelectedoption] = useState(1);

  const { userByIdResult, userByIdLoading } = useUserById(urlId);

  return (
    <div className="employeeinfo">
      <Card
        bordered={false}
        className="info"
        title={
          <Row>
            <Col md={21}>Employee's basic information</Col>
          </Row>
        }
      >
        {userByIdLoading ? <Loader /> : null}

        {!userByIdLoading && userByIdResult ? (
          <Row gutter={[16, 16]}>
            <Col md={3}>
              <div className="employeeinfo_info_image">
                <UserOutlined style={{ fontSize: 50 }} />
              </div>
            </Col>
            <Col md={21}>
              <Row>
                <Col md={24}>
                  <div className="employeeinfo_info_name">
                    {userByIdResult.firstName}{' '}
                    {userByIdResult.lastName}
                  </div>
                </Col>
              </Row>
              <Row className="employeeinfo_info_detail">
                <Col md={8}>
                  <div className="employeeinfo_info_detail_single">
                    <div className="employeeinfo_info_detail_single_icon">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ fontSize: 20, marginTop: 4 }}
                      />
                    </div>
                    <div className="employeeinfo_info_detail_single_value">
                      {userByIdResult.address}
                    </div>
                  </div>
                </Col>
                <Col md={8}>
                  <div className="employeeinfo_info_detail_single">
                    <div className="employeeinfo_info_detail_single_icon">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ fontSize: 20, marginTop: 4 }}
                      />
                    </div>
                    <div className="employeeinfo_info_detail_single_value">
                      {userByIdResult.email}
                    </div>
                  </div>
                </Col>
                <Col md={8}>
                  <div className="employeeinfo_info_detail_single">
                    <div className="employeeinfo_info_detail_single_icon">
                      <FontAwesomeIcon
                        icon={faMobile}
                        style={{ fontSize: 20, marginTop: 4 }}
                      />
                    </div>
                    <div className="employeeinfo_info_detail_single_value">
                      {userByIdResult.mobile}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="employeeinfo_info_other">
                <Col md={6}>
                  <div className="employeeinfo_info_other_single">
                    <div className="employeeinfo_info_other_single_title">
                      EMPLOYEE ID / STATUS
                    </div>
                    <div className="employeeinfo_info_other_single_value">
                      00205 / Working
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="employeeinfo_info_other_single">
                    <div className="employeeinfo_info_other_single_title">
                      DESIGNATION
                    </div>
                    <div className="employeeinfo_info_other_single_value">
                      Senior Officer
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="employeeinfo_info_other_single">
                    <div className="employeeinfo_info_other_single_title">
                      BRANCH NAME
                    </div>
                    <div className="employeeinfo_info_other_single_value">
                      Melbourne
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="employeeinfo_info_other_single">
                    <div className="employeeinfo_info_other_single_title">
                      DEPARTMENT
                    </div>
                    <div className="employeeinfo_info_other_single_value">
                      Cleaning
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : null}
      </Card>
      {!userByIdLoading && userByIdResult ? (
        <Row gutter={[16, 16]} className="employeeinfo_options">
          <Col md={4}>
            <div className="employeeinfo_options_list">
              <div
                className={`employeeinfo_options_list_single ${
                  selectedOption == 1 ? 'active' : ''
                }`}
                onClick={() => setSelectedoption(1)}
              >
                <div className="employeeinfo_options_list_single_icon">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <div className="employeeinfo_options_list_single_value">
                  Service Information
                </div>
              </div>
              <div
                className={`employeeinfo_options_list_single ${
                  selectedOption == 2 ? 'active' : ''
                }`}
                onClick={() => setSelectedoption(2)}
              >
                <div className="employeeinfo_options_list_single_icon">
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <div className="employeeinfo_options_list_single_value">
                  Personal Information
                </div>
              </div>
            </div>
          </Col>
          <Col md={20}>
            {selectedOption == 1 ? <ServiceInfo /> : null}
            {selectedOption == 2 ? <PersonalInfo /> : null}
          </Col>
        </Row>
      ) : null}
    </div>
  );
};
