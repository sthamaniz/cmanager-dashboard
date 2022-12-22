import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useInventories from 'hooks/inventory/useInventories';
import useInventoryServiceCreate from 'hooks/inventoryService/useInventoryServiceCreate';

import { routeConfig } from 'Routes/config';

import TextInput from 'components/Input/TextInput';
import SearchInput from 'components/Input/SearchInput';

import './styles.scss';

export default ({ history }) => {
  const [form] = Form.useForm();

  const [selectedItem, setSelectedItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    inventoriesTrigger,
    inventoriesResult,
    inventoriesLoading,
  } = useInventories();

  useEffect(() => {
    inventoriesTrigger();
  }, []);

  const formatInventories = () => {
    let formattedInventories = [];

    if (
      !inventoriesLoading &&
      inventoriesResult &&
      inventoriesResult.length
    ) {
      formattedInventories = inventoriesResult.map((i) => ({
        title: i.itemNumber,
        value: i._id,
      }));
    }

    return formattedInventories;
  };

  const {
    inventoryServiceCreateTrigger,
    inventoryServiceCreateResult,
    inventoryServiceCreateLoading,
    inventoryServiceCreateError,
  } = useInventoryServiceCreate();
  const submitFormData = (formData) => {
    setError('');
    setLoading(true);
    inventoryServiceCreateTrigger(formData);
  };

  useEffect(() => {
    if (!inventoryServiceCreateLoading) {
      if (inventoryServiceCreateError) {
        const errorMessage =
          inventoryServiceCreateError.message ||
          'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (inventoryServiceCreateResult) {
        setLoading(false);
        history.push(routeConfig.inventoryService.path);
      }
    }
  }, [inventoryServiceCreateLoading, inventoryServiceCreateResult]);

  const onItemChange = (event) => {
    const { value } = event.target;

    let newSelectedItem = {};
    if (
      value &&
      value !== '' &&
      !inventoriesLoading &&
      inventoriesResult &&
      inventoriesResult.length
    ) {
      if (selectedItem._id) {
        if (selectedItem._id !== value) {
          newSelectedItem = inventoriesResult.find(
            (i) => i._id === value,
          );
          setSelectedItem(newSelectedItem);
        }
      } else {
        newSelectedItem = inventoriesResult.find(
          (i) => i._id === value,
        );
        setSelectedItem(newSelectedItem);
      }
    }
  };

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
              <SearchInput
                form={form}
                label="Enter Item Number"
                name="inventory"
                placeholder="Item Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input item number!',
                  },
                ]}
                options={formatInventories()}
                onChange={onItemChange}
                mode={'search'}
              />
            </Col>
            <Col md={12}></Col>
            {selectedItem && selectedItem._id && (
              <Col md={24}>
                <Row
                  style={{
                    border: '1px solid #C9C3C9',
                    borderRadius: 7,
                    padding: 20,
                    marginBottom: 20,
                  }}
                >
                  <Col md={6}>
                    <Row>
                      <Col md={24} style={{ marginBottom: 10 }}>
                        Item Number
                      </Col>
                      <Col md={24}>{selectedItem.itemNumber}</Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={24} style={{ marginBottom: 10 }}>
                        Product Name
                      </Col>
                      <Col md={24}>{selectedItem.title}</Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={24} style={{ marginBottom: 10 }}>
                        Unit
                      </Col>
                      <Col md={24}>{selectedItem.unit}</Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={24} style={{ marginBottom: 10 }}>
                        Quantity
                      </Col>
                      <Col md={24}>{selectedItem.quantity}</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            )}
            <Col md={12}>
              <TextInput
                label="Note"
                name="note"
                placeholder="note"
                type="textarea"
                rules={[]}
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
            <Col md={24}>
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
