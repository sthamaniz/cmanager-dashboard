import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useInventoryCreate from 'hooks/inventory/useInventoryCreate';

import { routeConfig } from 'Routes/config';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';
import NumberInput from 'components/Input/NumberInput';

import './styles.scss';

export default ({ history }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    inventoryCreateTrigger,
    inventoryCreateResult,
    inventoryCreateLoading,
    inventoryCreateError,
  } = useInventoryCreate();
  const submitFormData = (formData) => {
    if (formData.quantity) {
      formData.quantity = parseInt(formData.quantity);
    }
    if (formData.lowStockQuantity) {
      formData.lowStockQuantity = parseInt(formData.lowStockQuantity);
    }
    if (formData.price) {
      formData.price = parseInt(formData.price);
    }
    setError('');
    setLoading(true);
    inventoryCreateTrigger(formData);
  };

  useEffect(() => {
    if (!inventoryCreateLoading) {
      if (inventoryCreateError) {
        const errorMessage =
          inventoryCreateError.message || 'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (inventoryCreateResult) {
        setLoading(false);
        history.push(routeConfig.inventory.path);
      }
    }
  }, [inventoryCreateLoading, inventoryCreateResult]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace"
      title="Create"
    >
      <div className="inventorycreate">
        <Form
          className="row-col"
          layout="vertical"
          form={form}
          initialValues={{}}
          onFinish={submitFormData}
        >
          <Row gutter={[24, 0]}>
            <Col md={12}>
              <TextInput
                label="Item Number"
                name="itemNumber"
                placeholder="Item Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input item number!',
                  },
                ]}
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="Title"
                name="title"
                placeholder="Title"
                rules={[
                  {
                    required: true,
                    message: 'Please input title!',
                  },
                ]}
              />
            </Col>
            <Col md={24}>
              <TextInput
                label="Description"
                name="description"
                placeholder="Description"
                rules={[]}
                type="textarea"
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="Unit"
                name="unit"
                placeholder="Unit"
                rules={[
                  {
                    required: true,
                    message: 'Please input unit!',
                  },
                ]}
              />
            </Col>
            {/* <Col md={12}>
              <TextInput
                label="Quantity"
                name="quantity"
                placeholder="Quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please input quantity!',
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: 'Value should contain just number',
                  },
                ]}
              />
            </Col> */}
            <Col md={12}>
              <TextInput
                label="Low Stock Quantity"
                name="lowStockQuantity"
                placeholder="Low Stock Quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please input lowStockQuantity!',
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: 'Value should contain just number',
                  },
                ]}
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="Price"
                name="price"
                placeholder="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input price!',
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: 'Value should contain just number',
                  },
                ]}
              />
            </Col>
            <Col md={12}>
              <SelectInput
                label="Status"
                name="status"
                placeholder="Status"
                rules={[
                  {
                    required: true,
                    message: 'Please input status!',
                  },
                ]}
                options={[
                  { title: 'Active', value: 'ACTIVE' },
                  { title: 'In-Active', value: 'INACTIVE' },
                ]}
              />
            </Col>
            {error != '' ? (
              <Col md={24}>
                <Alert
                  message={error}
                  type="error"
                  style={{ marginBottom: 24 }}
                />
              </Col>
            ) : null}
            <Col md={12}>
              <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
  );
};
