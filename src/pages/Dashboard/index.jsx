import {
  faClipboard,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Typography } from 'antd';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import './styles.scss';

export default ({}) => {
  const count = [
    {
      today: 'Todays Employee',
      title: '65',
      persent: '65%',
      icon: faUser,
      bnb: 'bnb2',
    },
    {
      today: 'Todays Customer',
      title: '200',
      persent: '2%',
      icon: faUsers,
      bnb: 'bnb2',
    },
    {
      today: 'Todays Booking',
      title: '100',
      persent: '15%',
      icon: faClipboard,
      bnb: 'bnb2',
    },
  ];

  const PERFORMANCE_DATA = [
    {
      name: 'Apr',
      value: 220,
    },
    {
      name: 'May',
      value: 280,
    },
    {
      name: 'Jun',
      value: 310,
    },
    {
      name: 'Jul',
      value: 220,
    },
    {
      name: 'Aug',
      value: 280,
    },
    {
      name: 'Sept',
      value: 180,
    },
    {
      name: 'Oct',
      value: 280,
    },
  ];

  const SALES_DATA = [
    {
      name: 'Apr',
      value: 220,
    },
    {
      name: 'May',
      value: 280,
    },
    {
      name: 'Jun',
      value: 310,
    },
    {
      name: 'Jul',
      value: 220,
    },
    {
      name: 'Aug',
      value: 280,
    },
    {
      name: 'Sept',
      value: 180,
    },
    {
      name: 'Oct',
      value: 280,
    },
  ];

  const TASK_DATA = [
    {
      name: 'Apr',
      value: 220,
    },
    {
      name: 'May',
      value: 280,
    },
    {
      name: 'Jun',
      value: 310,
    },
    {
      name: 'Jul',
      value: 220,
    },
    {
      name: 'Aug',
      value: 280,
    },
    {
      name: 'Sept',
      value: 180,
    },
    {
      name: 'Oct',
      value: 280,
    },
  ];

  const BEHAVIOUR_DATA = [
    {
      name: '6:00 AM',
      open: 10,
      click: 250,
    },
    {
      name: '9:00 AM',
      open: 150,
      click: 450,
    },
    {
      name: '12:00 PM',
      open: 300,
      click: 650,
    },
    {
      name: '3:00 PM',
      open: 500,
      click: 700,
    },
    {
      name: '6:00 PM',
      open: 550,
      click: 650,
    },
    {
      name: '9:00 PM',
      open: 650,
      click: 800,
    },
    {
      name: '12:00 AM',
      open: 700,
      click: 750,
    },
    {
      name: '3:00 AM',
      open: 650,
      click: 680,
    },
  ];

  return (
    <div className="layout-content dashboard">
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {count.map((c, index) => (
          <Col
            key={index}
            xs={24}
            sm={24}
            md={8}
            lg={8}
            xl={8}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>{c.today}</span>
                    <Typography.Title level={3}>
                      {c.title}{' '}
                      <small className={c.bnb}>{c.persent}</small>
                    </Typography.Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <FontAwesomeIcon icon={c.icon} fontSize={24} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[24, 24]}>
        <Col md={8}>
          <div className="dashboard_performance">
            <Card bordered={false} className="criclebox">
              <div className="dashboard_performance_chart">
                <ResponsiveContainer width="120%" height={200}>
                  <BarChart
                    width={500}
                    height={200}
                    data={PERFORMANCE_DATA}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={5}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Bar
                      type="monotone"
                      dataKey="value"
                      fill="#ffffff"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="dashboard_performance_title">
                Performance
              </div>
              <div className="dashboard_performance_subtitle">
                Total Orders
              </div>
            </Card>
          </div>
        </Col>
        <Col md={8}>
          <div className="dashboard_sales">
            <Card bordered={false} className="criclebox">
              <div className="dashboard_sales_chart">
                <ResponsiveContainer width="120%" height={200}>
                  <LineChart
                    width={500}
                    height={200}
                    data={SALES_DATA}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="dashboard_sales_title">Daily Sales</div>
              <div className="dashboard_sales_subtitle">
                Today Sales
              </div>
            </Card>
          </div>
        </Col>
        <Col md={8}>
          <div className="dashboard_task">
            <Card bordered={false} className="criclebox">
              <div className="dashboard_task_chart">
                <ResponsiveContainer width="120%" height={200}>
                  <LineChart
                    width={500}
                    height={200}
                    data={TASK_DATA}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="dashboard_task_title">
                Completed Task
              </div>
              <div className="dashboard_task_subtitle">
                Last Year Performance
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <div className="dashboard_behaviour">
            <Card
              bordered={false}
              className="criclebox"
              title="Users Behaviour"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  width={500}
                  height={300}
                  data={BEHAVIOUR_DATA}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    align="right"
                    verticalAlign="middle"
                    layout="vertical"
                    iconType="circle"
                    content={({ payload }) => (
                      <ul style={{ listStyle: 'none' }}>
                        {payload.map((entry, index) => (
                          <li key={`item-${index}`}>
                            <div
                              style={{
                                backgroundColor: '#eaeaea',
                                borderRadius: 6,
                                textAlign: 'center',
                                padding: '10px 20px',
                                marginBottom: 15,
                              }}
                            >
                              <div
                                style={{
                                  height: 15,
                                  width: 15,
                                  borderRadius: 10,
                                  backgroundColor: entry.color,
                                  margin: '0px auto',
                                }}
                              />
                              <div style={{ fontSize: 18 }}>
                                {entry.value}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="open"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="click"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};
