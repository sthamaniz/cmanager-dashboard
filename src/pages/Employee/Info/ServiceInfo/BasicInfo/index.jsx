import { Card, Row, Col } from 'antd';

import './styles.scss';

export default ({}) => {
  return (
    <Card bordered={false} className="basicinfo">
      <Row gutter={[16, 16]}>
        <Col md={12}>
          <Row gutter={[16, 16]} className="basicinfo_single">
            <Col md={12}>
              <div className="basicinfo_single_title">
                Employee ID
              </div>
            </Col>
            <Col md={12}>
              <div className="basicinfo_single_value">00205</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="basicinfo_single">
            <Col md={12}>
              <div className="basicinfo_single_title">
                Employee Name
              </div>
            </Col>
            <Col md={12}>
              <div className="basicinfo_single_value">
                Hayden Rose
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="basicinfo_single">
            <Col md={12}>
              <div className="basicinfo_single_title">
                Nationality
              </div>
            </Col>
            <Col md={12}>
              <div className="basicinfo_single_value">Australian</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="basicinfo_single">
            <Col md={12}>
              <div className="basicinfo_single_title">
                ABN (Australian Business Number)
              </div>
            </Col>
            <Col md={12}>
              <div className="basicinfo_single_value">6057234567</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="basicinfo_single">
            <Col md={12}>
              <div className="basicinfo_single_title">
                Date Of Birth
              </div>
            </Col>
            <Col md={12}>
              <div className="basicinfo_single_value">1992/01/12</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
