import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useUserById from 'hooks/user/useUserById';
import useUserUpdateById from 'hooks/user/useUserUpdateById';

import { routeConfig } from 'Routes/config';

import * as validation from 'utils/validation';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';
import Loader from 'components/Loader';

import './styles.scss';

export default ({ history, match }) => {
  const urlId = match.params.id;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { userByIdResult, userByIdLoading } = useUserById(urlId);
  useEffect(() => {
    if (!userByIdLoading) {
      if (userByIdResult) {
        form.setFieldsValue({
          email: userByIdResult.email,
          firstName: userByIdResult.firstName,
          lastName: userByIdResult.lastName,
          // gender: userByIdResult.gender,
          mobile: userByIdResult.mobile,
          address: userByIdResult.address,
          source: userByIdResult.source,
          hours: userByIdResult.hours,
          status: userByIdResult.status,
        });
      }
    }
  }, [userByIdLoading, userByIdResult]);

  const {
    userUpdateByIdTrigger,
    userUpdateByIdResult,
    userUpdateByIdLoading,
    userUpdateByIdError,
  } = useUserUpdateById();
  const submitFormData = (formData) => {
    formData.id = urlId;

    if (formData.hours && formData.hours !== '') {
      formData.hours = parseInt(formData.hours);
    }

    setError('');
    setLoading(true);
    userUpdateByIdTrigger(formData);
  };

  useEffect(() => {
    if (!userUpdateByIdLoading) {
      if (userUpdateByIdError) {
        const errorMessage =
          userUpdateByIdError.message || 'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (userUpdateByIdResult) {
        setLoading(false);
        history.push(routeConfig.customer.path);
      }
    }
  }, [userUpdateByIdLoading, userUpdateByIdResult]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace"
      title="Update"
    >
      <div
        className="customerupdate"
        style={{ padding: '12px 24px' }}
      >
        {userByIdLoading ? <Loader /> : null}
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
                label="Email"
                name="email"
                placeholder="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input email!',
                  },
                  {
                    type: 'email',
                    message: 'Invalid email!',
                  },
                ]}
                disabled
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="First Name"
                name="firstName"
                placeholder="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input first name!',
                  },
                ]}
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input last name!',
                  },
                ]}
              />
            </Col>
            {/* <Col md={12}>
              <SelectInput
                label="Gender"
                name="gender"
                placeholder="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please input gender!',
                  },
                ]}
                options={[
                  { title: 'Male', value: 'MALE' },
                  { title: 'Female', value: 'FEMALE' },
                  { title: 'Other', value: 'OTHER' },
                ]}
              />
            </Col> */}
            <Col md={12}>
              <TextInput
                label="Mobile"
                name="mobile"
                placeholder="Mobile"
                rules={[
                  {
                    required: true,
                    message: 'Please input mobile!',
                  },
                  () => ({
                    validator(_, value) {
                      if (value && value !== '') {
                        if (!validation.mobile(value)) {
                          return Promise.reject(
                            new Error('Invalid mobile!'),
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="Address"
                name="address"
                placeholder="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input address!',
                  },
                ]}
              />
            </Col>
            <Col md={12}>
              <SelectInput
                label="Source"
                name="source"
                placeholder="Source"
                rules={[
                  {
                    required: true,
                    message: 'Please input source!',
                  },
                ]}
                options={[
                  { title: 'Facebook Page', value: 'FACEBOOK_PAGE' },
                  {
                    title: 'Facebook Profile',
                    value: 'FACEBOOK_PROFILE',
                  },
                  { title: 'Website', value: 'WEBSITE' },
                  { title: 'Phone', value: 'PHONE' },
                ]}
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="Hours"
                name="hours"
                placeholder="Hours"
                rules={[
                  {
                    required: true,
                    message: 'Please input hours!',
                  },
                ]}
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
                  disabled={userByIdLoading}
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
