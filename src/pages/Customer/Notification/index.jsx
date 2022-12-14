import { Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faClock,
  faMobile,
  faMarker,
  faBook,
  faRotate,
  faGear,
  faUsers,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';

import './styles.scss';

export default ({ selectedCustomer, setSelectedCustomer }) => {
  if (!selectedCustomer || !selectedCustomer._id) {
    return <></>;
  }

  const booking = selectedCustomer.booking;
  const customer = booking.customer;
  const service = booking.service;

  return (
    <Drawer
      title="Details"
      placement="right"
      onClose={() => setSelectedCustomer({})}
      open={selectedCustomer && selectedCustomer._id}
      getContainer={false}
      visible={selectedCustomer && selectedCustomer._id}
    >
      <div className="detail">
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Customer</div>
            <div className="detail_single_info_value">{`${customer.firstName} ${customer.lastName}`}</div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faMobile} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">
              Contact Number
            </div>
            <div className="detail_single_info_value">
              {customer.mobile}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faMarker} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Address</div>
            <div className="detail_single_info_value">
              {customer.address}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Start Date</div>
            <div className="detail_single_info_value">
              {Moment(booking.startDate).format('DD MMM, YYYY')}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faBook} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Source</div>
            <div className="detail_single_info_value">
              {customer.source.replace('_', ' ')}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faGear} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Service</div>
            <div className="detail_single_info_value">
              {service.title}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faRotate} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Frequency</div>
            <div className="detail_single_info_value">
              {booking.frequency.replace('_', ' ')}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Date</div>
            <div className="detail_single_info_value">
              {Moment(selectedCustomer.date).format('DD MMM, YYYY')}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">
              Arrival Time
            </div>
            <div className="detail_single_info_value">
              {booking.arrivalTime}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Employee</div>
            <div className="detail_single_info_value">
              {booking.assignedEmployees
                .map(
                  (ae) =>
                    `${ae.employee.firstName} ${ae.employee.lastName}`,
                )
                .join(', ')}
            </div>
          </div>
        </div>
        <div className="detail_single">
          <div className="detail_single_icon">
            <FontAwesomeIcon icon={faBook} />
          </div>
          <div className="detail_single_info">
            <div className="detail_single_info_title">Notes</div>
            <div className="detail_single_info_value">
              {booking.note}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
