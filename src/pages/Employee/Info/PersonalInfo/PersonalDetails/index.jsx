import { Card, Row, Col } from 'antd';

import './styles.scss';

export default ({}) => {
  return (
    <Card bordered={false} className="personaldetails">
      <Row gutter={[16, 16]}>
        <Col md={12}>
          <Row gutter={[16, 16]} className="personaldetails_single">
            <Col md={12}>
              <div className="personaldetails_single_title">
                TFN (Tax File Number)
              </div>
            </Col>
            <Col md={12}>
              <div className="personaldetails_single_value">
                00205123
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="personaldetails_single">
            <Col md={12}>
              <div className="personaldetails_single_title">
                ID Number)
              </div>
            </Col>
            <Col md={12}>
              <div className="personaldetails_single_value">
                00205123
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="personaldetails_single">
            <Col md={12}>
              <div className="personaldetails_single_title">
                Passport Number
              </div>
            </Col>
            <Col md={12}>
              <div className="personaldetails_single_value">
                14123123123
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="personaldetails_single">
            <Col md={12}>
              <div className="personaldetails_single_title">
                Passport Issued Place
              </div>
            </Col>
            <Col md={12}>
              <div className="personaldetails_single_value">
                AUstralia
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="personaldetails_single">
            <Col md={12}>
              <div className="personaldetails_single_title">
                Passport Expiry Date
              </div>
            </Col>
            <Col md={12}>
              <div className="personaldetails_single_value">
                2023/12/12
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="personaldetails_single">
            <Col md={12}>
              <div className="personaldetails_single_title">
                Reference Phone Number
              </div>
            </Col>
            <Col md={12}>
              <div className="personaldetails_single_value">
                123123123
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
