import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Row, Col, Form, Typography, Alert } from 'antd';

import useUserLogin from 'hooks/user/useUserLogin';

import { getInitialRoute } from 'Routes/config';

import { authenticate } from 'services/auth';

import TextInput from 'components/Input/TextInput';
import ToggleInput from 'components/Input/ToggleInput';

export default ({ history }) => {
  const [form] = Form.useForm();

  const [error, setError] = useState('');

  const {
    userLoginTrigger,
    userLoginResult,
    userLoginLoading,
    userLoginError,
  } = useUserLogin();

  const submitFormData = (formData) => {
    userLoginTrigger(formData);
  };

  useEffect(() => {
    if (!userLoginLoading) {
      if (userLoginError) {
        const errorMessage =
          userLoginError.message || 'Something went wrong.';
        setError(errorMessage);
      }

      if (userLoginResult && userLoginResult.accessToken) {
        //store accesstoken
        authenticate(
          userLoginResult.accessToken,
          userLoginResult.user,
        );

        history.push(getInitialRoute());
      }
    }
  }, [userLoginLoading, userLoginResult]);

  return (
    <Row
      gutter={[24, 0]}
      justify="space-around"
      style={{ marginBottom: '30px' }}
    >
      <Col
        xs={{ span: 24, offset: 0 }}
        lg={{ span: 6, offset: 2 }}
        md={{ span: 12 }}
      >
        <Typography.Title className="mb-15">Log In</Typography.Title>
        <Typography.Title
          className="font-regular text-muted"
          level={5}
        >
          Enter your email and password to sign in
        </Typography.Title>

        <Form
          className="row-col"
          layout="vertical"
          form={form}
          initialValues={{ rememberMe: true }}
          onFinish={submitFormData}
        >
          <TextInput
            label="Email"
            name="email"
            placeholder="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          />

          <TextInput
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          />

          <ToggleInput
            form={form}
            label="Remember Me"
            name="rememberMe"
            defaultChecked
          />

          {error !== '' ? (
            <Form.Item>
              <Alert message={error} type="error" />
            </Form.Item>
          ) : null}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={userLoginLoading}
            >
              LOG IN
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
