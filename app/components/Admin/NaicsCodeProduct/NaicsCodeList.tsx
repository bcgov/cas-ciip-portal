import React, {useState} from 'react';
import {ListGroup} from 'react-bootstrap';

interface Props {
  naicsCodes: string[];
  selectionChanged: (naics: string) => void;
}

export const NaicsCodeList: React.FunctionComponent<Props> = ({
  naicsCodes,
  selectionChanged
}) => {
  const [activeNaics, setActiveNaics] = useState('');

  const onClick = (naics: string) => {
    setActiveNaics(naics);
    selectionChanged(naics);
  };

  return (
    <ListGroup variant="flush">
      {naicsCodes.map((code) => (
        <ListGroup.Item
          onClick={() => onClick(code)}
          active={activeNaics === code}
        >
          {code}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
