import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {Table} from 'react-bootstrap';
import SearchTableLayout from '../../components/SearchTableLayout';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';

export const ApplicationList = props => {
  const {
    orderByDisplay,
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

  const dropdownSortItems = [
    {eventKey: 'id', title: 'Application ID'},
    {eventKey: 'operator_name', title: 'Operator Name'},
    {eventKey: 'facility_name', title: 'Facility Name'},
    {eventKey: 'submission_date', title: 'Submission Date'},
    {eventKey: 'application_status', title: 'Status'}
  ];

  return (
    <>
      <SearchTableLayout
        orderByDisplay={orderByDisplay}
        searchDisplay={searchDisplay}
        handleEvent={handleEvent}
        dropdownSortItems={dropdownSortItems}
        direction={direction}
      />
      <br />
      <br />
      <Table striped bordered hover style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Operator Name</th>
            <th>Facility Name</th>
            <th>Submitted</th>
            <th>Status</th>
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
