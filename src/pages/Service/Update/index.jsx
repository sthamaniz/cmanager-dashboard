import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useServiceById from 'hooks/service/useServiceById';
import useServiceUpdateById from 'hooks/service/useServiceUpdateById';

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

  const { serviceByIdResult, serviceByIdLoading } =
    useServiceById(urlId);
  useEffect(() => {
    if (!serviceByIdLoading) {
      if (serviceByIdResult) {
        form.setFieldsValue({
          title: serviceByIdResult.title,
          description: serviceByIdResult.description,
          status: serviceByIdResult.status,
        });
      }
    }
  }, [serviceByIdLoading, serviceByIdResult]);

  const {
    serviceUpdateByIdTrigger,
    serviceUpdateByIdResult,
    serviceUpdateByIdLoading,
    serviceUpdateByIdError,
  } = useServiceUpdateById();
  const submitFormData = (formData) => {
    formData.id = urlId;

    setError('');
    setLoading(true);
    serviceUpdateByIdTrigger(formData);
  };

  useEffect(() => {
    if (!serviceUpdateByIdLoading) {
      if (serviceUpdateByIdError) {
        const errorMessage =
          serviceUpdateByIdError.message || 'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (serviceUpdateByIdResult) {
        setLoading(false);
        history.push(routeConfig.service.path);
      }
    }
  }, [serviceUpdateByIdLoading, serviceUpdateByIdResult]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace"
      title="Update"
    >
      <div className="serviceupdate" style={{ padding: '12px 24px' }}>
        {serviceByIdLoading ? <Loader /> : null}
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
                  disabled={serviceByIdLoading}
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
