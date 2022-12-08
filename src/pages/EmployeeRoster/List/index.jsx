import { useEffect, useState } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import Moment from 'moment';

import useEmployeeRosters from 'hooks/roster/useEmpoyeeRosters';

import Table from 'components/Table';
import Loader from 'components/Loader';
import DateInput from 'components/Input/DateInput';

import './styles.scss';

export default ({}) => {
  const [selectedDate, setSelectedDate] = useState([
    Moment(),
    Moment().add(1, 'days'),
  ]);

  const {
    employeeRostersTrigger,
    employeeRostersResult,
    employeeRostersLoading,
  } = useEmployeeRosters();

  useEffect(() => {
    let variables = {};
    if (selectedDate && selectedDate.length > 0) {
      variables = {
        startDate: selectedDate[0],
        endDate: selectedDate[1],
      };
    }

    employeeRostersTrigger(variables);
  }, [selectedDate]);

  const getEmployeeTime = (customerHours, assignedEmployees) => {
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
  };

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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, row) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {row.date ? Moment(row.date).format('DD MMM YYYY') : null}
          </Typography.Title>
        </div>
      ),
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      render: (_, row) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {row.booking?.arrivalTime}
          </Typography.Title>
        </div>
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
      title: 'Hours',
      dataIndex: 'customer',
      key: 'customer',
      render: (_, row) => (
        <div className="avatar-info">
          <Typography.Title level={5}>
            {getEmployeeTime(
              row.booking?.customer?.hours,
              row.booking?.assignedEmployees,
            )}
          </Typography.Title>
        </div>
      ),
    },
  ];

  return (
    <Card
      bordered={false}
      className="criclebox tablespace mb-24"
      title={
        <Row>
          <Col md={16}>My Roster</Col>
          <Col md={8}>
            <DateInput
              name="date"
              value
              onChange={(date) => setSelectedDate(date)}
              defaultValue={selectedDate}
              range={true}
            />
          </Col>
        </Row>
      }
    >
      <div className="myroster">
        {/* <div className="myroster_options">
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
        {employeeRostersLoading ? <Loader /> : null}
        <div className="table-responsive">
          <Table
            columns={columns}
            data={employeeRostersResult}
            rowKey="title"
          />
        </div>
      </div>
    </Card>
  );
};
