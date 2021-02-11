import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';
import {
  SearchOption,
  SearchOptionType,
  NoHeaderSearchOption
} from 'components/Interfaces/SearchProps';

export const ApplicationList = (props) => {
  const {handleEvent} = props;
  const {edges} = props.query.allApplications;

  const searchOptions: SearchOption[] = [
    {
      displayName: 'Application Id',
      columnName: 'id',
      isSearchEnabled: false,
      searchOptionType: SearchOptionType.Freeform
    },
    {
      displayName: 'Operator Name',
      columnName: 'operator_name',
      isSearchEnabled: true,
      searchOptionType: SearchOptionType.Freeform
    },
    {
      displayName: 'Facility Name',
      columnName: 'facility_name',
      isSearchEnabled: true,
      searchOptionType: SearchOptionType.Freeform
    },
    {
      displayName: 'Reporting Year',
      columnName: 'reporting_year',
      isSearchEnabled: true,
      searchOptionType: SearchOptionType.Freeform
    },
    {
      displayName: 'Submission Date',
      columnName: 'submission_date',
      isSearchEnabled: true,
      searchOptionType: SearchOptionType.Freeform
    },
    {
      displayName: 'Status',
      columnName: 'status',
      isSearchEnabled: true,
      searchOptionType: SearchOptionType.Freeform
    },
    NoHeaderSearchOption
  ];

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
      searchOptions={searchOptions}
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
      id: {type: "Int"}
      operator_name: {type: "String"}
      facility_name: {type: "String"}
      reporting_year: {type: "Int"}
      submission_date: {type: "Datetime"}
      status: {type: "String"}
      order_by: {type: "[ApplicationsOrderBy!]"}
    ) {
      allApplications(
        filter: {
          rowId: {equalTo: $id}
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
