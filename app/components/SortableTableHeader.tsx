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
    <th onClick={() => sort('sortColumn', columnName)}>
      <span>{displayName}</span>
      <span style={{height: '100%', position: 'absolute', right: '0.75em'}}>
        {displayName && <FontAwesomeIcon color="white" icon={faSort} />}
      </span>
      <style>{`
        .table thead th {
          background: #003366;
          color: white;
          position: relative;
          padding-right: calc(1em + 10px);
          cursor: pointer;
        }
      `}</style>
    </th>
  );
};

export default SortableTableHeader;
