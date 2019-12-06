import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {Table, Container, Row, Col} from 'react-bootstrap';
import SortableTableHeader from 'components/SortableTableHeader';
import SearchBox from 'components/SearchBox';
import FacilitiesRowItemContainer from './FacilitiesRowItemContainer';

export const FacilitiesList = props => {
  const {
    searchDisplay,
    direction,
    orderByField,
    searchField,
    searchValue,
    handleEvent
  } = props;
  const {edges} = props.query.searchAllFacilities;

  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction
    };
    props.relay.refetch(refetchVariables);
  });

  const tableHeaders = [
    {columnName: 'facility_name', displayName: 'Facility Name'},
    {columnName: 'mailing_address', displayName: 'Address'},
    {columnName: 'facility_postal_code', displayName: 'Postal Code'},
    {columnName: 'facility_city', displayName: 'City'},
    {columnName: 'facility_province', displayName: 'Province'},
    {columnName: 'application_status', displayName: 'Status'}
  ];

  const dropdownSortItems = [
    'Facility Name',
    'Address',
    'Postal Code',
    'City',
    'Province',
    'Status'
  ];

  const displayNameToColumnNameMap = {
    'Facility Name': 'facility_name',
    Address: 'address',
    'Postal Code': 'facility_postal_code',
    City: 'facility_city',
    Province: 'facility_province',
    Status: 'application_status'
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={{span: 12, offset: 6}}>
            <SearchBox
              dropdownSortItems={dropdownSortItems}
              handleEvent={handleEvent}
              displayNameToColumnNameMap={displayNameToColumnNameMap}
              searchDisplay={searchDisplay}
            />
          </Col>
        </Row>
      </Container>

      <Table striped bordered hover style={{textAlign: 'center'}}>
        <thead>
          <tr>
            {tableHeaders.map(header => (
              <SortableTableHeader
                key={header.columnName}
                sort={handleEvent}
                headerVariables={header}
              />
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {edges.map(edge => (
            <FacilitiesRowItemContainer
              key={edge.node.id}
              facility={edge.node}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default createRefetchContainer(
  FacilitiesList,
  {
    query: graphql`
      fragment FacilitiesListContainer_query on Query
        @argumentDefinitions(
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
        ) {
        searchAllFacilities(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) {
          edges {
            node {
              id
              ...FacilitiesRowItemContainer_facility
            }
          }
        }
      }
    `
  },
  graphql`
    query FacilitiesListContainerRefetchQuery(
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
          )
      }
    }
  `
);
