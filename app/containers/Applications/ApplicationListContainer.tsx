import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import FilterableTableLayout from 'components/FilterableTable/FilterableTable';
import ApplicationRowItemContainer from './ApplicationRowItemContainer';
import {
  TableFilter,
  NumberFilter,
  NoHeaderFilter,
  TextFilter,
  SortOnlyFilter,
  EnumFilter
} from 'components/FilterableTable/Filters';
import {CiipApplicationRevisionStatus} from 'createApplicationRevisionStatusMutation.graphql';
import {ApplicationListContainer_query} from 'ApplicationListContainer_query.graphql';

interface Props {
  query: ApplicationListContainer_query;
}

const filters: TableFilter[] = [
  new NumberFilter('Application Id', 'id'),
  new TextFilter('Operator Name', 'operator_name'),
  new TextFilter('Facility Name', 'facility_name'),
  new NumberFilter('Reporting Year', 'reporting_year'),
  new SortOnlyFilter('Submission Date', 'submission_date'),
  new EnumFilter<CiipApplicationRevisionStatus>('Status', 'status', [
    'APPROVED',
    'REJECTED',
    'REQUESTED_CHANGES',
    'SUBMITTED'
  ]),
  new NoHeaderFilter()
];

export const ApplicationList: React.FunctionComponent<Props> = (props) => {
  const {edges, totalCount} = props.query.allApplications;

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
    <FilterableTableLayout
      body={body}
      filters={filters}
      totalCount={totalCount}
      paginated
    />
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
      pageSize: {type: "Int"}
      offset: {type: "Int"}
    ) {
      allApplications(
        first: $pageSize
        offset: $offset
        filter: {
          rowId: {equalTo: $id}
          operatorName: {includesInsensitive: $operator_name}
          facilityName: {includesInsensitive: $facility_name}
          reportingYear: {equalTo: $reporting_year}
          submissionDate: {equalTo: $submission_date}
          latestSubmittedRevisionStatus: {equalTo: $status, isNull: false}
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
