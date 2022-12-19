import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useInventoryById from 'hooks/inventory/useInventoryById';
import useInventoryUpdateById from 'hooks/inventory/useInventoryUpdateById';

import { routeConfig } from 'Routes/config';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';
import Loader from 'components/Loader';

import './styles.scss';

export default ({ history, match }) => {
  const urlId = match.params.id;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { inventoryByIdResult, inventoryByIdLoading } =
    useInventoryById(urlId);
  useEffect(() => {
    if (!inventoryByIdLoading) {
      if (inventoryByIdResult) {
        form.setFieldsValue({
          itemNumber: inventoryByIdResult.itemNumber,
          title: inventoryByIdResult.title,
          description: inventoryByIdResult.description,
          unit: inventoryByIdResult.unit,
          // quantity: inventoryByIdResult.quantity,
          lowStockQuantity: inventoryByIdResult.lowStockQuantity,
          price: inventoryByIdResult.price,
          status: inventoryByIdResult.status,
        });
      }
    }
  }, [inventoryByIdLoading, inventoryByIdResult]);

  const {
    inventoryUpdateByIdTrigger,
    inventoryUpdateByIdResult,
    inventoryUpdateByIdLoading,
    inventoryUpdateByIdError,
  } = useInventoryUpdateById();
  const submitFormData = (formData) => {
    formData.id = urlId;
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
    inventoryUpdateByIdTrigger(formData);
  };

  useEffect(() => {
    if (!inventoryUpdateByIdLoading) {
      if (inventoryUpdateByIdError) {
        const errorMessage =
          inventoryUpdateByIdError.message || 'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (inventoryUpdateByIdResult) {
        setLoading(false);
        history.push(routeConfig.inventory.path);
      }
    }
  }, [inventoryUpdateByIdLoading, inventoryUpdateByIdResult]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace"
      title="Update"
    >
      <div className="inventoryupdate">
        {inventoryByIdLoading ? <Loader /> : null}
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
                  disabled={inventoryByIdLoading}
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
