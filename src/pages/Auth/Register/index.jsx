import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Form, Typography, Alert } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

import useUserRegister from 'hooks/user/useUserRegister';

import { routeConfig } from 'Routes/config';

import { authenticate } from 'services/auth';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';

import './styles.scss';
import Logo from 'assets/images/logo.jpg';

export default ({ history }) => {
  const [form] = Form.useForm();

  const [error, setError] = useState('');

  const {
    userRegisterTrigger,
    userRegisterResult,
    userRegisterLoading,
    userRegisterError,
  } = useUserRegister();

  const submitFormData = (formData) => {
    formData.role = 'CUSTOMER';
    formData.status = 'ACTIVE';

    userRegisterTrigger(formData);
  };

  useEffect(() => {
    if (!userRegisterLoading) {
      if (userRegisterError) {
        const errorMessage =
          userRegisterError.message || 'Something went wrong.';
        setError(errorMessage);
      }

      if (userRegisterResult) {
        history.push(routeConfig.login.path);
      }
    }
  }, [userRegisterLoading, userRegisterResult]);

  return (
    <div className="register">
      <div className="register_logo">
        <img src={Logo} />
      </div>
      <Row>
        <Col span={16}>
          <div className="register_header">
            <div className="register_header_signup">
              <Link to={routeConfig.register.path}>
                <UserOutlined />
                Sign Up
              </Link>
            </div>
            <div className="register_header_signin">
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
          <Typography.Title className="register_title">
            Welcome
          </Typography.Title>
          <Typography.Title className="register_subtitle">
            Enter your details to register
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

            <TextInput
              label="First Name"
              name="firstName"
              placeholder="First Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your first fame!',
                },
              ]}
            />

            <TextInput
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',
                },
              ]}
            />

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

            <TextInput
              label="Mobile"
              name="mobile"
              placeholder="Mobile"
              rules={[
                {
                  required: true,
                  message: 'Please input your mobile!',
                },
              ]}
            />
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
                { title: 'Webiste', value: 'WEBISTE' },
                { title: 'Phone', value: 'PHONE' },
              ]}
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
                loading={userRegisterLoading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
