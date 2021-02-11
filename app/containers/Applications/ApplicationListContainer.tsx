import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';

export const ApplicationList = (props) => {
  const {handleEvent} = props;
  const {edges} = props.query.allApplications;

  const displayNameToColumnNameMap = {
    'Application Id': 'id',
    'Operator Name': 'operator_name',
    'Facility Name': 'facility_name',
    'Reporting Year': 'reporting_year',
    'Submission Date': 'submission_date',
    Status: 'status',
    '': null
  };
  const body = (
    <tbody>
      {edges.map((edge) => (
        <ApplicationRowItemContainer
          key={edge.node.rowId}
          application={edge.node}
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
      row_id: {type: "Int"}
      operator_name: {type: "String"}
      facility_name: {type: "String"}
      reporting_year: {type: "Int"}
      submission_date: {type: "Datetime"}
      status: {type: "String"}
      order_by: {type: "[ApplicationsOrderBy!]"}
    ) {
      allApplications(
        filter: {
          rowId: {equalTo: $row_id}
          operatorName: {includesInsensitive: $operator_name}
          facilityName: {includesInsensitive: $facility_name}
          reportingYear: {equalTo: $reporting_year}
          submissionDate: {equalTo: $submission_date}
          status: {includesInsensitive: $status}
        }
        orderBy: $order_by
      ) {
        edges {
          node {
            rowId
            ...ApplicationRowItemContainer_application
          }
        }
      }
    }
  `
});
