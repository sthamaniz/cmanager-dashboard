import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useCustomerFeedbackCreate from 'hooks/feedback/useCustomerFeedbackCreate';

import { routeConfig } from 'Routes/config';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';

import './styles.scss';

export default ({ history }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    customerCreateTrigger,
    customerCreateResult,
    customerCreateLoading,
    customerCreateError,
  } = useCustomerFeedbackCreate();
  const submitFormData = (formData) => {
    setError('');
    setLoading(true);
    customerCreateTrigger(formData);
  };

  useEffect(() => {
    if (!customerCreateLoading) {
      if (customerCreateError) {
        const errorMessage =
          customerCreateError.message || 'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (customerCreateResult) {
        setLoading(false);
        history.push(routeConfig.service.path);
      }
    }
  }, [customerCreateLoading, customerCreateResult]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace"
      title="Create"
    >
      <div
        className="customercreate"
        style={{ padding: '12px 24px' }}
      >
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
                label="Feedback"
                name="value"
                placeholder="Feedback"
                rules={[]}
                type="textarea"
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
