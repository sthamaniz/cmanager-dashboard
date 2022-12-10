import { Button } from 'antd';
import * as XLSX from 'xlsx';
import * as Moment from 'moment';

import './styles.scss';

export default ({ loading, rosterData, userData }) => {
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
      return '';
    }
  };

  const exportToExcel = () => {
    const rows = [];
    rosterData.forEach((rd) => {
      rows.push([Moment(rd.date).format('DD MMM, YYYY')]);

      const heading = [
        'S No',
        'Customer',
        'Address',
        'Service',
        'Total',
      ];
      userData.forEach((ud) =>
        heading.push(`${ud.firstName} ${ud.lastName}`),
      );
      rows.push(heading);

      rd.rosters.forEach((r, i) => {
        const data = [
          i + 1,
          `${r.booking.customer.firstName} ${r.booking.customer.lastName}`,
          r.booking.customer.address,
          r.booking.service.title,
          r.booking.customer.hours,
        ];
        userData.forEach((ud) =>
          data.push(
            getEmployeeTime(
              r.booking.customer.hours,
              r.booking.assignedEmployees,
              ud._id,
            ),
          ),
        );
        rows.push(data);
      });

      rows.push([]);
      rows.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    worksheet['!cols'] = rows.length
      ? Object.keys(rows[1]).map((_) => ({ wch: 15 }))
      : [];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rosters');

    XLSX.writeFile(workbook, 'Rosters.xlsx');
  };

  return (
    <Button
      type="primary"
      onClick={exportToExcel}
      loading={loading}
      disabled={loading}
      block
    >
      Export
    </Button>
  );
};
