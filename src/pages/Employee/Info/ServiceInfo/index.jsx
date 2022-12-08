import { useState } from 'react';

import BasicInfo from './BasicInfo';
import ServiceInfo from './ServiceInfo';

import './styles.scss';

export default ({}) => {
  const [selectedOption, setSelectedoption] = useState(1);

  return (
    <div className="serviceinfo">
      <div className="serviceinfo_options">
        <div
          className={`serviceinfo_options_single ${
            selectedOption == 1 ? 'active' : ''
          }`}
          onClick={() => setSelectedoption(1)}
        >
          Basic Information
        </div>
        <div
          className={`serviceinfo_options_single ${
            selectedOption == 2 ? 'active' : ''
          }`}
          onClick={() => setSelectedoption(2)}
        >
          Service Information
        </div>
      </div>
      <div className="serviceinfo_card">
        {selectedOption == 1 ? <BasicInfo /> : null}
        {selectedOption == 2 ? <ServiceInfo /> : null}
      </div>
    </div>
  );
};
