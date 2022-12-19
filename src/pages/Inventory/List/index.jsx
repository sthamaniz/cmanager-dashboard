import { useState, useEffect } from 'react';
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
import Moment from 'moment';

import useInventories from 'hooks/inventory/useInventories';
import useInventoryDeleteById from 'hooks/inventory/useInventoryDeleteById';

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

  const {
    inventoriesTrigger,
    inventoriesResult,
    inventoriesLoading,
  } = useInventories();

  useEffect(() => {
    inventoriesTrigger();
  }, []);

  const { inventoryDeleteByIdTrigger, inventoryDeleteByIdLoading } =
    useInventoryDeleteById();

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
      title: 'Item Number',
      dataIndex: 'itemNumber',
      key: 'itemNumber',
      render: (_, record) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {record.itemNumber}
          </Typography.Title>
        </div>
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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value) => (
        <Typography.Title level={5}>{value}</Typography.Title>
      ),
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      render: (value) => (
        <Typography.Title level={5}>{value}</Typography.Title>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => (
        <Typography.Title level={5}>{value}</Typography.Title>
      ),
    },
    {
      title: 'Low Stock Quantity',
      dataIndex: 'lowStockQuantity',
      key: 'lowStockQuantity',
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
            to={routeConfig.inventoryUpdate.path.replace(
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
    inventoriesTrigger(data);
  };

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title={'Inventory List'}
      >
        <div className="inventory">
          <div className="inventory_options">
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
                    title="Add Inventory"
                    link={routeConfig.inventoryCreate.path}
                  />
                </Col>
              </Row>
            </Form>
          </div>
          {inventoriesLoading || inventoryDeleteByIdLoading ? (
            <Loader />
          ) : null}
          <div className="table-responsive">
            <Table
              columns={columns}
              data={inventoriesResult}
              rowKey="title"
            />
          </div>
        </div>
      </Card>
      <Modal
        isModalVisible={deleteId && deleteId !== ''}
        title="Are You Sure?"
        body={'You cannot undo this once deleted.'}
        handleOK={() => inventoryDeleteByIdTrigger({ id: deleteId })}
        loading={inventoryDeleteByIdLoading}
        handleCancel={() => setDeleteId('')}
      />
    </>
  );
};
