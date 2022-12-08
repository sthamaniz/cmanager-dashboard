import { Card, Row, Col } from 'antd';

import './styles.scss';

export default ({}) => {
  return (
    <Card bordered={false} className="contactdetails">
      <Row gutter={[16, 16]}>
        <Col md={12}>
          <Row gutter={[16, 16]} className="contactdetails_single">
            <Col md={12}>
              <div className="contactdetails_single_title">
                House Number
              </div>
            </Col>
            <Col md={12}>
              <div className="contactdetails_single_value">00205</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="contactdetails_single">
            <Col md={12}>
              <div className="contactdetails_single_title">
                Address/Street
              </div>
            </Col>
            <Col md={12}>
              <div className="contactdetails_single_value">
                Australia
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="contactdetails_single">
            <Col md={12}>
              <div className="contactdetails_single_title">City</div>
            </Col>
            <Col md={12}>
              <div className="contactdetails_single_value">
                Sydney
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="contactdetails_single">
            <Col md={12}>
              <div className="contactdetails_single_title">
                Zip Code
              </div>
            </Col>
            <Col md={12}>
              <div className="contactdetails_single_value">605</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="contactdetails_single">
            <Col md={12}>
              <div className="contactdetails_single_title">State</div>
            </Col>
            <Col md={12}>
              <div className="contactdetails_single_value">
                Melbourne
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
