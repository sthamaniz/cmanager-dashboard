import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Typography,
  Badge,
  Row,
  Col,
  Form,
  Button,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faSearch,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

import useUsers from 'hooks/user/useUsers';
import useUserDeleteById from 'hooks/user/useUserDeleteById';

import { routeConfig } from 'Routes/config';

import Table from 'components/Table';
import TextInput from 'components/Input/TextInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import './styles.scss';
import Notification from '../Notification';

export default ({}) => {
  const [form] = Form.useForm();

  const [deleteId, setDeleteId] = useState('');

  const [selectedCustomer, setSelectedCustomer] = useState({});

  const { usersTrigger, usersResult, usersLoading } = useUsers();

  useEffect(() => {
    usersTrigger({
      role: 'CUSTOMER',
    });
  }, []);

  const {
    userDeleteByIdTrigger,
    userDeleteByIdResult,
    userDeleteByIdLoading,
    userDeleteByIdError,
  } = useUserDeleteById({ refetchVariables: { role: 'CUSTOMER' } });

  useEffect(() => {
    if (!userDeleteByIdLoading) {
      if (userDeleteByIdResult || userDeleteByIdError) {
        D('');
      }
    }
  }, [
    userDeleteByIdLoading,
    userDeleteByIdResult,
    userDeleteByIdError,
  ]);

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {record.firstName} {record.lastName}
          </Typography.Title>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (value) => (
        <Typography.Title level={5}>{value}</Typography.Title>
      ),
    },
    {
      title: 'Mobile',
      key: 'mobile',
      dataIndex: 'mobile',
      render: (value) => (
        <Typography.Title level={5}>{value}</Typography.Title>
      ),
    },
    {
      title: 'Gender',
      key: 'gender',
      dataIndex: 'gender',
      render: (value) => (
        <Typography.Title level={5}>{value}</Typography.Title>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (value) => (
        <Badge
          count={value.toLowerCase()}
          style={{
            backgroundColor:
              value.toLowerCase() === 'active'
                ? '#05D34E'
                : '#eaeaea',
            fontSize: '14px',
            textTransform: 'capitalize',
            minWidth: '75px',
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <Link
            to={routeConfig.customerUpdate.path.replace(
              ':id',
              record._id,
            )}
          >
            <FontAwesomeIcon
              icon={faEdit}
              style={{ color: '#324565', marginRight: '5px' }}
            />
          </Link>{' '}
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: '#324565', marginRight: '5px' }}
            onClick={() => setDeleteId(`${record._id}`)}
          />
          {/* <FontAwesomeIcon
            icon={faEnvelope}
            onClick={() => setSelectedCustomer(record)}
            style={{ cursor: 'pointer' }}
          /> */}
        </>
      ),
    },
  ];

  const submitSearchData = (data) => {
    usersTrigger({
      role: 'CUSTOMER',
      ...data,
    });
  };

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace"
        title={'Customer List'}
      >
        <div className="customer" style={{ padding: '12px 24px' }}>
          <div className="customer_options">
            <Form
              className="row-col"
              layout="vertical"
              form={form}
              initialValues={{}}
              onFinish={submitSearchData}
            >
              <Row gutter={[16, 16]}>
                <Col md={6}>
                  <TextInput
                    icon={faSearch}
                    name="search"
                    placeholder="Type here.."
                    rules={[]}
                  />
                </Col>
                <Col md={4}>
                  <Button type="primary" htmlType="submit" block>
                    Search
                  </Button>
                </Col>
                <Col md={10}></Col>
                <Col md={4}>
                  <PrimaryButton
                    title="Add Customer"
                    link={routeConfig.customerCreate.path}
                  />
                </Col>
              </Row>
            </Form>
          </div>
          {usersLoading ? <Loader /> : null}
          <div className="table-responsive">
            <Table
              columns={columns}
              data={usersResult}
              rowKey="email"
            />
          </div>
        </div>
      </Card>
      <Modal
        isModalVisible={deleteId && deleteId !== ''}
        title="Are You Sure?"
        body={'You cannot undo this once deleted.'}
        handleOK={() => userDeleteByIdTrigger({ id: deleteId })}
        loading={userDeleteByIdLoading}
        handleCancel={() => D('')}
      />
      <Notification
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
    </>
  );
};
