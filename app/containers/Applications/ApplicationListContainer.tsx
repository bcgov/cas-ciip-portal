import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';

export const ApplicationList = (props) => {
  const {handleEvent} = props;
  const {edges} = props.query.searchApplicationList;

  const displayNameToColumnNameMap = {
    'Application Id': 'application_id',
    'Operator Name': 'operator_name',
    'Facility Name': 'facility_name',
    'Reporting Year': 'reporting_year',
    'Submission Date': 'submission_date',
    Status: 'application_revision_status',
    '': null
  };
  const body = (
    <tbody>
      {edges.map((edge) => (
        <ApplicationRowItemContainer
          key={edge.node.rowId}
          applicationSearchResult={edge.node}
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
export default createFragmentContainer(ApplicationList, {
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
});
