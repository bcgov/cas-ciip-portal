import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import FilterableTableLayout from 'components/FilterableComponents/FilterableTableLayout';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';
import {ISearchOption} from 'components/Search/ISearchOption';
import {NumberSearchOption} from 'components/Search/NumberSearchOption';
import {NoHeaderSearchOption} from 'components/Search/NoHeaderSearchOption';
import {TextSearchOption} from 'components/Search/TextSearchOption';
import {SortOnlyOption} from 'components/Search/SortOnlyOption';
import {EnumSearchOption} from 'components/Search/EnumSearchOption';
import {CiipApplicationRevisionStatus} from 'createApplicationRevisionStatusMutation.graphql';
import {ApplicationListContainer_query} from 'ApplicationListContainer_query.graphql';
import FilterableTablePagination from 'components/FilterableComponents/FilterableTablePagination';

interface Props {
  query: ApplicationListContainer_query;
}

export const ApplicationList: React.FunctionComponent<Props> = (props) => {
  const {edges, totalCount} = props.query.allApplications;

  const searchOptions: ISearchOption[] = [
    new NumberSearchOption('Application Id', 'id'),
    new TextSearchOption('Operator Name', 'operator_name'),
    new TextSearchOption('Facility Name', 'facility_name'),
    new NumberSearchOption('Reporting Year', 'reporting_year'),
    new SortOnlyOption('Submission Date', 'submission_date'),
    new EnumSearchOption<CiipApplicationRevisionStatus>('Status', 'status', [
      'APPROVED',
      'REJECTED',
      'REQUESTED_CHANGES',
      'SUBMITTED'
    ]),
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
    <>
      <FilterableTableLayout body={body} searchOptions={searchOptions} />
      <FilterableTablePagination totalCount={totalCount} />
    </>
  );
};

export default createFragmentContainer(ApplicationList, {
  query: graphql`
    fragment ApplicationListContainer_query on Query
    @argumentDefinitions(
      id: {type: "Int"}
      operator_name: {type: "String"}
      facility_name: {type: "String"}
      reporting_year: {type: "Int"}
      submission_date: {type: "Datetime"}
      status: {type: "CiipApplicationRevisionStatus"}
      order_by: {type: "[ApplicationsOrderBy!]"}
      max_results: {type: "Int"}
      offset: {type: "Int"}
    ) {
      allApplications(
        first: $max_results
        offset: $offset
        filter: {
          rowId: {equalTo: $id}
          operatorName: {includesInsensitive: $operator_name}
          facilityName: {includesInsensitive: $facility_name}
          reportingYear: {equalTo: $reporting_year}
          submissionDate: {equalTo: $submission_date}
          status: {notEqualTo: DRAFT, equalTo: $status}
        }
        orderBy: $order_by
      ) {
        edges {
          node {
            rowId
            ...ApplicationRowItemContainer_application
          }
        }
        totalCount
      }
    }
  `
});
