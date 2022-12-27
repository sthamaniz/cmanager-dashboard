import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useInventoryCategoryById from 'hooks/inventoryCategory/useInventoryCategoryById';
import useInventoryCategoryUpdateById from 'hooks/inventoryCategory/useInventoryCategoryUpdateById';

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

  const {
    inventoryCategoryByIdResult,
    inventoryCategoryByIdLoading,
  } = useInventoryCategoryById(urlId);
  useEffect(() => {
    if (!inventoryCategoryByIdLoading) {
      if (inventoryCategoryByIdResult) {
        form.setFieldsValue({
          title: inventoryCategoryByIdResult.title,
          description: inventoryCategoryByIdResult.description,
          isServicable: inventoryCategoryByIdResult.isServicable,
          status: inventoryCategoryByIdResult.status,
        });
      }
    }
  }, [inventoryCategoryByIdLoading, inventoryCategoryByIdResult]);

  const {
    inventoryCategoryUpdateByIdTrigger,
    inventoryCategoryUpdateByIdResult,
    inventoryCategoryUpdateByIdLoading,
    inventoryCategoryUpdateByIdError,
  } = useInventoryCategoryUpdateById();
  const submitFormData = (formData) => {
    formData.id = urlId;
    setError('');
    setLoading(true);
    inventoryCategoryUpdateByIdTrigger(formData);
  };

  useEffect(() => {
    if (!inventoryCategoryUpdateByIdLoading) {
      if (inventoryCategoryUpdateByIdError) {
        const errorMessage =
          inventoryCategoryUpdateByIdError.message ||
          'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (inventoryCategoryUpdateByIdResult) {
        setLoading(false);
        history.push(routeConfig.inventoryCategory.path);
      }
    }
  }, [
    inventoryCategoryUpdateByIdLoading,
    inventoryCategoryUpdateByIdResult,
  ]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace"
      title="Update"
    >
      <div className="inventoryupdate">
        {inventoryCategoryByIdLoading ? <Loader /> : null}
        <Form
          className="row-col"
          layout="vertical"
          form={form}
          initialValues={{}}
          onFinish={submitFormData}
        >
          <Row gutter={[24, 0]}>
            <Col md={24}>
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
              <SelectInput
                label="Servicable"
                name="isServicable"
                placeholder="Servicable"
                rules={[
                  {
                    required: true,
                    message: 'Please input servicable!',
                  },
                ]}
                options={[
                  { title: 'Yes', value: true },
                  { title: 'No', value: false },
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
                  disabled={inventoryCategoryByIdLoading}
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
