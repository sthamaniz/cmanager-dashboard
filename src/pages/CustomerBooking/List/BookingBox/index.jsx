import { Card, Row, Col, Tag, Steps } from 'antd';
import Moment from 'moment';
import {
  InfoCircleOutlined,
  ClockCircleOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';

import './styles.scss';

export default ({
  statusOptions,
  id,
  name,
  service,
  startDate,
  frequency,
  status,
}) => {
  return (
    <Card>
      <div className="bookingbox">
        <Row justify="space-between">
          <Col>ORDER-{id}</Col>
          <Col>
            <div className="bookingbox_status">
              <Tag
                color={
                  statusOptions.find((so) => so.key === status)[
                    'color'
                  ] || null
                }
                style={{ fontSize: 14 }}
              >
                {status.replace('_', ' ').toLowerCase()}
              </Tag>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 40 }}>
          <Col span={4}></Col>
          <Col span={10}>
            <div className="bookingbox_detail">
              <Row>
                <Col>
                  <InfoCircleOutlined className="bookingbox_detail_icon" />
                </Col>
                <Col>
                  <div className="bookingbox_detail_info">
                    <div className="bookingbox_detail_info_title">
                      Order Handed By
                    </div>
                    <div className="bookingbox_detail_info_description">
                      {name}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="bookingbox_detail">
              <Row>
                <Col>
                  <ClockCircleOutlined className="bookingbox_detail_icon" />
                </Col>
                <Col>
                  <div className="bookingbox_detail_info">
                    <div className="bookingbox_detail_info_title">
                      Start Date
                    </div>
                    <div className="bookingbox_detail_info_description">
                      {Moment(startDate).format('DD MMM, YYYY')}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={10}>
            <div className="bookingbox_detail">
              <Row>
                <Col>
                  <SnippetsOutlined className="bookingbox_detail_icon" />
                </Col>
                <Col>
                  <div className="bookingbox_detail_info">
                    <div className="bookingbox_detail_info_title">
                      Service
                    </div>
                    <div className="bookingbox_detail_info_description">
                      {service.toLowerCase()}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="bookingbox_detail">
              <Row>
                <Col>
                  <ClockCircleOutlined className="bookingbox_detail_icon" />
                </Col>
                <Col>
                  <div className="bookingbox_detail_info">
                    <div className="bookingbox_detail_info_title">
                      Frequency
                    </div>
                    <div className="bookingbox_detail_info_description">
                      {frequency.toLowerCase()}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            <div className="bookingbox_status">
              <Steps
                direction="horizontal"
                labelPlacement="vertical"
                current={
                  statusOptions.find((so) => so.key === status)[
                    'step'
                  ] || null
                }
              >
                {statusOptions.map((s) => (
                  <Steps.Step key={`${s.key}`} title={s.title} />
                ))}
              </Steps>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};
