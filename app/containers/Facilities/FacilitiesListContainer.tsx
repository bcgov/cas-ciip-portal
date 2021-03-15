import React, {useState} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {FacilitiesListContainer_query} from 'FacilitiesListContainer_query.graphql';
import FacilitiesRowItemContainer from './FacilitiesRowItemContainer';
import {
  TableFilter,
  TextFilter,
  NumberFilter,
  ApplicationStatusFilter,
  NoHeaderFilter,
  ReportingPeriodFilter
} from 'components/FilterableTable/Filters';
import FilterableTableLayout from 'components/FilterableTable/FilterableTable';
import {useRouter} from 'next/router';
import safeJsonParse from 'lib/safeJsonParse';

interface Props {
  query: FacilitiesListContainer_query;
}

const filters: TableFilter[] = [
  new TextFilter('Operator Name', 'operatorName', {sortable: false}),
  new TextFilter('Facility Name', 'facilityName', {sortable: false}),
  new TextFilter('Facility Type', 'facilityType', {sortable: false}),
  new TextFilter('BC GHG id', 'facilityBcghgid', {sortable: false}),
  new NumberFilter(
    'Reporting period of last SWRS report',
    'lastSwrsReportingYear',
    {sortable: false}
  ),
  new ApplicationStatusFilter(
    'Application Status',
    'applicationStatus',
    'applicationIdIsNull'
  ),
  new NumberFilter('Application #', 'applicationId', {sortable: false}),
  NoHeaderFilter
];

export const FacilitiesList: React.FunctionComponent<Props> = ({query}) => {
  const {
    facilityApplicationByReportingYear: {edges, totalCount},
    allReportingYears: {edges: reportingYears}
  } = query;

  const router = useRouter();
  const [selectedReportingYear] = useState(
    () => safeJsonParse(router.query.relayVars as string).reportingYear || 2019
  );

  const body = (
    <tbody>
      {edges.map((edge) => (
        <FacilitiesRowItemContainer
          key={`${edge.node.facilityId}-${selectedReportingYear}`}
          facilityApplication={edge.node}
          reportingYear={selectedReportingYear}
          query={query}
        />
      ))}
    </tbody>
  );

  const selectableReportingYears = [];
  reportingYears.forEach(({node}) => {
    if (node.reportingYear < new Date().getFullYear())
      selectableReportingYears.push(node.reportingYear);
  });

  const reportingPeriodFilter = new ReportingPeriodFilter(
    'reportingYear',
    selectableReportingYears,
    2019
  );

  return (
    <>
      <FilterableTableLayout
        paginated
        body={body}
        filters={filters}
        extraFilters={[reportingPeriodFilter]}
        totalCount={totalCount}
      />
      If you cannot find your facility in the list, please{' '}
      <a href="mailto:ghgregulator@gov.bc.ca">contact CAS</a> for assistance.
    </>
  );
};

export default createFragmentContainer(FacilitiesList, {
  query: graphql`
    fragment FacilitiesListContainer_query on Query
    @argumentDefinitions(
      operatorName: {type: "String"}
      facilityName: {type: "String"}
      applicationIdIsNull: {type: "Boolean"}
      applicationId: {type: "Int"}
      facilityBcghgid: {type: "String"}
      lastSwrsReportingYear: {type: "Int"}
      applicationStatus: {type: "CiipApplicationRevisionStatus"}
      organisationRowId: {type: "Int"}
      offsetValue: {type: "Int"}
      reportingYear: {type: "Int"}
      max_results: {type: "Int"}
      offset: {type: "Int"}
    ) {
      ...FacilitiesRowItemContainer_query
      facilityApplicationByReportingYear(
        first: $max_results
        offset: $offset
        _reportingYear: $reportingYear
        filter: {
          organisationId: {equalTo: $organisationRowId}
          operatorName: {includesInsensitive: $operatorName}
          facilityName: {includesInsensitive: $facilityName}
          applicationStatus: {equalTo: $applicationStatus}
          applicationId: {isNull: $applicationIdIsNull, equalTo: $applicationId}
          facilityBcghgid: {equalTo: $facilityBcghgid}
          lastSwrsReportingYear: {equalTo: $lastSwrsReportingYear}
        }
      ) {
        edges {
          node {
            facilityId
            ...FacilitiesRowItemContainer_facilityApplication
          }
        }
        totalCount
      }
      allReportingYears {
        edges {
          node {
            reportingYear
          }
        }
      }
    }
  `
});
