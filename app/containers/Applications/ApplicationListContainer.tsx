import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {Table, Container, Row, Col} from 'react-bootstrap';
import SortableTableHeader from 'components/SortableTableHeader';
import SearchBox from 'components/SearchBox';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';

export const ApplicationList = props => {
  const {
    searchDisplay,
    direction,
    orderByField,
    searchField,
    searchValue,
    handleEvent
  } = props;
  const {edges} = props.query.searchApplicationList;

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
    {columnName: 'id', displayName: 'Application ID'},
    {columnName: 'operator_name', displayName: 'Operator Name'},
    {columnName: 'facility_name', displayName: 'Facility Name'},
    {columnName: 'reporting_year', displayName: 'Reporting Year'},
    {columnName: 'submission_date', displayName: 'Submission Date'},
    {columnName: 'application_status', displayName: 'Status'}
  ];

  const dropdownSortItems = [
    'Application Id',
    'Operator Name',
    'Facility Name',
    'Reporting Year',
    'Submission Date',
    'Status'
  ];

  const displayNameToColumnNameMap = {
    'Application Id': 'id',
    'Operator Name': 'operator_name',
    'Facility Name': 'facility_name',
    'Reporting Year': 'reporting_year',
    'Submission Date': 'submission_date',
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
            <ApplicationRowItemContainer
              key={edge.node.id}
              ciipApplication={edge.node}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

// TODO(wenzowski): each search result node needs an ID both for react dom diffing as list key
// and also for relay to refetch
// @see https://facebook.github.io/relay/graphql/objectidentification.htm#sec-Node-Interface
// TODO: Several entitites do not have graphql ID's because they are views
export default createRefetchContainer(
  ApplicationList,
  {
    query: graphql`
      fragment ApplicationListContainer_query on Query
        @argumentDefinitions(
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
        ) {
        searchApplicationList(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) {
          edges {
            node {
              id
              ...ApplicationRowItemContainer_ciipApplication
            }
          }
        }
      }
    `
  },
  graphql`
    query ApplicationListContainerRefetchQuery(
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
    ) {
      query {
        ...ApplicationListContainer_query
          @arguments(
            searchField: $searchField
            searchValue: $searchValue
            orderByField: $orderByField
            direction: $direction
          )
      }
    }
  `
);
