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
} from '@fortawesome/free-solid-svg-icons';

import useServices from 'hooks/service/useServices';
import useServiceDeleteById from 'hooks/service/useServiceDeleteById';

import { routeConfig } from 'Routes/config';

import Table from 'components/Table';
import TextInput from 'components/Input/TextInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import './styles.scss';

export default ({}) => {
  const [form] = Form.useForm();

  const [deleteId, setDeleteId] = useState('');

  const { servicesTrigger, servicesResult, servicesLoading } =
    useServices();

  useEffect(() => {
    servicesTrigger();
  }, []);

  const {
    serviceDeleteByIdTrigger,
    serviceDeleteByIdResult,
    serviceDeleteByIdLoading,
    serviceDeleteByIdError,
  } = useServiceDeleteById();

  useEffect(() => {
    if (!serviceDeleteByIdLoading) {
      if (serviceDeleteByIdResult || serviceDeleteByIdError) {
        setDeleteId('');
      }
    }
  }, [
    serviceDeleteByIdLoading,
    serviceDeleteByIdResult,
    serviceDeleteByIdError,
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {record.title}
          </Typography.Title>
        </div>
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
                ? '#04b049d9'
                : '#222c26d9',
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
            to={routeConfig.serviceUpdate.path.replace(
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
        </>
      ),
    },
  ];

  const submitSearchData = (data) => {
    servicesTrigger(data);
  };

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace"
        title={'Service List'}
      >
        <div className="service" style={{ padding: '12px 24px' }}>
          <div className="service_options">
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
                    title="Add Service"
                    link={routeConfig.serviceCreate.path}
                  />
                </Col>
              </Row>
            </Form>
          </div>
          {servicesLoading ? <Loader /> : null}
          <div className="table-responsive">
            <Table
              columns={columns}
              data={servicesResult}
              rowKey="title"
            />
          </div>
        </div>
      </Card>
      <Modal
        isModalVisible={deleteId && deleteId !== ''}
        title="Are You Sure?"
        body={'You cannot undo this once deleted.'}
        handleOK={() => serviceDeleteByIdTrigger({ id: deleteId })}
        loading={serviceDeleteByIdLoading}
        handleCancel={() => setDeleteId('')}
      />
    </>
  );
};
