import React from 'react';

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
  return <th onClick={() => sort('sortColumn', columnName)}>{displayName}</th>;
};

export default SortableTableHeader;
