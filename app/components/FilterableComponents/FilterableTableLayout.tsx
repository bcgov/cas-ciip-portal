import React from 'react';
import {Col, Table, Alert} from 'react-bootstrap';
import SortableTableHeader from './SortableTableHeader';
import FilterableTableHeaders from './FilterableTableHeaders';
import {ISearchProps} from 'components/Search/SearchProps';

interface Props extends ISearchProps {
  handleEvent: (
    action: string,
    value?: string | number,
    column?: string
  ) => any;
  handleSelectAll?: (...args: any[]) => void;
  allSelected?: boolean;
  body: JSX.Element;
  isLoading?: boolean;
  extraControls?: JSX.Element;
}
export const SearchTableLayoutComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {
    handleSelectAll,
    allSelected = false,
    searchOptions,
    body,
    isLoading
  } = props;

  const noSearchResults =
    body.props.children.length === 0 ||
    body?.props?.children[0]?.length === 0 ? (
      <Alert variant="secondary" id="no-search-results">
        No matching results to show.
      </Alert>
    ) : null;

  return (
    <>
      <Table
        striped
        bordered
        hover
        className={isLoading ? 'search-table loading' : 'search-table'}
      >
        <thead>
          <tr>
            {handleSelectAll && (
              <th className="master-select">
                <label>
                  Select All
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </label>
              </th>
            )}
            {searchOptions.map((option) => (
              <SortableTableHeader
                key={option.title + '-sortHeader'}
                headerVariables={{
                  columnName: option.columnName,
                  displayName: option.title,
                  sortable: option.isSortEnabled
                }}
              />
            ))}
          </tr>
          <FilterableTableHeaders searchOptions={searchOptions} />
        </thead>
        {body}
      </Table>
      <Col md={{span: 6, offset: 3}}>{noSearchResults}</Col>
      <style jsx global>{`
        .search-table {
          text-align: center;
        }
        .master-select {
          background: #003366;
          color: white;
          min-width: 6em;
          position: relative;
        }
        .master-select label {
          margin-bottom: 0;
          padding-right: 24px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .master-select input[type='checkbox'] {
          position: absolute;
          right: 10px;
          top: calc(50% - 6px);
        }
        .search-table.loading td {
          opacity: 0;
          pointer-events: none;
        }

        .search-table.loading tbody {
          position: relative;
        }
        .search-table.loading tbody::after {
          width: 2rem;
          height: 2rem;
          vertical-align: text-bottom;
          background-color: black;
          border-radius: 50%;
          opacity: 0;
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          animation: spinner-grow 0.75s linear infinite;
        }
        #no-search-results {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default SearchTableLayoutComponent;