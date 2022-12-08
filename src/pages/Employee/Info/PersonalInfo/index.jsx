import { useState } from 'react';

import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';

import './styles.scss';

export default ({}) => {
  const [selectedOption, setSelectedoption] = useState(1);

  return (
    <div className="personalinfo">
      <div className="personalinfo_options">
        <div
          className={`personalinfo_options_single ${
            selectedOption == 1 ? 'active' : ''
          }`}
          onClick={() => setSelectedoption(1)}
        >
          Personal Detail
        </div>
        <div
          className={`personalinfo_options_single ${
            selectedOption == 2 ? 'active' : ''
          }`}
          onClick={() => setSelectedoption(2)}
        >
          Contact & Address
        </div>
      </div>
      <div className="personalinfo_card">
        {selectedOption == 1 ? <PersonalDetails /> : null}
        {selectedOption == 2 ? <ContactDetails /> : null}
      </div>
    </div>
  );
};
