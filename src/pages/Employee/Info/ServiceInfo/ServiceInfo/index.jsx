import { Card, Row, Col } from 'antd';

import './styles.scss';

export default ({}) => {
  return (
    <Card bordered={false} className="serviceinfo">
      <Row gutter={[16, 16]}>
        <Col md={12}>
          <Row gutter={[16, 16]} className="serviceinfo_single">
            <Col md={12}>
              <div className="serviceinfo_single_title">
                Designation
              </div>
            </Col>
            <Col md={12}>
              <div className="serviceinfo_single_value">
                Senior Officer
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="serviceinfo_single">
            <Col md={12}>
              <div className="serviceinfo_single_title">
                Job Title
              </div>
            </Col>
            <Col md={12}>
              <div className="serviceinfo_single_value">Cleaner</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="serviceinfo_single">
            <Col md={12}>
              <div className="serviceinfo_single_title">
                Working Status
              </div>
            </Col>
            <Col md={12}>
              <div className="serviceinfo_single_value">Working</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="serviceinfo_single">
            <Col md={12}>
              <div className="serviceinfo_single_title">
                Employee Type
              </div>
            </Col>
            <Col md={12}>
              <div className="serviceinfo_single_value">Regular</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="serviceinfo_single">
            <Col md={12}>
              <div className="serviceinfo_single_title">Branch</div>
            </Col>
            <Col md={12}>
              <div className="serviceinfo_single_value">
                Melbourne
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
