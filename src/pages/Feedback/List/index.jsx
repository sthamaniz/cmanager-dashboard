import { useEffect } from 'react';
import { Card, Typography } from 'antd';

import useFeedbacks from 'hooks/feedback/useFeedbacks';

import Table from 'components/Table';
import Loader from 'components/Loader';

import './styles.scss';

export default ({}) => {
  const { feedbacksTrigger, feedbacksResult, feedbacksLoading } =
    useFeedbacks();

  useEffect(() => {
    feedbacksTrigger();
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
            {value.firstName || ''} {value.lastName || ''}
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
          {feedbacksLoading ? <Loader /> : null}
          <div className="table-responsive">
            <Table
              columns={columns}
              data={feedbacksResult}
              rowKey="title"
            />
          </div>
        </div>
      </Card>
    </>
  );
};
