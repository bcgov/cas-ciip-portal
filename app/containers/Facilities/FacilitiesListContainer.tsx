import React, {useState} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {Form} from 'react-bootstrap';
import {FacilitiesListContainer_query} from 'FacilitiesListContainer_query.graphql';
import {CiipApplicationRevisionStatus} from 'FacilitiesRowItemContainer_facilityApplication.graphql';
import FacilitiesRowItemContainer from './FacilitiesRowItemContainer';
import {ISearchOption} from 'components/Search/ISearchOption';
import {NumberSearchOption} from 'components/Search/NumberSearchOption';
import {TextSearchOption} from 'components/Search/TextSearchOption';
import {EnumSearchOption} from 'components/Search/EnumSearchOption';
import {NoHeaderSearchOption} from 'components/Search/NoHeaderSearchOption';
import FilterableTableLayout from 'components/FilterableComponents/FilterableTableLayout';
import FilterableTablePagination from 'components/FilterableComponents/FilterableTablePagination';
import {useRouter} from 'next/router';
import safeJsonParse from 'lib/safeJsonParse';
import {ISearchExtraFilter} from 'components/Search/SearchProps';

interface Props {
  query: FacilitiesListContainer_query;
  relay: RelayProp;
}

const searchOptions: ISearchOption[] = [
  new TextSearchOption('Operator Name', 'operatorName', {sortable: false}),
  new TextSearchOption('Facility Name', 'facilityName', {sortable: false}),
  new TextSearchOption('Facility Type', 'facilityType', {sortable: false}),
  new TextSearchOption('BC GHG id', 'facilityBcghgid', {sortable: false}),
  new NumberSearchOption(
    'Reporting period of last SWRS report',
    'lastSwrsReportingYear',
    {sortable: false}
  ),
  new EnumSearchOption<CiipApplicationRevisionStatus>(
    'Application Status',
    'applicationStatus',
    ['APPROVED', 'DRAFT', 'REJECTED', 'REQUESTED_CHANGES', 'SUBMITTED']
  ),
  new NumberSearchOption('Application #', 'applicationId', {sortable: false}),
  NoHeaderSearchOption
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

  const reportingPeriodFilter: ISearchExtraFilter = {
    argName: 'reportingYear',
    Component: ({onChange, value}) => {
      return (
        <Form>
          <Form.Group controlId="reportingYear">
            <Form.Label>Reporting Period</Form.Label>
            <Form.Control
              as="select"
              custom
              value={Number(value || 2019)}
              onChange={(e) =>
                onChange(Number((e.nativeEvent.target as any).value))
              }
            >
              {selectableReportingYears.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      );
    }
  };

  return (
    <>
      <FilterableTableLayout
        body={body}
        searchOptions={searchOptions}
        extraFilters={[reportingPeriodFilter]}
      />
      <FilterableTablePagination totalCount={totalCount} />
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
