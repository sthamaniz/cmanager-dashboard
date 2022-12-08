import { Layout, Row, Col } from 'antd';

export default ({}) => {
  return (
    <Layout.Footer>
      <Row>
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">© 2021, Manish Pradhan</div>
        </Col>
      </Row>
    </Layout.Footer>
  );
};
