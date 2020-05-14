import React, {useEffect, useState} from 'react';
import {Pagination} from 'react-bootstrap';
import {graphql, createRefetchContainer, RelayRefetchProp} from 'react-relay';
import SearchTableLayout from 'components/SearchTableLayout';
import createFacilityMutation from 'mutations/facility/createFacilityMutation';
import AddOrganisationFacility from 'components/AddOrganisationFacility';
import {FacilitiesListContainer_query} from 'FacilitiesListContainer_query.graphql';
import FacilitiesRowItemContainer from './FacilitiesRowItemContainer';
import {useRouter} from 'next/router';

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
  const router = useRouter();
  // Allows for undefined organisation (coming from subheader My Applications)
  // TODO: Refactor facilities-list / organisations pages
  let organisation;
  if (router.query.organisationId) organisation = query.organisation;
  const facilityNumber = query.allFacilities.totalCount;
  let [facilityCount, updateFacilityCount] = useState(facilityNumber);
  const [offsetValue, setOffset] = useState(0);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction,
      facilityCount,
      offsetValue
    };
    relay.refetch(refetchVariables);
  });

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

  const handleAddFacility = async (variables) => {
    const {environment} = relay;
    const response = await createFacilityMutation(environment, variables);
    console.log(response);
    updateFacilityCount((facilityCount += 1));
  };

  const previousTenPagination = () => {
    if (offsetValue > 0) {
      setOffset(offsetValue - 10);
      setActivePage(activePage - 1);
    }
  };

  const nextTenPagination = () => {
    if (activePage !== maxPages) {
      setOffset(offsetValue + 10);
      setActivePage(activePage + 1);
    }
  };

  // Pagination
  const items = [];
  const maxPages = Math.ceil(
    query?.searchAllFacilities?.edges[0]?.node?.totalFacilityCount / 10
  );
  const handlePaginationByPageNumber = (pageNumber: number) => {
    setOffset((pageNumber - 1) * 10);
    setActivePage(pageNumber);
  };

  let startPage;
  let endPage;
  if (maxPages <= 9) {
    startPage = 1;
    endPage = maxPages;
  } else if (maxPages - activePage <= 4) {
    startPage = maxPages - 8;
    endPage = maxPages;
  } else if (activePage <= 5) {
    startPage = 1;
    endPage = 9;
  } else {
    startPage = activePage - 4;
    endPage = activePage + 4;
  }

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
    items.push(
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === activePage}
        onClick={() => handlePaginationByPageNumber(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>
    );
  }

  return (
    <>
      <SearchTableLayout
        body={body}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={handleEvent}
      />
      {maxPages > 1 && (
        <Pagination>
          <Pagination.First onClick={() => handlePaginationByPageNumber(1)} />
          <Pagination.Prev onClick={previousTenPagination} />
          {startPage !== 1 && <Pagination.Ellipsis />}
          <Pagination>{items}</Pagination>
          {endPage !== maxPages && <Pagination.Ellipsis />}
          <Pagination.Next onClick={nextTenPagination} />
          <Pagination.Last
            onClick={() => handlePaginationByPageNumber(maxPages)}
          />
        </Pagination>
      )}
      {organisation ? (
        <AddOrganisationFacility
          organisationRowId={organisation.rowId}
          onAddFacility={handleAddFacility}
        />
      ) : null}
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
          organisationId: {type: "ID!"}
          organisationRowId: {type: "String"}
          facilityCount: {type: "Int"}
          offsetValue: {type: "Int"}
        ) {
        ...FacilitiesRowItemContainer_query
        searchAllFacilities(
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          organisationRowId: $organisationRowId
          direction: $direction
          offsetValue: $offsetValue
        ) {
          edges {
            node {
              rowId
              totalFacilityCount
              ...FacilitiesRowItemContainer_facilitySearchResult
            }
          }
        }
        # TODO: This is here to trigger a refactor as updating the edge / running the query in the mutation is not triggering a refresh
        # Find a way to not pull the totalcount?
        allFacilities(first: $facilityCount) {
          totalCount
        }
        organisation(id: $organisationId) {
          id
          rowId
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
      $organisationId: ID!
      $organisationRowId: String
      $facilityCount: Int
      $offsetValue: Int
    ) {
      query {
        ...FacilitiesListContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
            organisationRowId: $organisationRowId
            organisationId: $organisationId
            facilityCount: $facilityCount
            offsetValue: $offsetValue
          )
      }
    }
  `
);
