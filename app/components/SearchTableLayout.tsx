import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import SortableTableHeader from 'components/SortableTableHeader';
import SearchBox from 'components/SearchBox';
interface Props {
  handleEvent: (...args: any[]) => void;
  displayNameToColumnNameMap: any;
  body: any;
}
export const SearchTableLayoutComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {handleEvent, displayNameToColumnNameMap, body} = props;

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
        <th />
        {body}
      </Table>
    </>
  );
};

export default SearchTableLayoutComponent;
