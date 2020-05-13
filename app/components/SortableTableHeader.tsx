import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';

interface Props {
  sort: (action: string, columnName: string) => void;
  headerVariables: {
    columnName: string;
    displayName: string;
  };
}

const SortableTableHeader: React.FunctionComponent<Props> = ({
  sort,
  headerVariables
}) => {
  const {columnName, displayName} = headerVariables;
  return (
    <th
      style={{background: '#003366', color: 'white'}}
      onClick={() => sort('sortColumn', columnName)}
    >
      {displayName}
      <br />
      <FontAwesomeIcon color="white" icon={faSort} />
    </th>
  );
};

export default SortableTableHeader;
