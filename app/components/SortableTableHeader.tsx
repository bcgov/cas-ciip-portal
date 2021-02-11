import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faSort,
  faCaretUp,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from 'next/router';

interface Props {
  headerVariables: {
    columnName: string;
    displayName: string;
  };
}

const SORT_DIRECTION = ['ASC', 'DESC'];
const SORT_ICONS = [faCaretDown, faCaretUp];

const SortableTableHeader: React.FunctionComponent<Props> = ({
  headerVariables
}) => {
  const router = useRouter();
  const sortDirectionIndex = SORT_DIRECTION.indexOf(
    router.query.direction?.toString()
  );
  const [currentSortDirection, setCurrentSortDirection] = useState(
    Math.max(sortDirectionIndex, 0)
  );

  const getOrderbyString = (columnName, sortDirection) => {
    return columnName.toUpperCase() + '_' + SORT_DIRECTION[sortDirection];
  };

  const triggerSort = (columnName) => {
    //Cycle
    const sortDirection = (currentSortDirection + 1) % 2;
    setCurrentSortDirection(sortDirection);

    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        order_by: getOrderbyString(columnName, sortDirection)
      }
    };

    router.replace(url, url, {shallow: true});
  };

  const {columnName, displayName} = headerVariables;
  return (
    <th onClick={() => triggerSort(columnName)}>
      <span>{displayName}</span>
      <span style={{height: '100%', position: 'absolute', right: '0.75em'}}>
        {displayName && (
          <FontAwesomeIcon
            color="white"
            icon={
              router.query.order_by ===
              getOrderbyString(columnName, currentSortDirection)
                ? SORT_ICONS[currentSortDirection]
                : faSort
            }
          />
        )}
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
