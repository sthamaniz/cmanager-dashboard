import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'antd';

import useUserById from 'hooks/user/useUserById';
import useUserUpdateById from 'hooks/user/useUserUpdateById';

import { routeConfig } from 'Routes/config';

import * as validation from 'utils/validation';

import { fileUpload } from 'services/file';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';
import ImageUpload from 'components/Input/ImageUpload';
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
          gender: userByIdResult.gender,
          mobile: userByIdResult.mobile,
          address: userByIdResult.address,
          australianBusinessNumber:
            userByIdResult.australianBusinessNumber,
          taxFileNumber: userByIdResult.taxFileNumber,
          idType: userByIdResult.idType,
          idNumber: userByIdResult.idNumber,
          idImage: userByIdResult.idImage,
          emergencyContactNumber:
            userByIdResult.emergencyContactNumber,
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

    if (formData.taxFileNumber) {
      formData.taxFileNumber = parseInt(formData.taxFileNumber);
    }

    if (formData.australianBusinessNumber) {
      formData.australianBusinessNumber = parseInt(
        formData.australianBusinessNumber,
      );
    }

    if (formData.idNumber) {
      formData.idNumber = parseInt(formData.idNumber);
    }

    setError('');
    setLoading(true);

    if (formData.idImage instanceof File) {
      fileUpload('id_image', formData.idImage).then((res) => {
        formData.idImage = res.data;

        userUpdateByIdTrigger(formData);
      });
    } else {
      userUpdateByIdTrigger(formData);
    }
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
        history.push(routeConfig.employee.path);
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
        className="employeeupdate"
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
            <Col md={12}>
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
            </Col>
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
            <Col md={24}>
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
              <TextInput
                label="ABN (Australian Business Number)"
                name="australianBusinessNumber"
                placeholder="ABN (Australian Business Number)"
                rules={[]}
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="TFN (Tax File Number)"
                name="taxFileNumber"
                placeholder="TFN (Tax File Number)"
                rules={[]}
              />
            </Col>
            <Col md={12}>
              <SelectInput
                label="ID Type"
                name="idType"
                placeholder="ID Type"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID Type!',
                  },
                ]}
                options={[
                  {
                    title: 'Driving License',
                    value: 'DRIVING_LICENSE',
                  },
                  {
                    title: 'Passport',
                    value: 'PASSPORT',
                  },
                  {
                    title: 'Photo Id',
                    value: 'PHOTO_ID',
                  },
                ]}
              />
            </Col>
            <Col md={12}>
              <TextInput
                label="ID Number"
                name="idNumber"
                placeholder="ID Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID Number!',
                  },
                ]}
              />
            </Col>
            <Col md={24}>
              <ImageUpload
                form={form}
                label="Id Image"
                name="idImage"
                rules={[]}
              />
            </Col>
            <Col md={24}>
              <TextInput
                label="Emergency Contact Number"
                name="emergencyContactNumber"
                placeholder="Emergency Contact Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input Emergency Contact Number!',
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
