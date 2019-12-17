import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';

export const ApplicationList = props => {
  const {
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

  const displayNameToColumnNameMap = {
    'Application Id': 'id',
    'Operator Name': 'operator_name',
    'Facility Name': 'facility_name',
    'Reporting Year': 'reporting_year',
    'Submission Date': 'submission_date',
    Status: 'application_status'
  };
  const body = (
    <tbody>
      {edges.map(edge => (
        <ApplicationRowItemContainer
          key={edge.node.rowId}
          ciipApplication={edge.node}
        />
      ))}
    </tbody>
  );

  return (
    <SearchTableLayout
      body={body}
      displayNameToColumnNameMap={displayNameToColumnNameMap}
      handleEvent={handleEvent}
    />
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
              rowId
              ...ApplicationRowItemContainer_applicationSearchResult
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
