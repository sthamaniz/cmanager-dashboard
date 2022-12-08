import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Form, Typography, Alert } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

import useUserLogin from 'hooks/user/useUserLogin';

import { getInitialRoute, routeConfig } from 'Routes/config';

import { authenticate } from 'services/auth';

import TextInput from 'components/Input/TextInput';
import ToggleInput from 'components/Input/ToggleInput';

import './styles.scss';
import Logo from 'assets/images/logo.jpg';

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
    <div className="login">
      <div className="login_logo">
        <img src={Logo} />
      </div>
      <Row>
        <Col span={16}>
          <div className="login_header">
            <div className="login_header_signup">
              <Link to={routeConfig.register.path}>
                <UserOutlined />
                Sign Up
              </Link>
            </div>
            <div className="login_header_signin">
              <Link to={routeConfig.login.path}>
                <KeyOutlined />
                Sign In
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row
        gutter={[24, 0]}
        style={{ marginBottom: '30px', marginTop: '100px' }}
      >
        <Col xs={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
          <Typography.Title className="login_title">
            Welcome Back
          </Typography.Title>
          <Typography.Title className="login_subtitle">
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
    </div>
  );
};
