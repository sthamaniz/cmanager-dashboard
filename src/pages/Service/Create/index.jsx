import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useServiceCreate from 'hooks/service/useServiceCreate';

import { routeConfig } from 'Routes/config';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';

import './styles.scss';

export default ({ history }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    serviceCreateTrigger,
    serviceCreateResult,
    serviceCreateLoading,
    serviceCreateError,
  } = useServiceCreate();
  const submitFormData = (formData) => {
    setError('');
    setLoading(true);
    serviceCreateTrigger(formData);
  };

  useEffect(() => {
    if (!serviceCreateLoading) {
      if (serviceCreateError) {
        const errorMessage =
          serviceCreateError.message || 'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (serviceCreateResult) {
        setLoading(false);
        history.push(routeConfig.service.path);
      }
    }
  }, [serviceCreateLoading, serviceCreateResult]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace"
      title="Create"
    >
      <div className="servicecreate" style={{ padding: '12px 24px' }}>
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
            <Col md={24}>
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
