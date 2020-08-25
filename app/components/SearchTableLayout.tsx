import React from 'react';
import {Container, Row, Col, Table, Alert} from 'react-bootstrap';
import SortableTableHeader from 'components/SortableTableHeader';
import SearchBox from 'components/SearchBox';
interface Props {
  handleEvent: (action: string, value?: string, column?: string) => any;
  handleSelectAll?: (...args: any[]) => void;
  allSelected?: boolean;
  displayNameToColumnNameMap: any;
  body: JSX.Element;
  isLoading?: boolean;
}
export const SearchTableLayoutComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {
    handleEvent,
    handleSelectAll,
    allSelected = false,
    displayNameToColumnNameMap,
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
      <Container>
        <Row>
          <Col md={{span: 12}} className="no-pad">
            <SearchBox
              dropdownSortItems={Object.keys(displayNameToColumnNameMap)}
              handleEvent={handleEvent}
              displayNameToColumnNameMap={displayNameToColumnNameMap}
            />
          </Col>
        </Row>
      </Container>

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
                  <br />
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </label>
              </th>
            )}
            {Object.keys(displayNameToColumnNameMap).map((key) => (
              <SortableTableHeader
                key={key}
                sort={handleEvent}
                headerVariables={{
                  columnName: displayNameToColumnNameMap[key],
                  displayName: key
                }}
              />
            ))}
          </tr>
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
