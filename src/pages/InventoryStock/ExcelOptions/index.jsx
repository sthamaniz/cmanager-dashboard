import { Button } from 'antd';
import * as XLSX from 'xlsx';
import * as Moment from 'moment';

import './styles.scss';

export default ({ loading, inventoryStockData }) => {
  const exportToExcel = () => {
    const rows = [];

    const heading = [
      'S No',
      'Item Number',
      'Title',
      'Quantity',
      'Type',
      'Date',
    ];
    rows.push(heading);

    inventoryStockData.forEach((isd, i) => {
      const data = [
        i + 1,
        isd.inventory.itemNumber,
        isd.inventory.title,
        isd.quantity,
        isd.type === 'IN' ? 'Entry' : 'Dispatch',
        Moment.unix(isd.createdAt / 1000).format('DD MMM, YYYY'),
      ];
      rows.push(data);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    worksheet['!cols'] = rows.length
      ? Object.keys(rows[1]).map((_) => ({ wch: 15 }))
      : [];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'InventoryStock',
    );

    XLSX.writeFile(workbook, 'InventoryStock.xlsx');
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
