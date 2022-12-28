import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Alert, Divider } from 'antd';
import Moment from 'moment';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import useBookingById from 'hooks/booking/useBookingById';
import useBookingUpdateById from 'hooks/booking/useBookingUpdateById';
import useServices from 'hooks/service/useServices';
import useUsers from 'hooks/user/useUsers';

import { routeConfig } from 'Routes/config';

import TextInput from 'components/Input/TextInput';
import SelectInput from 'components/Input/SelectInput';
import SearchInput from 'components/Input/SearchInput';
import TimeInput from 'components/Input/TimeInput';
import DateInput from 'components/Input/DateInput';
import Tag from 'components/Tag';

import './styles.scss';

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default ({ history, match }) => {
  const urlId = match.params.id;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingDays, setBookingDays] = useState([]);
  const [bookingDaysError, setBookingDaysError] = useState('');

  const { servicesTrigger, servicesResult, servicesLoading } =
    useServices();

  const { usersTrigger, usersResult, usersLoading } = useUsers();

  const {
    usersTrigger: employeesTrigger,
    usersResult: employeesResult,
    usersLoading: employeesLoading,
  } = useUsers();

  useEffect(() => {
    servicesTrigger({ status: 'ACTIVE' });
    usersTrigger({
      role: 'CUSTOMER',
    });
    employeesTrigger({
      role: 'EMPLOYEE',
    });
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

  const formatCustomers = () => {
    let formattedCustomers = [];

    if (
      !usersLoading &&
      usersResult &&
      usersResult.data &&
      usersResult.data.length
    ) {
      formattedCustomers = usersResult.data.map((u) => ({
        title: `${u.firstName} ${u.lastName}`,
        value: u._id,
      }));
    }

    return formattedCustomers;
  };

  const formatEmployees = () => {
    let formattedEmployees = [];

    if (
      !employeesLoading &&
      employeesResult &&
      employeesResult.data &&
      employeesResult.data.length
    ) {
      formattedEmployees = employeesResult.data.map((u) => ({
        title: `${u.firstName} ${u.lastName}`,
        value: u._id,
      }));
    }

    return formattedEmployees;
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

  const { bookingByIdResult, bookingByIdLoading } =
    useBookingById(urlId);

  useEffect(() => {
    if (!bookingByIdLoading) {
      if (bookingByIdResult) {
        form.setFieldsValue({
          customer: bookingByIdResult.customer?._id,
          service: bookingByIdResult.service?._id,
          type: bookingByIdResult.type,
          priceType: bookingByIdResult.priceType,
          startDate: Moment(bookingByIdResult.startDate),
          frequency: bookingByIdResult.frequency,
          arrivalTime: bookingByIdResult.arrivalTime,
          employee:
            bookingByIdResult.assignedEmployees &&
            bookingByIdResult.assignedEmployees.length
              ? bookingByIdResult.assignedEmployees.map(
                  (ae) => ae.employee._id,
                )
              : null,
          note: bookingByIdResult.note,
          status: bookingByIdResult.status,
        });

        setBookingDays(bookingByIdResult.days);
      }
    }
  }, [bookingByIdLoading, bookingByIdResult]);

  const {
    bookingUpdateByIdTrigger,
    bookingUpdateByIdResult,
    bookingUpdateByIdLoading,
    bookingUpdateByIdError,
  } = useBookingUpdateById();

  const submitFormData = (formData) => {
    if (!bookingDays.length) {
      setBookingDaysError('Booking Days is required');
      return;
    } else {
      const bookingData = {
        id: urlId,
        customer: formData.customer,
        service: formData.service,
        type: formData.type,
        priceType: formData.priceType,
        startDate: formData.startDate,
        frequency: formData.frequency,
        days: bookingDays,
        arrivalTime: formData.arrivalTime,
        assignedEmployees: formData.employee.map((e) => ({
          employee: e,
        })),
        status: formData.status,
      };

      if (formData.note) {
        bookingData.note = formData.note;
      }

      setError('');
      setLoading(true);
      bookingUpdateByIdTrigger(bookingData);
    }
  };

  useEffect(() => {
    if (!bookingUpdateByIdLoading) {
      if (bookingUpdateByIdError) {
        const errorMessage =
          bookingUpdateByIdError.message || 'Something went wrong.';
        setError(errorMessage);
        setLoading(false);
      }

      if (bookingUpdateByIdResult) {
        setLoading(false);
        history.push(routeConfig.booking.path);
      }
    }
  }, [bookingUpdateByIdLoading, bookingUpdateByIdResult]);

  return (
    <div className="bookingcreate">
      <Form
        className="row-col"
        layout="vertical"
        form={form}
        initialValues={{ days: [] }}
        onFinish={submitFormData}
      >
        <Row gutter={[24, 0]}>
          <Col md={8}>
            <SearchInput
              form={form}
              name="customer"
              placeholder="Type customer name"
              rules={[
                {
                  required: true,
                  message: 'Please input customer!',
                },
              ]}
              options={formatCustomers()}
              icon={faUser}
              bottomText="Search item must contain at least 3 character"
            />
          </Col>
          <Col md={8}>
            {/* <div className="bookingcreate_customer">
                No Customer Selected
              </div> */}
          </Col>
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
          className="criclebox tablespace bookingcreate_card"
        >
          <Row gutter={[24, 0]}>
            <Col>
              <div className="bookingcreate_header">Services</div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col md={11}>
              <Row gutter={[24, 0]}>
                <Col md={24}>
                  <div className="bookingcreate_frequency">
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
                      { title: 'One Off', value: 'ONE_OFF' },
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
                  <div className="bookingcreate_days">
                    <div className="bookingcreate_days_list">
                      {DAYS.map((d) => (
                        <Tag
                          title={d}
                          checked={bookingDays.includes(d)}
                          onClick={() => updateDays(d)}
                        />
                      ))}
                    </div>
                    <div className="bookingcreate_days_placeholder">
                      Select single or multiple days
                    </div>
                    {bookingDaysError && bookingDaysError !== '' ? (
                      <div className="bookingcreate_days_error">
                        {bookingDaysError}
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <div className="bookingcreate_time">
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
                className="bookingcreate_verticaldivider"
                type="vertical"
              />
            </Col>
            <Col md={11}>
              <Row gutter={[24, 0]}>
                <Col md={24}>
                  <div className="bookingcreate_frequency">
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
              <Row gutter={[24, 0]}>
                <Col md={12}>
                  <SelectInput
                    name="priceType"
                    placeholder="Price Type"
                    rules={[
                      {
                        required: true,
                        message: 'Please input price type!',
                      },
                    ]}
                    options={[
                      { title: 'Flat Rate', value: 'FLAT_RATE' },
                      {
                        title: 'Per Hour',
                        value: 'PER_HOUR',
                      },
                    ]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className="bookingcreate_horizontaldivider" />
          <Row gutter={[24, 0]}>
            <Col md={24}>
              <div className="bookingcreate_frequency">
                Employee for the job
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col md={8}>
              <SelectInput
                name="employee"
                placeholder="Employee"
                rules={[
                  {
                    required: true,
                    message: 'Please input employee!',
                  },
                ]}
                options={formatEmployees()}
                mode="multiple"
              />
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col md={24}>
              <div className="bookingcreate_frequency">Notes</div>
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
          <Divider className="bookingcreate_horizontaldivider" />
          <Row gutter={[24, 0]}>
            <Col md={12}>
              <SelectInput
                name="status"
                placeholder="Status"
                rules={[
                  {
                    required: true,
                    message: 'Please input status!',
                  },
                ]}
                options={[
                  { title: 'Requested', value: 'REQUESTED' },
                  {
                    title: 'Wait Listed',
                    value: 'WAIT_LISTED',
                  },
                  {
                    title: 'Booked',
                    value: 'BOOKED',
                  },
                ]}
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
