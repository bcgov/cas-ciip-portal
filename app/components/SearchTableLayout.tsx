import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import SortableTableHeader from 'components/SortableTableHeader';
import SearchBox from 'components/SearchBox';
interface Props {
  handleEvent: (...args: any[]) => void;
  handleSelectAll?: (...args: any[]) => void;
  allSelected?: boolean;
  displayNameToColumnNameMap: any;
  body: any;
}
export const SearchTableLayoutComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {
    handleEvent,
    handleSelectAll,
    allSelected = false,
    displayNameToColumnNameMap,
    body
  } = props;

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

      <Table striped bordered hover style={{textAlign: 'center'}}>
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
        <style jsx>{`
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
        `}</style>
      </Table>
    </>
  );
};

export default SearchTableLayoutComponent;
