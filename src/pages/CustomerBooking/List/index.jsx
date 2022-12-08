import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Steps, Button, Timeline } from 'antd';
import Moment from 'moment';

import { routeConfig } from 'Routes/config';

import useCustomerBookings from 'hooks/booking/useCustomerBookings';

import Loader from 'components/Loader';
import BookingBox from './BookingBox';

import './styles.scss';

const STATUS = [
  {
    step: 0,
    key: 'REQUESTED',
    title: 'Requested',
    color: '#ffffff',
  },
  {
    step: 1,
    key: 'WAIT_LISTED',
    title: 'Wait Listed',
    color: '#eaeaea',
  },
  {
    step: 2,
    key: 'BOOKED',
    title: 'Booked',
    color: '#05d34e',
  },
  {
    step: 3,
    key: 'JOB_DONE',
    title: 'Job Done',
    color: '#05d34e',
  },
];

export default ({}) => {
  const [currentStatus, setCurrentStatus] = useState('');

  const {
    customerBookingsTrigger,
    customerBookingsResult,
    customerBookingsLoading,
    customerBookingsError,
  } = useCustomerBookings();

  useEffect(() => {
    const params = {};

    if (currentStatus && currentStatus !== '') {
      params.status = currentStatus;
    }

    customerBookingsTrigger(params);
  }, [currentStatus]);

  const getTimeline = () => {
    let timeline = [];

    if (
      !customerBookingsLoading &&
      customerBookingsResult &&
      customerBookingsResult.length
    ) {
      timeline = customerBookingsResult.map((c, i) => ({
        id: i,
        title: Moment(c.startDate).format('DD MMM, YYYY'),
        description: `${c.customer.firstName}'s ${c.service.title}`,
      }));
    }

    return timeline;
  };

  return (
    <div className="customerbooking">
      <Row>
        <Col span={6}>
          <div className="customerbooking_title">
            Hi, Welcome Back
          </div>
        </Col>
        <Col span={18}>
          <Card>
            <div className="customerbooking_status">
              <Steps
                direction="horizontal"
                labelPlacement="vertical"
                current={
                  currentStatus && currentStatus !== ''
                    ? STATUS.find((s) => s.key === currentStatus)[
                        'step'
                      ]
                    : null
                }
              >
                {STATUS.map((s) => (
                  <Steps.Step
                    key={`${s.key}`}
                    title={s.title}
                    onClick={() => setCurrentStatus(s.key)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Steps>
            </div>
          </Card>
        </Col>
      </Row>
      {customerBookingsLoading ? <Loader /> : null}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={16}>
          <div className="customerbooking_list">
            {customerBookingsResult &&
            customerBookingsResult.length ? (
              customerBookingsResult.map((c) => (
                <div className="customerbooking_list_single">
                  <BookingBox
                    statusOptions={STATUS}
                    id={c._id}
                    name={`${c.customer.firstName} ${c.customer.lastName}`}
                    service={c.service.title}
                    startDate={c.startDate}
                    frequency={c.frequency}
                    status={c.status}
                  />
                </div>
              ))
            ) : (
              <div>No bookings found</div>
            )}
          </div>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24}>
              <Card>
                <div className="customerbooking_create">
                  <div className="customerbooking_create_title">
                    Booking
                  </div>
                  <div className="customerbooking_create_button">
                    <Link to={routeConfig.customerBookingCreate.path}>
                      <Button type="secondary">Create Booking</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card style={{ marginTop: 20 }}>
                <div className="customerbooking_timeline">
                  <div className="customerbooking_timeline_title">
                    Timeline
                  </div>
                  <div className="customerbooking_timeline_list">
                    <Timeline>
                      {getTimeline().map((t) => (
                        <Timeline.Item key={`${t.id}`}>
                          <div className="customerbooking_timeline_list_item">
                            <div className="customerbooking_timeline_list_item_title">
                              {t.title}
                            </div>
                            <div className="customerbooking_timeline_list_item_description">
                              {t.description}
                            </div>
                          </div>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
