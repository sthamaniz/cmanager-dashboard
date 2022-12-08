import { Table } from 'antd';

import './styles.scss';

export default ({ columns, data, rowKey }) => {
  return (
    <div className="table">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        pagination={false}
        className="ant-border-space"
      />
    </div>
  );
};
