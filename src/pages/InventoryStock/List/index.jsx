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

import useInventoryStocks from 'hooks/inventoryStock/useInventoryStocks';
import useInventoryStockDeleteById from 'hooks/inventoryStock/useInventoryStockDeleteById';

import { routeConfig } from 'Routes/config';

import Table from 'components/Table';
import TextInput from 'components/Input/TextInput';
import DateInput from 'components/Input/DateInput';
import PrimaryButton from 'components/Button/PrimaryButton';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import ExcelOptions from '../ExcelOptions';

import './styles.scss';

export default ({}) => {
  const [form] = Form.useForm();

  const [selectedDate, setSelectedDate] = useState([]);
  const [deleteId, setDeleteId] = useState('');

  const {
    inventoryStocksTrigger,
    inventoryStocksResult,
    inventoryStocksLoading,
  } = useInventoryStocks();

  useEffect(() => {
    let variables = {};
    if (selectedDate && selectedDate.length > 0) {
      variables = {
        startDate: selectedDate[0],
        endDate: selectedDate[1],
      };
    }

    inventoryStocksTrigger(variables);
  }, [selectedDate]);

  const {
    inventoryStockDeleteByIdTrigger,
    inventoryStockDeleteByIdLoading,
  } = useInventoryStockDeleteById();

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
            {record.inventory.itemNumber}
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
            {record.inventory.title}
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (value) => (
        <Typography.Title level={5}>
          {value === 'IN' ? 'Entry' : 'Dispatch'}
        </Typography.Title>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => (
        <Typography.Title level={5}>
          {Moment.unix(value / 1000).format('DD MMM, YYYY')}
        </Typography.Title>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
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
    inventoryStocksTrigger(data);
  };

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title={'Inventory Stocks'}
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
                <Col md={6}>
                  <DateInput
                    name="date"
                    value
                    onChange={(date) => setSelectedDate(date)}
                    defaultValue={selectedDate}
                    range={true}
                  />
                </Col>
                <Col md={3}>
                  <ExcelOptions
                    loading={inventoryStocksLoading}
                    inventoryStockData={inventoryStocksResult}
                  />
                </Col>
                <Col md={5}>
                  <PrimaryButton
                    title="Create Inventory Stock"
                    link={routeConfig.inventoryStockCreate.path}
                  />
                </Col>
              </Row>
            </Form>
          </div>
          {inventoryStocksLoading ||
          inventoryStockDeleteByIdLoading ? (
            <Loader />
          ) : null}
          <div className="table-responsive">
            <Table
              columns={columns}
              data={inventoryStocksResult}
              rowKey="title"
            />
          </div>
        </div>
      </Card>
      <Modal
        isModalVisible={deleteId && deleteId !== ''}
        title="Are You Sure?"
        body={'You cannot undo this once deleted.'}
        handleOK={() =>
          inventoryStockDeleteByIdTrigger({ id: deleteId })
        }
        loading={inventoryStockDeleteByIdLoading}
        handleCancel={() => setDeleteId('')}
      />
    </>
  );
};
