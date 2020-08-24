import React, {useEffect, useState} from 'react';
import PaginationBar from 'components/PaginationBar';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import {FacilitiesListContainer_query} from 'FacilitiesListContainer_query.graphql';
import FacilitiesRowItemContainer from './FacilitiesRowItemContainer';

interface Props {
  direction: string;
  orderByField: string;
  searchField: string;
  searchValue: string;
  offsetValue: number;
  handleEvent: (...args: any[]) => void;
  query: FacilitiesListContainer_query;
  relay: RelayRefetchProp;
}

export const FacilitiesList: React.FunctionComponent<Props> = ({
  direction,
  orderByField,
  searchField,
  searchValue,
  handleEvent,
  relay,
  query
}) => {
  const {edges} = query.searchAllFacilities;
  const [offsetValue, setOffset] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const reportingYear = 2019;
  const maxResultsPerPage = 10;
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction,
      maxResultsPerPage,
      offsetValue,
      reportingYear
    };
    setIsLoading(true);
    relay.refetch(refetchVariables, undefined, () => {
      setIsLoading(false);
    });
  }, [searchField, searchValue, orderByField, direction, offsetValue, relay]);

  const displayNameToColumnNameMap = {
    'Organisation Name': 'organisation_name',
    'Facility Name': 'facility_name',
    'Facility Type': 'facility_type',
    'BC GHG id': 'facility_bcghgid',
    'Reporting period of last SWRS report': 'last_swrs_reporting_year',
    Status: 'application_revision_status',
    '': null
  };

  const body = (
    <tbody>
      {edges.map((edge) => (
        <FacilitiesRowItemContainer
          key={edge.node.rowId}
          facilitySearchResult={edge.node}
          query={query}
        />
      ))}
    </tbody>
  );

  const totalFacilityCount =
    query?.searchAllFacilities?.edges[0]?.node?.totalFacilityCount || 0;

  return (
    <>
      <SearchTableLayout
        body={body}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={handleEvent}
        isLoading={isLoading}
      />
      <PaginationBar
        setOffset={setOffset}
        setActivePage={setActivePage}
        offsetValue={offsetValue}
        activePage={activePage}
        maxResultsPerPage={maxResultsPerPage}
        totalCount={totalFacilityCount}
      />
      If you cannot find your facility in the list, please{' '}
      <a href="mailto:ghgregulator@gov.bc.ca">contact CAS</a> for assistance.
    </>
  );
};

export default createRefetchContainer(
  FacilitiesList,
  {
    query: graphql`
      fragment FacilitiesListContainer_query on Query
        @argumentDefinitions(
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
          organisationRowId: {type: "String"}
          offsetValue: {type: "Int"}
          maxResultsPerPage: {type: "Int"}
          reportingYear: {type: "Int"}
        ) {
        ...FacilitiesRowItemContainer_query
        searchAllFacilities(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          organisationRowId: $organisationRowId
          direction: $direction
          offsetValue: $offsetValue
          maxResultsPerPage: $maxResultsPerPage
          reportingYear: $reportingYear
        ) {
          edges {
            node {
              rowId
              totalFacilityCount
              ...FacilitiesRowItemContainer_facilitySearchResult
            }
          }
        }
      }
    `
  },
  graphql`
    query FacilitiesListContainerRefetchQuery(
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
      $organisationRowId: String
      $offsetValue: Int
      $maxResultsPerPage: Int
      $reportingYear: Int
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
            organisationRowId: $organisationRowId
            offsetValue: $offsetValue
            maxResultsPerPage: $maxResultsPerPage
            reportingYear: $reportingYear
          )
      }
    }
  `
);
