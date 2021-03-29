import React, {useState} from 'react';
import {ListGroup} from 'react-bootstrap';

interface Props {
  naicsCodes: {
    [code: string]: string;
  };
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
      {Object.entries(naicsCodes).map(([code, description]) => (
        <ListGroup.Item
          key={code}
          onClick={() => onClick(code)}
          active={activeNaics === code}
        >
          <b>{code}</b>
          <br />
          <small>{description}</small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
