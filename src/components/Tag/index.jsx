import { Tag } from 'antd';

import './styles.scss';

export default ({ title, checked, onClick }) => {
  return (
    <div className={`tag ${checked ? 'checked' : ''}`}>
      <Tag onClick={onClick}>{title}</Tag>
    </div>
  );
};
