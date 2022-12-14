import { useState, useEffect } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import useRosters from 'hooks/roster/useRosters';
import useUsers from 'hooks/user/useUsers';
import useRosterDeleteById from 'hooks/roster/useRosterDeleteById';

import Table from 'components/Table';
import Loader from 'components/Loader';
import DateInput from 'components/Input/DateInput';
import Modal from 'components/Modal';
import Detail from '../Detail';
import ExcelOptions from '../ExcelOptions';

import './styles.scss';

export default ({}) => {
  const [columns, setColumns] = useState([]);
  const [selectedDate, setSelectedDate] = useState([
    Moment(),
    Moment().add(1, 'days'),
  ]);
  const [selectedDetail, setSelectedDetail] = useState({});
  const [deleteId, setDeleteId] = useState('');

  const { rostersTrigger, rostersResult, rostersLoading } =
    useRosters();

  useEffect(() => {
    let variables = {};
    if (selectedDate && selectedDate.length > 0) {
      variables = {
        startDate: selectedDate[0],
        endDate: selectedDate[1],
      };
    }

    rostersTrigger(variables);
  }, [selectedDate]);

  const { usersTrigger, usersResult, usersLoading } = useUsers();

  useEffect(() => {
    if (!rostersLoading && rostersResult) {
      usersTrigger({
        role: 'EMPLOYEE',
      });
    }
  }, [rostersLoading, rostersResult]);

  const {
    rosterDeleteByIdTrigger,
    rosterDeleteByIdResult,
    rosterDeleteByIdLoading,
    rosterDeleteByIdError,
  } = useRosterDeleteById({
    refetchVariables: {
      startDate: selectedDate[0],
      endDate: selectedDate[1],
    },
  });

  useEffect(() => {
    if (!rosterDeleteByIdLoading) {
      if (rosterDeleteByIdResult || rosterDeleteByIdError) {
        setDeleteId('');
      }
    }
  }, [
    rosterDeleteByIdLoading,
    rosterDeleteByIdResult,
    rosterDeleteByIdError,
  ]);

  const getEmployeeTime = (
    customerHours,
    assignedEmployees,
    employeeId,
  ) => {
    const assignedEmployeeIds =
      assignedEmployees &&
      Array.isArray(assignedEmployees) &&
      assignedEmployees.length > 0
        ? assignedEmployees.map((ae) => ae.employee._id)
        : [];

    if (assignedEmployeeIds.includes(employeeId)) {
      if (!customerHours || customerHours === '') {
        return 0;
      }

      return (
        Math.floor(
          (parseInt(customerHours) /
            parseInt(assignedEmployees.length)) *
            100,
        ) / 100
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    let newColumns = [
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
        render: (_, row) => (
          <div className="avatar-info">
            <Typography.Title level={5}>
              {row.booking?.customer?.firstName}{' '}
              {row.booking?.customer?.lastName}
            </Typography.Title>
          </div>
        ),
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (_, row) => (
          <div className="avatar-info">
            <Typography.Title level={5}>
              {row.booking?.customer?.address}
            </Typography.Title>
          </div>
        ),
      },
      {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
        render: (_, row) => (
          <div className="avatar-info">
            <Typography.Title level={5}>
              {row.booking?.service?.title}
            </Typography.Title>
          </div>
        ),
      },
      {
        title: 'Total',
        dataIndex: 'hours',
        key: 'hours',
        render: (_, row) => (
          <div className="avatar-info">
            <Typography.Title level={5}>
              {row.booking &&
              row.booking.customer &&
              row.booking.customer.hours
                ? row.booking.customer.hours
                : 0}
            </Typography.Title>
          </div>
        ),
      },
    ];

    if (
      !usersLoading &&
      usersResult &&
      usersResult.data &&
      usersResult.data.length
    ) {
      usersResult.data.forEach((ur) => {
        newColumns.push({
          title: `${ur.firstName} ${ur.lastName}`,
          dataIndex: ur._id,
          key: ur._id,
          render: (_, row) => (
            <div className="avatar-info">
              <Typography.Title level={5}>
                {getEmployeeTime(
                  row.booking?.customer?.hours,
                  row.booking?.assignedEmployees,
                  ur._id,
                )}
              </Typography.Title>
            </div>
          ),
        });
      });

      newColumns.push({
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
        render: (_, record) => (
          <>
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => setSelectedDetail(record)}
              style={{
                color: '#324565',
                marginRight: '5px',
                cursor: 'pointer',
              }}
            />
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: '#324565', cursor: 'pointer' }}
              onClick={() => setDeleteId(`${record._id}`)}
            />
          </>
        ),
      });
    }

    setColumns(newColumns);
  }, [usersLoading, usersResult]);

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title={
          <Row gutter={[8, 8]}>
            <Col md={13}>Roster List</Col>
            <Col md={8}>
              <DateInput
                name="date"
                value
                onChange={(date) => setSelectedDate(date)}
                defaultValue={selectedDate}
                range={true}
              />
            </Col>
            <Col md={3}>
              <ExcelOptions
                loading={rostersLoading || usersLoading}
                rosterData={rostersResult}
                userData={usersResult}
              />
            </Col>
          </Row>
        }
      >
        <div className="roster">
          {/* <div className="booking_options">
          <Row gutter={[16, 16]}>
            <Col md={6}>
              <TextInput
                type="text"
                name="search"
                value={search}
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
              />
            </Col>
            <Col md={3}>
              <PrimaryButton
                title="Search"
                onClick={() => console.log(search)}
              />
            </Col>
          </Row>
        </div> */}
          {rostersLoading || usersLoading ? <Loader /> : null}
          {rostersResult && rostersResult.length ? (
            rostersResult.map((rr) => (
              <div
                className="table-responsive"
                style={{ marginBottom: 30 }}
              >
                <div className="roster_date">
                  {Moment(rr.date).format('DD MMM, YYYY')}
                </div>
                <Table
                  columns={columns}
                  data={rr.rosters}
                  rowKey="title"
                />
              </div>
            ))
          ) : (
            <div>No rosters found</div>
          )}
        </div>
      </Card>
      <Detail
        selectedDetail={selectedDetail}
        setSelectedDetail={setSelectedDetail}
      />
      <Modal
        isModalVisible={deleteId && deleteId !== ''}
        title="Are You Sure?"
        body={'You cannot undo this once deleted.'}
        handleOK={() => rosterDeleteByIdTrigger({ id: deleteId })}
        loading={rosterDeleteByIdLoading}
        handleCancel={() => setDeleteId('')}
      />
    </>
  );
};
