import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';
import {ISearchOption} from 'components/Search/ISearchOption';
import {NumberSearchOption} from 'components/Search/NumberSearchOption';
import {NoHeaderSearchOption} from 'components/Search/NoHeaderSearchOption';
import {TextSearchOption} from 'components/Search/TextSearchOption';

export const ApplicationList = (props) => {
  const {handleEvent} = props;
  const {edges} = props.query.allApplications;

  const searchOptions: ISearchOption[] = [
    new NumberSearchOption('Application Id', 'id'),
    new TextSearchOption('Operator Name', 'operator_name'),
    new TextSearchOption('Facility Name', 'facility_name'),
    new NumberSearchOption('Reporting Year', 'reporting_year'),
    {
      title: 'Submission Date',
      columnName: 'submission_date',
      isSearchEnabled: false
    },
    new TextSearchOption('Status', 'status'),
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
