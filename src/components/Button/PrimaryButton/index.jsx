import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './styles.scss';

export default ({ title, link, onClick, loading, disabled }) => {
  return (
    <div className="primarybutton">
      {link ? (
        <Link to={link}>
          <Button type="primary" block>
            {title}
          </Button>
        </Link>
      ) : (
        <Button
          type="primary"
          onClick={onClick}
          loading={loading}
          disabled={disabled}
          block
        >
          {title}
        </Button>
      )}
    </div>
  );
};
