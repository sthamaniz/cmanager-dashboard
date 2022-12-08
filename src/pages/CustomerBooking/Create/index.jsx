import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert, Divider } from 'antd';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';

import useCustomerBookingCreate from 'hooks/booking/useCustomerBookingCreate';
import useServices from 'hooks/service/useServices';

import { routeConfig } from 'Routes/config';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';
import TimeInput from 'components/Input/TimeInput';
import DateInput from 'components/Input/DateInput';
import Tag from 'components/Tag';

import './styles.scss';

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default ({ history }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingDays, setBookingDays] = useState([]);
  const [bookingDaysError, setBookingDaysError] = useState('');

  const { servicesTrigger, servicesResult, servicesLoading } =
    useServices();

  useEffect(() => {
    servicesTrigger({ status: 'ACTIVE' });
  }, []);

  const formatServices = () => {
    let formattedServices = [];

    if (!servicesLoading && servicesResult && servicesResult.length) {
      formattedServices = servicesResult.map((a) => ({
        title: a.title,
        value: a._id,
      }));
    }

    return formattedServices;
  };

  const updateDays = (day) => {
    setBookingDaysError('');

    let newBookingDays;
    if (bookingDays.includes(day)) {
      newBookingDays = bookingDays.filter((bd) => bd !== day);
    } else {
      newBookingDays = [...bookingDays, day];
    }

    setBookingDays(newBookingDays);
  };

  const {
    customerBookingCreateTrigger,
    customerBookingCreateResult,
    customerBookingCreateLoading,
    customerBookingCreateError,
  } = useCustomerBookingCreate();

  const submitFormData = (formData) => {
    if (!bookingDays.length) {
      setBookingDaysError('Booking Days is required');
      return;
    } else {
      const bookingData = {
        service: formData.service,
        type: formData.type,
        startDate: formData.startDate,
        frequency: formData.frequency,
        days: bookingDays,
        arrivalTime: formData.arrivalTime,
      };

      if (formData.note) {
        bookingData.note = formData.note;
      }

      setError('');
      setLoading(true);
      customerBookingCreateTrigger(bookingData);
    }
  };

  useEffect(() => {
    if (!customerBookingCreateLoading) {
      if (customerBookingCreateError) {
        const errorMessage =
          customerBookingCreateError.message ||
          'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (customerBookingCreateResult) {
        setLoading(false);
        history.push(routeConfig.customerBooking.path);
      }
    }
  }, [customerBookingCreateLoading, customerBookingCreateResult]);

  return (
    <div className="customerbookingcreate">
      <Form
        className="row-col"
        layout="vertical"
        form={form}
        initialValues={{ days: [] }}
        onFinish={submitFormData}
      >
        <Row gutter={[24, 0]}>
          <Col md={8}>
            <div className="customerbookingcreate_heading">
              Create Booking
            </div>
          </Col>
          <Col md={8}></Col>
          <Col md={8}>
            <DateInput
              form={form}
              name="startDate"
              placeholder="Start Date"
              rules={[
                {
                  required: true,
                  message: 'Please input start date!',
                },
              ]}
              disabledDate={(date) =>
                Moment().format() >= Moment(date).format()
              }
            />
          </Col>
        </Row>
        <Card
          bordered={false}
          className="criclebox tablespace customerbookingcreate_card"
        >
          <Row gutter={[24, 0]}>
            <Col>
              <div className="customerbookingcreate_header">
                Services
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col md={11}>
              <Row gutter={[24, 0]}>
                <Col md={24}>
                  <div className="customerbookingcreate_frequency">
                    Frequency and Time
                  </div>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col md={12}>
                  <SelectInput
                    name="frequency"
                    placeholder="Frequency"
                    rules={[
                      {
                        required: true,
                        message: 'Please input frequency!',
                      },
                    ]}
                    options={[
                      { title: 'Daily', value: 'DAILY' },
                      { title: 'Weekly', value: 'WEEKLY' },
                      { title: 'Fortnightly', value: 'FORTNIGHTLY' },
                      {
                        title: 'Twice Weekly',
                        value: 'TWICE_WEEKLY',
                      },
                      {
                        title: 'Three Weekly',
                        value: 'THREE_WEEKLY',
                      },
                      { title: 'Four Weekly', value: 'FOUR_WEEKLY' },
                      {
                        title: 'Monthly',
                        value: 'MONTHLY',
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col md={24}>
                  <div className="customerbookingcreate_days">
                    <div className="customerbookingcreate_days_list">
                      {DAYS.map((d) => (
                        <Tag
                          title={d}
                          checked={bookingDays.includes(d)}
                          onClick={() => updateDays(d)}
                        />
                      ))}
                    </div>
                    <div className="customerbookingcreate_days_placeholder">
                      Select single or multiple days
                    </div>
                    {bookingDaysError && bookingDaysError !== '' ? (
                      <div className="customerbookingcreate_days_error">
                        {bookingDaysError}
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <div className="customerbookingcreate_time">
                <Row gutter={[24, 0]}>
                  <Col md={12}>
                    <TimeInput
                      label="Arrival Time"
                      name="arrivalTime"
                      placeholder="Arrival Time"
                      rules={[
                        {
                          required: true,
                          message: 'Please input arrival time!',
                        },
                      ]}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={2} style={{ textAlign: 'center' }}>
              <Divider
                className="customerbookingcreate_verticaldivider"
                type="vertical"
              />
            </Col>
            <Col md={11}>
              <Row gutter={[24, 0]}>
                <Col md={24}>
                  <div className="customerbookingcreate_frequency">
                    Service
                  </div>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col md={12}>
                  <SelectInput
                    name="service"
                    placeholder="Service"
                    rules={[
                      {
                        required: true,
                        message: 'Please input service!',
                      },
                    ]}
                    options={formatServices()}
                  />
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col md={12}>
                  <SelectInput
                    name="type"
                    placeholder="Type"
                    rules={[
                      {
                        required: true,
                        message: 'Please input type!',
                      },
                    ]}
                    options={[
                      { title: 'Domestic', value: 'DOMESTIC' },
                      {
                        title: 'Commercial',
                        value: 'COMMERCIAL',
                      },
                    ]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className="customerbookingcreate_horizontaldivider" />
          <Row gutter={[24, 0]}>
            <Col md={24}>
              <div className="customerbookingcreate_frequency">
                Notes
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col md={16}>
              <TextInput
                name="note"
                placeholder="Notes (Crew will be able to see these notes)"
                rules={[]}
                type="textarea"
              />
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
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
        </Card>
      </Form>
    </div>
  );
};
