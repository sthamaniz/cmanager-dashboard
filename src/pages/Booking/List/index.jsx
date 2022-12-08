import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Badge, Row, Col } from 'antd';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import useBookings from 'hooks/booking/useBookings';
import useBookingDeleteById from 'hooks/booking/useBookingDeleteById';

import { routeConfig } from 'Routes/config';

import Table from 'components/Table';
import PrimaryButton from 'components/Button/PrimaryButton';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import './styles.scss';
import SelectInput from 'components/Input/SelectInput';

export default ({}) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('REQUESTED');
  const [deleteId, setDeleteId] = useState('');

  const { bookingsTrigger, bookingsResult, bookingsLoading } =
    useBookings();

  useEffect(() => {
    bookingsTrigger({ status: status });
  }, [status]);

  const {
    bookingDeleteByIdTrigger,
    bookingDeleteByIdLoading,
    bookingDeleteByIdResult,
    bookingDeleteByIdError,
  } = useBookingDeleteById({ refetchVariables: { status: status } });

  useEffect(() => {
    if (!bookingDeleteByIdLoading) {
      if (bookingDeleteByIdResult || bookingDeleteByIdError) {
        setDeleteId('');
      }
    }
  }, [
    bookingDeleteByIdLoading,
    bookingDeleteByIdResult,
    bookingDeleteByIdError,
  ]);

  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'sno',
      key: 'sno',
      render: (_, __, index) => (
        <Typography.Title level={5}>{index + 1}</Typography.Title>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (value) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {value.firstName} {value.lastName}
          </Typography.Title>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (value) => (
        <div className="avatar-info">
          <Typography.Title level={5}>{value.title}</Typography.Title>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (value) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {value.toLowerCase()}
          </Typography.Title>
        </div>
      ),
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'type',
      render: (value) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {value.toLowerCase()}
          </Typography.Title>
        </div>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value) => (
        <Typography.Title level={5}>
          {Moment(value).format('DD MMM, YYYY')}
        </Typography.Title>
      ),
    },
    // {
    //   title: 'Status',
    //   key: 'status',
    //   dataIndex: 'status',
    //   render: (value) => (
    //     <Badge
    //       count={value.toLowerCase()}
    //       style={{
    //         backgroundColor: STATUS_COLOR[value.toLowerCase()],
    //         fontSize: '14px',
    //         textTransform: 'capitalize',
    //         minWidth: '75px',
    //       }}
    //     />
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <Link
            to={routeConfig.bookingUpdate.path.replace(
              ':id',
              record._id,
            )}
          >
            <FontAwesomeIcon
              icon={faEdit}
              style={{ color: '#324565', marginRight: '5px' }}
            />
          </Link>{' '}
          {status !== 'BOOKED' ? (
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: '#324565', marginRight: '5px' }}
              onClick={() => setDeleteId(`${record._id}`)}
            />
          ) : null}
        </>
      ),
    },
  ];

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title={'Booking List'}
      >
        <div className="booking">
          <div className="booking_options">
            <Row gutter={[16, 16]}>
              <Col md={6}>
                <SelectInput
                  name="status"
                  placeholder="Status"
                  rules={[]}
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
                  onChange={(value) => setStatus(value)}
                  defaultValue={status}
                />
              </Col>
              <Col md={14}></Col>
              <Col md={4}>
                <PrimaryButton
                  title="Add Booking"
                  link={routeConfig.bookingCreate.path}
                />
              </Col>
            </Row>
          </div>
          {bookingsLoading || bookingDeleteByIdLoading ? (
            <Loader />
          ) : null}
          <div className="table-responsive">
            <Table
              columns={columns}
              data={bookingsResult}
              rowKey="title"
            />
          </div>
        </div>
      </Card>
      <Modal
        isModalVisible={deleteId && deleteId !== ''}
        title="Are You Sure?"
        body={'You cannot undo this once deleted.'}
        handleOK={() => bookingDeleteByIdTrigger({ id: deleteId })}
        loading={bookingDeleteByIdLoading}
        handleCancel={() => setDeleteId('')}
      />
    </>
  );
};
