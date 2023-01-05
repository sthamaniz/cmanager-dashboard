import { useEffect } from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';

import useCustomerFeedbacks from 'hooks/feedback/useCustomerFeedbacks';

import { routeConfig } from 'Routes/config';

import Table from 'components/Table';
import PrimaryButton from 'components/Button/PrimaryButton';
import Loader from 'components/Loader';

import './styles.scss';

export default ({}) => {
  const {
    customerFeedbacksTrigger,
    customerFeedbacksResult,
    customerFeedbacksLoading,
  } = useCustomerFeedbacks();

  useEffect(() => {
    customerFeedbacksTrigger();
  }, []);

  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'sno',
      key: 'sno',
      render: (_, __, index) => (
        <Typography.Title level={5}>{index + 1}</Typography.Title>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'user',
      key: 'user',
      render: (value) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {value.firstName} {value.lastName}
          </Typography.Title>
        </div>
      ),
    },
    {
      title: 'Feedback',
      dataIndex: 'value',
      key: 'value',
      render: (value) => (
        <div className="avatar-info">
          <Typography.Title level={5}>{value}</Typography.Title>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace"
        title={'Feedback List'}
      >
        <div className="feedback" style={{ padding: '12px 24px' }}>
          <div className="feedback_options">
            <Row gutter={[16, 16]}>
              <Col md={6}></Col>
              <Col md={4}>
                <Button type="primary" htmlType="submit" block>
                  Search
                </Button>
              </Col>
              <Col md={10}></Col>
              <Col md={4}>
                <PrimaryButton
                  title="Add Service"
                  link={routeConfig.customerFeedbackCreate.path}
                />
              </Col>
            </Row>
          </div>
          {customerFeedbacksLoading ? <Loader /> : null}
          <div className="table-responsive">
            <Table
              columns={columns}
              data={customerFeedbacksResult}
              rowKey="title"
            />
          </div>
        </div>
      </Card>
    </>
  );
};
