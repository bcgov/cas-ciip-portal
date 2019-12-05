import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {Table, Container, Row, Col} from 'react-bootstrap';
import SortableTableHeader from 'components/SortableTableHeader';
import SearchBox from 'components/SearchBox';
import LoadingSpinner from '../../components/LoadingSpinner';
import Facility from './Facility';

export const OrganisationFacilitiesComponent = props => {
  const {
    organisationRowId,
    searchDisplay,
    direction,
    orderByField,
    searchField,
    searchValue,
    handleEvent
  } = props;
  const {edges} = props.query.searchOrganisationFacilities;
  console.log(organisationRowId);

  useEffect(() => {
    const refetchVariables = {
      organisationRowId,
      searchField,
      searchValue,
      orderByField,
      direction
    };
    props.relay.refetch(refetchVariables);
  });

  const tableHeaders = [
    {columnName: 'facility_name', displayName: 'Facility Name'},
    {columnName: 'address', displayName: 'Address'},
    {columnName: 'application_status', displayName: 'Status'}
  ];

  const dropdownSortItems = ['Facility Name', 'Address', 'Status'];

  const displayNameToColumnNameMap = {
    'Facility Name': 'facility_name',
    Address: 'address',
    Status: 'application_status'
  };

  const facilities = props.query.searchOrganisationFacilities;
  if (!facilities) return <LoadingSpinner />;

  return (
    <>
      {/* <CardDeck>
        {organisation.facilitiesByOrganisationId.edges.map(({node}) => {
          return <Facility key={node.id} facility={node} />;
        })}
      </CardDeck> */}
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
            <Facility key={edge.node.id} facility={edge.node} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default createRefetchContainer(
  OrganisationFacilitiesComponent,
  {
    query: graphql`
      fragment OrganisationFacilities_query on Query
        @argumentDefinitions(
          organisationRowId: {type: "String!"}
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
        ) {
        searchOrganisationFacilities(
          organisationRowId: $organisationRowId
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) {
          edges {
            node {
              id
              ...Facility_facility
            }
          }
        }
      }
    `
  },
  graphql`
    query OrganisationFacilitiesRefetchQuery(
      $organisationRowId: String!
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
    ) {
      query {
        ...OrganisationFacilities_query
          @arguments(
            organisationRowId: $organisationRowId
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
          )
      }
    }
  `
);
