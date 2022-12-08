import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './styles.scss';

export default ({}) => {
  return (
    <div className="loader">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      />
    </div>
  );
};
