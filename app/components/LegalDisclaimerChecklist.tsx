import React, {useState} from 'react';
import Checkbox from './Checkbox';

const consents = [
  'I give permission to use SWIM data to start a CIIP application.',
  'I understand that the company’s carbon tax calculation might not match how CAS does the calculation.',
  'I understand that it may delay if the information on CIIP application does not match SWIM.'
];

const noop = v => v;

const LegalDisclaimerChecklist = (props: {onChange?}) => {
  const {onChange = noop} = props;

  const [selected, setSelected] = useState([]);

  const displayConsentCheck = (consent, i) => {
    const handleCheck = () => {
      const idx = selected.indexOf(i);
      const newset =
        idx > -1
          ? selected.slice(0, idx).concat(selected.slice(idx + 1))
          : selected.concat(i);

      setSelected(newset);

      onChange(consents.length === newset.length);
    };

    return <Checkbox key={i} label={consent} onCheck={handleCheck} />;
  };

  return <>{consents.map(displayConsentCheck)}</>;
};

export default LegalDisclaimerChecklist;
